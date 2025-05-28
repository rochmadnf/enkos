<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;


Route::get('/', fn() => to_route('dashboard'));

Route::controller(AuthenticatedSessionController::class)->group(function () {
    Route::middleware('guest')->prefix('dapur')->group(function () {
        Route::get('/', 'index')->name('login');
        Route::post('/', 'login');
    });
    Route::middleware('auth')->post('/logout', 'logout')->name('logout');
});


require __DIR__ . '/authenticated/dashboard.php';
require __DIR__ . '/authenticated/product.php';
require __DIR__ . '/authenticated/trx/income.php';
