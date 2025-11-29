<?php

namespace App\Enums\Transaction;

enum PriceTypeEnum: int
{
    case WHOLESALE = 1; // Pangkalan
    case RETAIL = 2; // Eceran

    public function label(): string
    {
        return match ($this) {
            self::WHOLESALE => 'Pangkalan',
            self::RETAIL => 'Eceran',
        };
    }

    public static function toArray(): array
    {
        return array_map(
            fn($case) => [
                'id' => $case->value,
                'name' => $case->label(),
            ],
            self::cases(),
        );
    }
}
