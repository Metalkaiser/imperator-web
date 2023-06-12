<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellsController;
use App\Http\Controllers\MovementController;

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '^(?!api).*?');

Route::group(['prefix' => 'api'], function () {
    Route::get('/login', function(){
        return response()->json(['status' => false, 'message' => 'Not logged in'], 401);
    })->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    //Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', function (Request $request) {
            return $request->user();
          });
        $except = ['edit', 'show', 'destroy'];
        Route::resource('inventory', ProductController::class)->except($except);
        Route::resource('sells', SellsController::class)->only(['index', 'create', 'store']);
        Route::resource('movements', MovementController::class)->except($except);
    //});
});