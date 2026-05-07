<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class CashFlow extends Model
{
    use HasUuids;

    protected $fillable = [
        'type',
        'description',
        'ref_col',
        'amount',
    ];

    public function uniqueIds()
    {
        return ['id'];
    }
}
