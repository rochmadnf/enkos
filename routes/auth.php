<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\Auth\AuthenticatedSessionController::class)->group(function () {
    Route::middleware('guest')->prefix('/dapur')->group(function () {
        Route::get('/', 'index')->name('login');
        Route::post('/', 'login');
    });

    Route::middleware('auth')->post('/logout', 'logout')->name('logout');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('dashboard', [
            'page' => [
                'uuid' => '9f6dae8c-f501-419c-83eb-0d68df9080a2'
            ]
        ]);
    })->name('dashboard');

    Route::get('/cylinder-gas', function () {
        return inertia('dashboard', [
            'page' => [
                'uuid' => '9f6daee3-f6b0-49f3-a296-c731b9376a99',
            ]
        ]);
    })->name('cylinder.gas');

    Route::get('/locations', function () {
        return inertia('dashboard', [
            'page' => [
                'uuid' => '9f6daee5-c3e5-413c-981f-08ce14c466e1',
            ]
        ]);
    })->name('locations');
});
