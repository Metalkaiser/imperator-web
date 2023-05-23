<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pmodel;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'models',
        'price',
    ];

    public function models()
    {
        return $this->hasMany(Pmodel::class);
    }
}
