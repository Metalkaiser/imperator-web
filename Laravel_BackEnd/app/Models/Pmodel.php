<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Pmodel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'product_id',
        'quantities',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
