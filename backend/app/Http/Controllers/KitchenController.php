<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KitchenController extends Controller
{
    protected function boot() {
        $this->middleware('role:admin,chef')->only('CompletedOrder');
    }

    public function CompletedOrder(): JsonResponse
    {
        $user = auth()->user();

        $orders = Order::with(['orderItems.item'])
            ->where('status', 'preparing')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'subtotal' => $order->subtotal,
                    'tax' => $order->tax,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s'),
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

    public function updateOrderStatus(Order $order, Request $request): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:completed,cancelled'
        ]);

        $order->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order
        ]);
    }
}