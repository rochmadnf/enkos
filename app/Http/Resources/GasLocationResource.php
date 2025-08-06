<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GasLocationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            ...[
                'id' => $this->id,
                'name' => $this->name,
                'pic' => $this->pic,
            ],
            ...$request->routeIs('gas_location.edit')
                ? [
                    'type' => $this->type,
                    'latitude' => $this->latitude,
                    'longitude' => $this->longitude,
                ]
                : [
                    'color' => $this->color->combo(),
                    'type' => $this->type->first(),
                    'coordinates' => [
                        'lat' => $this->latitude,
                        'long' => $this->longitude,
                    ],
                ],
        ];
    }
}
