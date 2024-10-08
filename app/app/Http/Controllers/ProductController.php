<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Pmodel;
use App\Models\Sell;
//use App\Models\User;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateRequest;
use App\Models\Movement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
      return response()->json(['products' => $products], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Guarda un nuevo producto con todas sus características en la base de datos.
   *
   * @param  \Illuminate\Http\ProductRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(ProductRequest $request)
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
      Storage::putFileAs('public/products', $request->file, $request->name . ".jpg");
      
      return response()->json(['status' => 'success'], 200);
      
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Modifica el producto editado
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\UpdateRequest
   */
  public function update(UpdateRequest $request, $id)
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $product = Product::find($id);
      if (isset($request->file)) {
        Storage::delete('public/products' . $product->name . ".jpg");
        Storage::putFileAs('public/products', $request->file, $request->name . ".jpg");
      }
      $product->name = $request->name;
      $product->price = $request->price;
      
      $product->save();

      return response()->json(['status' => 'success'], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }
}
