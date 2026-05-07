<?php

namespace App\Providers;

use App\Repositories\{Contracts, Eloquent, GasCylinderRepository, GasLocationRepository};
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
        $this->app->singleton(Contracts\TransactionRepositoryInterface::class, \App\Repositories\TransactionRepository::class);
        $this->app->bind(Contracts\UsersRepositoryInterface::class, Eloquent\UsersRepository::class);
        $this->app->bind(Contracts\CashFlowsRepositoryInterface::class, Eloquent\CashFlowsRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->isProduction()) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        \Illuminate\Support\Facades\Gate::before(function ($user, $ability) {
            return $user->hasRole(config('permission.superior_role_name')) ? true : null;
        });
    }
}
