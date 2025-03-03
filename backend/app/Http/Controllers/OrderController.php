<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected function boot() {
        $this->middleware('role:admin,chef')->only('CompletedOrder');
    }

    public function CompletedOrder() {
        $user = auth()->user();

        $orders = Order::with(['orderItems.item'])
        ->where('status', 'completed')
        ->when($user->role === 'chef', function ($query) {
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

    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'items' => 'required|array',
                'items.*.item_id' => 'required|integer|exists:items,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',
                'items.*.subtotal' => 'required|numeric|min:0',
                'subtotal' => 'required|numeric|min:0',
                'tax' => 'required|numeric|min:0',
                'total_amount' => 'required|numeric|min:0'
            ]);

            DB::beginTransaction();

            $order = Order::create([
                'subtotal' => $request->subtotal,
                'tax' => $request->tax,
                'total_amount' => $request->total_amount,
                'status' => 'pending'
            ]);

            foreach ($request->items as $item) {
                $order->orderItems()->create([
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['subtotal']
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully',
                'data' => $order->load('orderItems'),
                'id' => $order->id
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Order $order)
    {
        return response()->json($order->load('items'));
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,completed,preparing',
            'paymentMethod' => 'required|in:cash'
        ]);

        $order->update([
            'status' => $request->status,
            'payment_method' => $request->paymentMethod
        ]);

        return response()->json($order);
    }
}
