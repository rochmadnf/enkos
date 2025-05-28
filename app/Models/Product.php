<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = ['name'];

    public function price_logs(): HasMany
    {
        return $this->hasMany(PriceLog::class);
    }
}
