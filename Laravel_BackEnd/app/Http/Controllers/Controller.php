<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  protected $dbError = [     //Variable de error de conexión a la DB
    'icon' => 'error',
    'title' => 'Error de conexión la base de datos',
    'message' => 'Ha ocurrido un error con la base de datos.'
  ];

    /**
   * Prueba la conexión con la base de datos antes de realizar operaciones.
   */
  protected function dbtest()
  {
    try {
      DB::connection()->getPDO();
      return true;
    } catch (\Exception $e) {
      return false;
    }
  }
}