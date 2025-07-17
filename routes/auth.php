<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\Auth\AuthenticatedSessionController::class)->group(function () {
    Route::middleware('guest')->prefix('/dapur')->group(function () {
        Route::get('/', 'index')->name('login');
        Route::post('/', 'login');
    });
});

Route::get('/dashboard', function () {
    return inertia('dashboard');
})->name('dashboard');
