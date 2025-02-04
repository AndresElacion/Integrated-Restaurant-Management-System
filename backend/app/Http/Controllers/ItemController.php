<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index() {
        $items = Item::orderBy('created_at', 'desc')->get();

        return response()->json($items);
    }
    
    public function store(StoreItemRequest $request) {
        $formData = $request->validated();

        Item::create($formData);

        return response()->json(['message' => 'Item created successfully']);
    }

    public function update(UpdateItemRequest $request, Item $item) {
        $formData = $request->validated();

        $item->update($formData);

        return response()->json(['message' => 'Item updated successfully']);
    }

    public function destroy(Item $item) {
        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
