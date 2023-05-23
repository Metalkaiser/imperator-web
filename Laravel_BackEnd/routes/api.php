<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellsController;
use App\Http\Controllers\MovementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$except = ['edit', 'show', 'destroy'];

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::resource('inventory', ProductController::class)->except($except);
Route::resource('sells', SellsController::class)->only(['index', 'create', 'store']);
Route::resource('movements', MovementController::class)->except($except);