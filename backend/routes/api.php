<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('items', ItemController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('users', UserController::class);
Route::get('/completed/order', [OrderController::class, 'CompletedOrder'])->name('completed.order');
