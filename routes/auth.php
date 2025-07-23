<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\Auth\AuthenticatedSessionController::class)->group(function () {
    Route::middleware('guest')
        ->prefix('/dapur')
        ->group(function () {
            Route::get('/', 'index')->name('login');
            Route::post('/', 'login');
        });

    Route::middleware('auth')->post('/logout', 'logout')->name('logout');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('dashboard', [
            'page' => [
                'uuid' => '9f6dae8c-f501-419c-83eb-0d68df9080a2',
            ],
        ]);
    })->name('dashboard');

    Route::controller(\App\Http\Controllers\GasCylinderController::class)
        ->prefix('gas-cylinders')
        ->group(function () {
            Route::get('/', 'index')->name('gas_cylinder.index');
            Route::get('/add', 'create')->name('gas_cylinder.create');
        });

    Route::get('/locations', function () {
        return inertia('dashboard', [
            'page' => [
                'uuid' => '9f6daee5-c3e5-413c-981f-08ce14c466e1',
                'name' => 'Lokasi',
            ],
        ]);
    })->name('locations');
});
