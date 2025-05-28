<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthenticatedUserResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'username' => $this->username,
            'avatar' => 'https://ui-avatars.com/api/?background=random&name=' . str()->of($this->name)->slug('+')->value,
            'role' => 'super admin', // $this->getRoleNames()->first(),
            'permissions' => ['lorem', 'ipsum'], // $this->getPermissionsViaRoles()->pluck('name'),
        ];
    }
}
