<?php

namespace App\Enums\GasCylinder;

enum ConditionTypeEnum: int
{
    case EMPTY = 0;
    case FILLED = 1;
    case DAMAGED = 2;

    public function label(): string
    {
        return match ($this) {
            self::FILLED => 'Isi',
            self::DAMAGED => 'Bocor/Rusak',
            self::EMPTY => 'Kosong',
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
