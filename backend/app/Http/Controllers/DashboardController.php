<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats() {
        $stats = [
            'totalOrders' => Order::count(),
            'totalPendings' => Order::where('status', 'pending')->count(),
            'totalCompleted' => Order::where('status', 'completed')->count(),
        ];

        return response()->json($stats);
    }
}
