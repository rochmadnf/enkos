<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/dapur', [AuthenticatedSessionController::class, 'index'])->name('login');
