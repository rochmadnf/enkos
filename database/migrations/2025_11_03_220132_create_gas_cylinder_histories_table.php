<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gas_cylinder_histories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('gas_cylinder_id')->constrained()->cascadeOnDelete()->onUpdate('cascade');
            $table->foreignUuid('location_id')->constrained('gas_locations')->cascadeOnDelete()->onUpdate('cascade');
            $table->unsignedInteger('capital_price');
            $table->unsignedInteger('base_price');
            $table->unsignedInteger('retail_price');
            $table->unsignedSmallInteger('stock');
            // $table->unsignedTinyInteger('purchase_type');
            $table->unsignedTinyInteger('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gas_cylinder_histories');
    }
};
