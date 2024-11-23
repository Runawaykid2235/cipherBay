<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index()
    {
        $user = Auth::user(); // Get the currently authenticated user
        return view('account', compact('user'));
    }
}
