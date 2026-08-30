<?php

use App\Http\Controllers\Features\CashFlowCategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\Features\CashFlowController::class)
    ->prefix('cash-flows')
    ->name('cash-flows.')
    ->group(function () {

        Route::get('/', 'index')->middleware('permission:read cash_flows')->name('index');
        Route::post('/', 'store')->middleware('permission:create cash_flows')->name('store');

        Route::controller(CashFlowCategoryController::class)->prefix('categories')->name('categories.')->group(function () {
            Route::get('', 'index')->name('index');
            Route::post('', 'store')->name('store');
            Route::put('{id}/update', 'update')->name('update');
            Route::delete('{id}/delete', 'destroy')->name('destroy');
        });
    });
