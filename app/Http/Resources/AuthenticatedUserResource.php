<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthenticatedUserResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'username' => $this->username,
            'avatar' => 'https://ui-avatars.com/api/?bold=true&color=fccee9&background=a01452&name=' . str()->of($this->name)->slug('+')->value,
            'role' => $this->getRoleNames()->first(),
            'permissions' => $this->getPermissionsViaRoles()->pluck('name'),
        ];
    }
}
