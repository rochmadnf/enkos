<?php

namespace App\Models;

use App\Enums\Finance\CashFlowCategoryEnum;
use App\Models\Finance\CashFlowCategory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CashFlow extends Model
{
    use HasUuids;

    protected $fillable = [
        'cash_flow_category_id',
        'description',
        'ref_col',
        'perfom_at',
        'amount',
    ];

    public function uniqueIds()
    {
        return ['id'];
    }

    public function casts(): array
    {
        return [
            'perfom_at' => 'date',
        ];
    }

    public function cashFlowCategory()
    {
        return $this->belongsTo(CashFlowCategory::class);
    }

    public function scopeIncome(Builder $query): Builder
    {
        return $query->whereRelation('cashFlowCategory', 'flow_type_id', CashFlowCategoryEnum::INCOME);
    }

    public function scopeExpense(Builder $query): Builder
    {
        return $query->whereRelation('cashFlowCategory', 'flow_type_id', CashFlowCategoryEnum::EXPENSE);
    }
}
