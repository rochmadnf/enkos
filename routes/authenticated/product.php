<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::controller(ProductController::class)->prefix('/product')->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('product.index');
    Route::get('/create', 'create')->name('product.create');
    Route::post('/store', 'store')->name('product.store');

    Route::get('/{product}/edit', 'edit')->name('product.edit');
    Route::patch('/{product_id}/update', 'update')->name('product.update');
});
