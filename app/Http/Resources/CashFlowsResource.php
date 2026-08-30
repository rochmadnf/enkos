<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CashFlowsResource extends JsonResource
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
            'category' => $this->cashFlowCategory ?? null,
            'description' => $this->description,
            'ref_col' => $this->ref_col ?? null,
            'amount' => $this->amount,
            'create' => $this->perfom_at->translatedFormat('l, d F Y'),
        ];
    }
}
