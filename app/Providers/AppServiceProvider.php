<?php

namespace App\Providers;

use App\Repositories\{Contracts, GasCylinderRepository, GasLocationRepository};
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(Contracts\GasCylinderRepositoryInterface::class, GasCylinderRepository::class);
        $this->app->singleton(Contracts\GasLocationRepositoryInterface::class, GasLocationRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
