<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Client;

class Sell extends Model
{
  use HasFactory;

  protected $fillable = [
    'date',
    'products',
    'models',
    'sizes',
    'quantities',
    'client_id',
    'amount',
  ];

  public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
