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
            Route::post('/', 'store')->name('gas_cylinder.store');
            Route::delete('/{gas_id}', 'destroy')->name('gas_cylinder.delete');
        });

    Route::controller(\App\Http\Controllers\GasLocationController::class)
        ->prefix('/gas-locations')
        ->group(function () {
            Route::get('/', 'index')->name('gas_location.index');

            Route::get('/add', 'create')->name('gas_location.create');
            Route::post('/add', 'store')->name('gas_location.store');

            Route::get('/detail/{gas_location}', 'show')->name('gas_location.show');
            Route::delete('/{gas_location}', 'destroy')->name('gas_location.delete');

            Route::get('/{gas_location}/edit', 'edit')->name('gas_location.edit');
            Route::patch('/{gas_location}/update', 'update')->name('gas_location.update');
        });
});
