<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique(); // Username is unique
            $table->string('email')->nullable()->unique(); // Email is optional but unique
            $table->string('password');
            $table->string('private_key');
            $table->string('public_key');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
