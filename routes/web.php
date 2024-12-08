<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TreatiesController;

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

Route::get('/treaties', function () {
    return view('treaties');
});

Route::get('/createtreaty', function () {
    return view('createtreaty');
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
Route::post('/api/logout', [AuthController::class, 'logout'])->name('logout');


Route::middleware('auth')->get('/api/account', function () {
    return response()->json(['user' => Auth::user()]);
});


Route::middleware('auth')->post('/api/acceptTreaty', [TreatiesController::class, 'acceptTreaty']);
Route::middleware('auth')->post('/api/denyTreaty', [TreatiesController::class, 'denyTreaty']);


Route::middleware('auth')->get('/api/walletamount', [WalletController::class, 'getWalletAmount']);
Route::middleware('auth')->post('/api/createtreaty', [TreatiesController::class, 'createTreaty']);
Route::middleware('auth')->get('/api/treaty-amount', [TreatiesController::class, 'readTreatiesAmount']);
Route::middleware('auth')->get('/api/getAllTreaties', [TreatiesController::class, 'getAllTreaties']);