<?php

namespace App\Models\Finance;

use App\Enums\Finance\CashFlowCategoryEnum;
use Illuminate\Database\Eloquent\Model;

class CashFlowCategory extends Model
{
    protected $table = 'cash_flow_categories';

    protected $fillable = [
        'name',
        'flow_type_id',
    ];

    public function casts()
    {
        return [
            'flow_type_id' => CashFlowCategoryEnum::class,
        ];
    }
}
