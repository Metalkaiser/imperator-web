<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Pmodel;
use App\Models\Sell;
//use App\Models\User;
use App\Models\Movement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
  /**
   * Muestra la lista ventas y gastos en el dashboard.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $spends = Movement::where([
        ['date', '>=', date('Y-m-d', strtotime('-30 days'))],
        ['type', '=', 0]
      ])->orderBy('date', 'desc')->get();
  
      $sells = Sell::where('date', '>=', date('Y-m-d', strtotime('-30 days')))
      ->orderBy('date', 'desc')->get();

      return response()->json([
        'spends' => $spends,
        'sells' => $sells
      ], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Muestra la lista de productos en el inventario.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $products = Product::orderBy('name','asc')->paginate(20);
      return response()->json([
        'products' => $products
        ], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Guarda un nuevo producto con todas sus características en la base de datos.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      switch ($request->type) {
        case 0:     //rings
          $quantities = '0,0,0,0,0,0,0';
          break;
        default:    //bracelets and other
          $quantities = '0';
          break;
      }

      $newproduct = Product::create([
        'name' => $request->name,
        'type' => $request->type,
        'models' => '',
        'price' => $request->price,
      ]);

      $models = '';
      for ($i=0; $i < count($request->models); $i++) { 
        $model = Pmodel::create([
          'name' => $request->models[$i],
          'product_id' => $newproduct->id,
          'quantities' => $quantities,
        ]);
        if ($i == count($request->models) - 1) {
          $models .= $model->id;
        } else {
          $models .= $model->id . ',';
        }
      }

      $newproduct->models = $models;
      $newproduct->save();
      $products = Product::orderBy('name','asc')->get();

      return response()->json([
        'status' => 'success',
        'products' => $products
          ], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Modifica el producto editado
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $product = Product::find($id);
      $product->name = $request->name;
      $product->price = $request->price;
      $product->save();

      $products = Product::orderBy('name','asc')->get();

      return response()->json([
        'status' => 'success',
        'products' => $products
        ], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }
}
