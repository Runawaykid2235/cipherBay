<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        //treaties table
        Schema::create('treaties', function (Blueprint $table) {
            $table->id();
            $table->string('initiator_username');
            $table->string('recipient_username');
            $table->string('decrypt_key');
            $table->string('treaty_status');
            $table->json('terms');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treaties');
    }
};
