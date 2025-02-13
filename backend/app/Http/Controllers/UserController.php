<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $user = User::orderBy('created_at', 'desc')->get();

        return response()->json($user);
    }

    public function store(UserStoreRequest $request) {
        $formData = $request->validated();

        User::create($formData);

        return response()->json(['message', 'User created successfully']);
    }

    public function show(User $user){
        return response()->json($user);
    }

    public function update(UserUpdateRequest $request, User $user) {
        $formData = $request->validated();

        $user->update($formData);

        return response()->json(['message', 'User updated successfully']);
    }

    public function destroy(User $user) {
        $user->delete();

        return response()->json(['message', 'User deleted successfully']);
    }
}
