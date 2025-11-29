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
        Schema::table('transactions', function (Blueprint $table) {
            // Rename sale_type to purchase_type
            $table->renameColumn('sale_type', 'purchase_type');
        });

        Schema::table('transactions', function (Blueprint $table) {
            // Add price_type column
            $table->unsignedTinyInteger('price_type')->after('purchase_type')->comment('1=pangkalan, 2=eceran');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('price_type');
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->renameColumn('purchase_type', 'sale_type');
        });
    }
};
