<?php

use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\Features\UserController::class)
    ->prefix('users')
    ->name('users.')
    ->group(function () {

        Route::get('/', 'index')->name('index');
    });
