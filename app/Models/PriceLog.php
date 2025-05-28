<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriceLog extends Model
{
    protected $fillable = ['product_id', 'type', 'price'];
}
