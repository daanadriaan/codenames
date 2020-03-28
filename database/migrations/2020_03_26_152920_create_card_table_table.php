<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardTableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_table', function (Blueprint $table) {
            $table->integer('card_id');
            $table->integer('table_id');
            $table->integer('index')->nullable();
            $table->integer('role')->nullable(); // red,blue,assassin,neutral
            $table->timestamps();
            $table->timestamp('turned_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('card_table');
    }
}
