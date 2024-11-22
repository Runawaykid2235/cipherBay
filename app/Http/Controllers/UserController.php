<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator; // For validation
use SQLite3;
use Illuminate\Support\Facades\Hash; // Use Laravel's built-in Hash facade

class UserController extends Controller
{
    public function create(Request $request)
    {
        // Path to SQLite database file
        $dbFile = database_path('database.sqlite');

        try {
            // Path to script for key generation
            $pythonScriptPath = base_path('Scripts/generate_keys.py'); // Corrected path separator

            // Execute the script and capture output
            $output = shell_exec("python3.12 {$pythonScriptPath} 2>&1");

            // Check if output is valid JSON
            $keys = json_decode($output, true);

            if (!$keys || !isset($keys['private_key'], $keys['public_key'])) {
                Log::error('Error: Invalid output from Python script', ['output' => $output]);
                return response()->json([
                    'message' => 'Failed to generate keys.',
                    'error' => 'An error occurred while generating keys. Please try again later.',
                ], 500);
            }

            $privateKey = $keys['private_key'];
            $publicKey = $keys['public_key'];

            // Hash private key using Laravel's Hash facade for secure storage
            $privateKeyHashed = Hash::make($privateKey); // You could also use bcrypt() directly if needed

            // Validate input data
            $validator = Validator::make($request->all(), [
                'username' => 'required|string|max:255', // Ensure username is valid
                'email' => 'required|email|max:255|unique:users,email', // Ensure email is valid and unique
                'password' => 'required|string|min:8', // Ensure password has minimum length
            ]);

            // Return errors if validation fails
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors(), // Detailed validation errors
                ], 422);
            }

            // Open the SQLite database
            $db = new SQLite3($dbFile);

            // Hash the password
            $hashedPassword = password_hash($request->input('password'), PASSWORD_BCRYPT);

            // Prepare the INSERT statement
            $stmt = $db->prepare("INSERT INTO users (username, email, password, private_key, public_key) VALUES (:username, :email, :password, :private_key, :public_key)");

            // Bind sanitized values to the prepared statement
            $stmt->bindValue(':username', $request->input('username'), SQLITE3_TEXT);
            $stmt->bindValue(':email', $request->input('email'), SQLITE3_TEXT);
            $stmt->bindValue(':password', $hashedPassword, SQLITE3_TEXT);
            $stmt->bindValue(':private_key', $privateKeyHashed, SQLITE3_TEXT); // Store hashed private key
            $stmt->bindValue(':public_key', $publicKey, SQLITE3_TEXT); // Store public key

            // Execute the prepared statement
            $stmt->execute();

            // Log the request data and the generated wallet
            Log::info('User created successfully', ['username' => $request->input('username')]);

            return response()->json([
                'message' => 'User created successfully.',
                'data' => $request->only(['username', 'email']), // Avoid returning sensitive data
            ], 201);
        } catch (\Exception $e) {
            // Log and handle any errors
            Log::error('Error creating user: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to create user.',
                'error' => 'An internal error occurred. Please try again later.',
            ], 500);
        }
    }

    public function Login(Request $request)
    {
        // Validate input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Path to SQLite database file
        $dbFile = database_path('database.sqlite');
        $db = new SQLite3($dbFile);

        // Retrieve user by username
        $username = $request->input('username');
        $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $result = $stmt->execute();
        $user = $result->fetchArray(SQLITE3_ASSOC);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid username or password.',
            ], 401);
        }

        // Verify the password
        if (!password_verify($request->input('password'), $user['password'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid username or password.',
            ], 401);
        }

        // Log the user in (you could also generate a token or session here)
        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'user' => [
                'username' => $user['username'],
            ],
        ]);
    }
}
