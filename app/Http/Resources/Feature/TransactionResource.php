<?php

namespace App\Http\Resources\Feature;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'transaction_date' => $this->transaction_date->format('d/m/Y'),
            'location' => [
                'id' => $this->location->id,
                'name' => $this->location->name,
            ],
            'gas_cylinder' => [
                'id' => $this->gasCylinder->id,
                'name' => $this->gasCylinder->name,
            ],
            'purchase_type' => [
                'value' => $this->purchase_type->value,
                'label' => $this->purchase_type->label(),
            ],
            'price_type' => [
                'value' => $this->price_type->value,
                'label' => $this->price_type->label(),
            ],
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'total_price' => $this->total_price,
            'created_at' => $this->created_at->format('d/m/Y H:i'),
        ];
    }
}
