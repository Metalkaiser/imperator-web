<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function login (Request $request) {
    
    $validator = Validator::make($request->all(), [
      'email' => 'required|string',
      'password' => 'required|string',
    ]);

    if($validator->fails()) {
      return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
    }

    $credentials = $request->only('email', 'password');

    if(auth()->attempt($credentials, $request->filled('remember'))) {
      return response()->json(['status' => true, 'user' => auth()->user()]);
    } else {
      return response()->json(['status' => false, 'message' => 'invalid username or password'], 401);
    }
  }

  public function logout(Request $request) {
    auth('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['status' => true, 'message' => 'logged out']);
  }

  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'lastname' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'role' => ['required', 'numeric', 'max:255'],
      'password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);
    if($validator->fails()) {
      return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
    }
    $user = User::create([
      'name' => $request->name,
      'lastname' => $request->lastname,
      'email' => $request->email,
      'role' => $request->role,
      'password' => Hash::make($request->password),
    ]);
    return response()->json(['status' => true, 'user' => $user]);
  }
}
