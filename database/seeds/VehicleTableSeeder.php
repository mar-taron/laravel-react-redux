<?php

use Illuminate\Database\Seeder;

class VehicleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('vehicles')->insert([
        [
            'name' => 'Mercedes-Benz',
        ],
        [
            'name' => 'Hyunday',
        ]
      ]);
    }
}
