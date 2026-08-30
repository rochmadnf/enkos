<?php

namespace App\Models\Finance;

use App\Enums\Finance\CashFlowCategoryEnum;
use App\Models\CashFlow;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function cashFlows(): HasMany
    {
        return $this->hasMany(CashFlow::class);
    }


    public function scopeIncome(Builder $query): Builder
    {
        return $query->where('flow_type_id', CashFlowCategoryEnum::INCOME);
    }

    public function scopeExpense(Builder $query): Builder
    {
        return $query->where('flow_type_id', CashFlowCategoryEnum::EXPENSE);
    }
}
