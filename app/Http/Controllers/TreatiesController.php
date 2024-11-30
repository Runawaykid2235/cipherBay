<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TreatiesController extends Controller
{
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
