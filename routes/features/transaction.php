<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\TransactionController::class)
    ->prefix('transactions')
    ->group(function () {
        Route::get('/', 'index')->name('transaction.index');
        Route::get('/create', 'create')->name('transaction.create');
        Route::post('/', 'store')->name('transaction.store');
        Route::get('/stock-info', 'getStockInfo')->name('transaction.stock_info');
        Route::get('/cylinders-by-location', 'getCylindersByLocation')->name('transaction.cylinders_by_location');
        Route::get('/{id}/edit', 'edit')->name('transaction.edit');
        Route::patch('/{id}', 'update')->name('transaction.update');
        Route::delete('/{id}', 'destroy')->name('transaction.destroy');
    });
