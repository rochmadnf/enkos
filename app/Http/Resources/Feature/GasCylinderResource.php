<?php

namespace App\Http\Resources\Feature;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GasCylinderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'total_stock' => $this->total_stock,
            'stock' => [
                'all_condition' => $this->all_condition_stock,
                'filled' => $this->filled_stock,
                'empty' => $this->empty_stock,
                'damaged' => $this->damaged_stock,
            ],
            'histories' => $this->histories->map(function ($history) {
                return [
                    'id' => $history->id,
                    'location_id' => $history->location_id,
                    'capital_price' => $history->capital_price,
                    'base_price' => $history->base_price,
                    'retail_price' => $history->retail_price,
                    'stock' => $history->stock,
                    'status' => $history->status,
                ];
            }),
            'create' => $this->created_at->translatedFormat('l, d F Y'),
        ];
    }
}
