<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KitchenController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('items', ItemController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('users', UserController::class);

Route::middleware(['auth:sanctum', 'role:admin,chef'])->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');
    Route::get('/completed/order', [OrderController::class, 'CompletedOrder'])->name('completed.order');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/kitchen/orders', [KitchenController::class, 'CompletedOrder']);
    Route::patch('/kitchen/orders/{order}/status', [KitchenController::class, 'updateOrderStatus']);
});