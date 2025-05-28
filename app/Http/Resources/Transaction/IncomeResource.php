<?php

namespace App\Http\Resources\Transaction;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncomeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'buy_date' => $this->created_at->format('d/m/Y'),
            'product' => [
                'id' => $this->product->id,
                'name' => $this->product->name,
            ],
            'qty' => $this->qty,
            'price' => [
                'sell' => $this->selling_price,
                'capital' => $this->capital_price
            ],
            'split_date' => [
                'TGL' => $this->created_at->translatedFormat('d'),
                'BLN' => $this->created_at->translatedFormat('M'),
            ],
        ];
    }
}
