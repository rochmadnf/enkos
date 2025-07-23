<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('dashboard');
});

require __DIR__ . '/auth.php';
