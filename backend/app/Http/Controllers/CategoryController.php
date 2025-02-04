<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categoru = Category::orderBy('created_at', 'desc')->get();

        return response()->json($categoru);
    }
}
