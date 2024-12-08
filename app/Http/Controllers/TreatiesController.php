<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TreatiesController extends Controller
{
    public function readTreatiesAmount(Request $request)
    {
        // Validate input (username is passed as a query parameter)
        $validated = $request->validate([
            'username' => 'required|string|max:255',
        ]);
    
        try {
            // Fetch treaty counts
            $username = $validated['username'];
    

            Log::info("Fetching treaties for username: " . $username);


            // Count treaties where the user is the recipient
            $incoming_treaty_amount = DB::table('treaties')
                ->where('recipient_username', $username)
                ->count();
    
            // Count treaties where the user is the initiator
            $outgoing_treaty_amount = DB::table('treaties')
                ->where('initiator_username', $username)
                ->count();
    
            // Total treaties
            $total_treaty_amount = $incoming_treaty_amount + $outgoing_treaty_amount;
    
            return response()->json([
                'incoming' => $incoming_treaty_amount,
                'outgoing' => $outgoing_treaty_amount,
                'total' => $total_treaty_amount,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error reading treaty amounts: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to retrieve treaty amounts.',
            ], 500);
        }
    }
    
    public function getAllTreaties(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'username' => 'required|string|max:255',
        ]);

        try {
            $username = $validated['username'];
            Log::info("Fetching treaties for username: " . $username);

            // Fetch incoming and outgoing treaties
            $incoming_treaties = DB::table('treaties')
                ->where('recipient_username', $username)
                ->get();

            $outgoing_treaties = DB::table('treaties')
                ->where('initiator_username', $username)
                ->get();

            // Combine the results into one list
            $all_treaties = $incoming_treaties->merge($outgoing_treaties);

            // Return the treaties as JSON
            return response()->json([
                'treaties' => $all_treaties,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving treaties: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to retrieve treaties.',
            ], 500);
        }
    }

    public function denyTreaty(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'treaty_id' => 'required|integer',
        ]);

        $treaty_id = $validated['treaty_id'];

        // change treaty status to denied
        DB::table('treaties')
                ->where('Id', $treaty_id)
                ->update(['treaty_status' => 'denied']);

        return response()->json(['message' => 'Treaty denied successfully.']);
    }

    public function acceptTreaty(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'treaty_id' => 'required|integer',
        ]);

        $treaty_id = $validated['treaty_id'];


        try {
            $username = $validated['username'];
            Log::info("Accepting treaty for username: $username");
            Log::info("Treaty ID: $treaty_id");

            // Get buyer's wallet details
            $user = DB::table('users')
                ->where('username', $username)
                ->first(['public_key', 'private_key']);

            if (!$user) {
                throw new Exception("User not found: $username");
            }

            $recipient_username_public_key = $user->public_key;
            $recipient_username_private_key = $user->private_key;

            

            // Get the treaty terms
            $treaty = DB::table('treaties')
                ->where('Id', $treaty_id)
                ->value('terms');

            if (!$treaty) {
                throw new Exception("Treaty not found: $treaty_id");
            }

            // Decode JSON terms
            $terms = json_decode($treaty, true);
            if (!isset($terms['price'])) {
                throw new Exception("Price not found in treaty terms.");
            }

            $price = $terms['price'];

            // Check if user has enough funds in escrow account to buy the item
            // Path to the Python script
            $pythonScriptPathAmount = base_path('Scripts/get_wallet_amount.py');

            // Execute the script and capture output
            $wallet_amount = shell_exec("python3 {$pythonScriptPathAmount} {$username}");
            $wallet_amount = floatval($wallet_amount);
            
            if ($wallet_amount > $price) {
                // Proceed with payment
            } else {
                return response()->json(['error' => 'Insufficient funds.'], 400);
            }
            
            // Calculate funds distribution
            $cipherBaysCut = $price * 0.10;
            $usersEarnings = $price - $cipherBaysCut;

            // Our wallet address (CipherBay)
            $receiver = "bc1qf0h0wejx0fzu03qteecs2xp8uusteyypduhgu0";

            // Path to the Python script
            $pythonScriptPath = base_path('Scripts/send_funds.py');

            // Send CipherBay's cut
            $command1 = "python3 {$pythonScriptPath} {$recipient_username_public_key} {$recipient_username_private_key} {$receiver} {$cipherBaysCut}";
            $output1 = shell_exec($command1);
            Log::info("CipherBay cut transaction output: $output1");

            // Get seller's wallet details
            $seller = DB::table('users')
                ->where('id', $terms['seller_id'])
                ->first(['public_key']);

            if (!$seller) {
                throw new Exception("Seller not found for treaty ID: $treaty_id");
            }

            $seller_public_key = $seller->public_key;

            // Send funds to the seller
            $command2 = "python3 {$pythonScriptPath} {$recipient_username_public_key} {$recipient_username_private_key} {$seller_public_key} {$usersEarnings}";
            $output2 = shell_exec($command2);
            Log::info("Seller transaction output: $output2");

            // When its all send then we need to change the treaty from pending to accepted
            // AND WE NEED TO GIVE THE BUYER THE DECRYPT KEY

            DB::table('treaties')
                ->where('Id', $treaty_id)
                ->update(['status' => 'accepted']);

            return response()->json(['message' => 'Treaty accepted successfully.']);
        } catch (Exception $e) {
            Log::error("Error accepting treaty: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function createTreaty(Request $request)
    {
        // Validate inputs
        $validated = Validator::make($request->all(), [
            'initiator_username' => 'required|string|max:255',
            'recipient_username' => 'required|string|max:255',
            'decrypt_key' => 'required|string',
            'terms' => 'required|array',
        ]);

        // Check validation results
        if ($validated->fails()) {
            return response()->json($validated->errors(), 422);
        }

        // Prepare data
        $data = [
            'initiator_username' => $request->input('initiator_username'),
            'recipient_username' => $request->input('recipient_username'),
            'decrypt_key' => $request->input('decrypt_key'),
            'treaty_status' => 'pending',
            'terms' => json_encode($request->input('terms')), // Corrected $request usage here
            'created_at' => now(),
            'updated_at' => now(),
        ];

        // Check if recipient user exists before allowing a treaty to be created
        $recipientUsername = $request->input('recipient_username');
        $recipientExists = DB::table('users')->where('username', $recipientUsername)->exists();


        if (!$recipientExists) {
            return response()->json(['message' => 'Recipient user does not exist.'], 400);
        }

        try {
            // Insert into database
            DB::table('treaties')->insert($data);

            Log::info('Treaty created successfully.');
            return response()->json(['message' => 'Treaty created successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error creating treaty: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create treaty.'], 500);
        }
    }
}