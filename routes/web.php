<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Auth;


// Serve the welcome page for the home route
Route::get('/', function () {
    return view('welcome');
});

// Serve the projects page
Route::get('/projects', function () {
    return view('projects');
});

// Serve the about page
Route::get('/about', function () {
    return view('about');
});

Route::get('/projects/python', function () {
    return view('allpythonprojects');
});

Route::get('/projects/react', function () {
    return view('allreactprojects');
});


Route::get('/projects/rust', function () {
    return view('allrustprojects');
});


Route::get('/cv', function () {
    return view('cv');
});

Route::get('/contact', function () {
    return view('contact');
});

//Get route for create account
Route::get('/createaccount', function () {
    return view('createaccount');
});

//post route for account creation
Route::post('/api/createaccount', [UserController::class, 'create']);



Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->get('/account', [AccountController::class, 'index'])->name('account');


Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');

Route::middleware('auth')->get('/api/account', function () {
    return response()->json(['user' => Auth::user()]);
});