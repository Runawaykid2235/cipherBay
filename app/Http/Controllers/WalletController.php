<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function getWalletAmount(Request $request)
    {
        // Assuming the wallet address is tied to the authenticated user
        $user = auth()->user();
        if (!$user || !$user->public_key) {
            return response()->json(['error' => 'User or wallet address not found'], 404);
        }

        $walletAddress = $user->public_key;

        // Path to the Python script
        $pythonScriptPath = base_path('Scripts/get_wallet_amount.py');

        // Sanitize wallet address to prevent command injection
        $sanitizedWalletAddress = escapeshellarg($walletAddress);

        // Execute the script and capture output
        $command = "python3 {$pythonScriptPath} {$sanitizedWalletAddress}";
        $output = shell_exec($command);

        if ($output === null) {
            return response()->json(['error' => 'Failed to execute wallet script'], 500);
        }

        // Parse the JSON output from the Python script
        $result = json_decode($output, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['error' => 'Invalid JSON response from wallet script'], 500);
        }

        if (isset($result['error'])) {
            return response()->json(['error' => $result['error']], 500);
        }

        if (!isset($result['walletAmount'])) {
            return response()->json(['error' => 'Invalid response from wallet script'], 500);
        }

        return response()->json(['walletAmount' => $result['walletAmount']]);
    }
}
