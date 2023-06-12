<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use App\Models\Product;
use App\Models\Pmodel;
use App\Http\Requests\MovRequest;
use Illuminate\Http\Request;

class MovementController extends Controller
{
  /**
   * Muestra una lista de movimientos.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $movements = Movement::orderBy('date')->paginate(20);
      return response()->json(['movements' => $movements], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Toma los datos necesarios para agregar mercancía a los productos del inventario.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $query = $this->queryMov();
      return response()->json($query, 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Guarda un nuevo movimiento en la base de datos.
   *
   * @param  \Illuminate\Http\MovRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(MovRequest $request)
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $newmov = Movement::create([
        'date' => strtotime($request->date),
        'mov' => $request->date,
        'type' => $request->type,
        'amount' => $request->amount
      ]);
      $movements = Movement::orderBy('date')->paginate(20);
      return response()->json(['movements' => $movements], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Agrega las cantidades especificadas a los productos declarados.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Movement  $movement
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Movement $movement)
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      switch ($request->type) {
        case 'ring':
          $sizes = [
            '7' => 0,
            '8' => 1,
            '9' => 2,
            '10' => 3,
            '11' => 4,
            '12' => 5,
            '13' => 6,
          ];
          break;
        case 'collarchain':
          $sizes = ['60cm' => 0];
          break;
        default:
        $sizes = ['Único' => 0];
          break;
      }
      foreach ($request->models as $model) {
        $pmodel = Pmodel::find(intval($model));
        $qtArr = explode(",",$pmodel->quantities);
        foreach ($request->sizes[$model] as $index => $size) {
          $qtArr[$sizes[$size]] += $request->quantities[$model][$index];
        }
        $pmodel->quantities = implode(',',$qtArr);
      }
      
      $query = $this->queryMov();
      return response()->json($query, 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Consulta todos los movimientos.
   *
   * @return \Illuminate\Http\Response
   */
  private function queryMov()
  {
    $products = Product::orderBy('name')->get();
    $rings = [];
    $collars = [];
    $bracelets = [];
    $other = [];
    foreach ($products as $index => $product) {
      switch ($product->type) {
        case 0:
          array_push($rings,$product);
          break;
        case 1:
          array_push($collars,$product);
          break;
        case 2:
          array_push($bracelets,$product);
          break;
      }
    }
    return [
      'rings' => $rings,
      'collars' => $collars,
      'bracelets' => $bracelets,
      'other' => $other
    ];
  }
}
