<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\GasCylinderController::class)
    ->prefix('gas-cylinders')
    ->group(function () {
        Route::get('/', 'index')->name('gas_cylinder.index');
        Route::post('/', 'store')->name('gas_cylinder.store');

        Route::get('/detail', 'show')->name('gas_cylinder.show');

        Route::patch('/{gas_id}', 'update')->name('gas_cylinder.update');
        Route::delete('/{gas_id}', 'destroy')->name('gas_cylinder.delete');

        Route::prefix('/stock')->group(function () {
            Route::post('/add', 'addStock')->name('gas_cylinder.stock.add');
        });
    });
