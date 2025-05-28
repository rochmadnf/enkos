<?php

use App\Http\Controllers\IncomeTrxController;
use Illuminate\Support\Facades\Route;

Route::controller(IncomeTrxController::class)->prefix('income')->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('income.index');
    Route::get('/create', 'create')->name('income.create');
    Route::post('/store', 'store')->name('income.store');
});
