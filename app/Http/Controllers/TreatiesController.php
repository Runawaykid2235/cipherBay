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
