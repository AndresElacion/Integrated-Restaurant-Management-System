<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function store(StoreItemRequest $request) {
        $formData = $request->validated();

        Item::create($formData);

        return response()->json(['message' => 'Item created successfully']);
    }
}
