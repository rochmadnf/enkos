<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\Features\CashFlowController::class)
    ->prefix('cash-flows')
    ->name('cash-flows.')
    ->group(function () {

        Route::get('/', 'index')->middleware('permission:read cash_flows')->name('index');
    });
