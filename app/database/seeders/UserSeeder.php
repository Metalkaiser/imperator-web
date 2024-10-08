<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Juan',
            'lastname' => 'Polanco',
            'email' => 'metalkaiserpolanco@gmail.com',
            'role' => 0,
            'password' => Hash::make('password'),
        ]);
    }
}
