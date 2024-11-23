<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Show the login form
    public function showLoginForm()
    {
        return view('login');
    }

    // Handle the login request
    public function login(Request $request)
    {
        // Validate the input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt to log the user in
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            // Regenerate session to prevent session fixation attacks
            $request->session()->regenerate();

            // Redirect to account page
            return redirect()->intended('/account');
        }

        // Authentication failed
        return back()->withErrors([
            'message' => 'Invalid username or password.',
        ]);
    }
}
