<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'capital_price' => $this->price_logs->where('type', 'capital')->sortByDesc('id')->first()->only(['id', 'price']),
            'selling_price' => $this->price_logs->where('type', 'sell')->sortByDesc('id')->first()->only(['id', 'price']),
            'create' => $this->created_at->translatedFormat('d F Y'),
        ];
    }
}
