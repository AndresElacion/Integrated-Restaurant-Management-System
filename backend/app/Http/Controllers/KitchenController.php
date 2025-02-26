<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class KitchenController extends Controller
{
    protected function boot() {
        $this->middleware('role:kitchen')->only('CompletedOrder');
    }

    public function CompletedOrder() {
        $user = auth()->user();

        $orders = Order::with(['orderItems.item'])
        ->where('status', 'completed')
        ->when($user->role === 'kitchen', function ($query) {
            return $query->orderBy('created_at', 'desc');
        })
        ->get()
        ->map(function ($order) {
            return [
                'id' => $order->id,
                'subtotal' => $order->subtotal,
                'tax' => $order->tax,
                'total_amount' => $order->total_amount,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'items' => $order->orderItems->map(function ($orderItem) {
                    return [
                        'name' => $orderItem->item->name,
                        'quantity' => $orderItem->quantity,
                        'price' => $orderItem->price,
                        'subtotal' => $orderItem->subtotal
                    ];
                })
            ];
        });
        return response()->json([
            'data' => $orders,
            'user_role' => $user->role
        ]);
    }
}
