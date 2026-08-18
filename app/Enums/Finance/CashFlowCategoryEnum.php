<?php

namespace App\Enums\Finance;

enum CashFlowCategoryEnum: int
{
    case INCOME = 1;
    case EXPENSE = 2;

    public function label(): string
    {
        return match ($this) {
            self::INCOME => 'Pemasukan',
            self::EXPENSE => 'Pengeluaran',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())
            ->map(fn($item) => [
                'id' => $item->value,
                'label' => $item->label(),
            ])
            ->toArray();
    }
}
