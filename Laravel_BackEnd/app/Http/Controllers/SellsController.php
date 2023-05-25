<?php

namespace App\Http\Controllers;

use App\Models\Sell;
use App\Models\Client;
use App\Models\Product;
use App\Models\Pmodel;
use Illuminate\Http\Request;
use App\Http\Requests\SellRequest;

class SellsController extends Controller
{
  /**
   * Muestra todas las ventas, a 20 ventas por página.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $sells = Sell::orderBy('date')->paginate(20);
      return response()->json(['sells' => $sells], 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Toma los datos para mostrar el formulario de venta.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      $query = $this->querySell();
      return response()->json($query, 200);
    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Guarda una venta en la base de datos.
   *
   * @param  \Illuminate\Http\SellRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(SellRequest $request)
  {
    $dbcon = $this->dbtest();
    if ($dbcon) {
      if ($request->clientid == 0) {
        $client = Client::create([
          'name' => $request->clientname,
          'lastname' => $request->clientlastname,
          'phone' => $request->clientphone,
          'email' => $request->clientemail,
        ]);
      } else {
        $client = Client::find($request->clientid);
      }
      
      $newsell = Sell::create([
        'date' => strtotime($request->date),
        'products' => implode(",",$request->products),
        'models' => implode(",",$request->models),
        'sizes' => implode(",",$request->sizes),
        'quantities' => implode(",",$request->quantities),
        'client_id' => $client->id,
        'amount' => $request->amount
      ]);

      $newmov = Movement::create([
        'date' => strtotime($request->date),
        'mov' => "venta " . $client->name . " " . $client->lastname . " - " . $request->date,
        'type' => 1,
        'amount' => $request->amount
      ]);

      $query = $this->querySell();
      return response()->json($query, 200);

    } else {
      return response()->json($this->dbError, 503);
    }
  }

  /**
   * Toma los datos de ventas.
   *
   * @return \Illuminate\Http\Response
   */
  private function querySell()
  {
    $clients = Client::select('id','name','lastname')
    ->orderBy('name','asc')->get();
    $products = Product::all();
    return [
      'clients' => $clients,
      'products' => $products
      ];
  }
}