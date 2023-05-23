<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('sells', function (Blueprint $table) {
      $table->id();
      $table->timestamp('date');
      $table->string('products');
      $table->string('models');
      $table->string('sizes');
      $table->string('quantities');
      $table->integer('client_id');
      $table->double('amount');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('sells');
  }
};
