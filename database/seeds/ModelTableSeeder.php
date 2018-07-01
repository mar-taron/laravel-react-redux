<?php

use Illuminate\Database\Seeder;

class ModelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('car_models')->insert([
        [
            'name' => 'E350',
            'vehicle_id' => '1',                
        ], 
        [
            'name' => 'ML320',
            'vehicle_id' => '1',                
        ],
        [
            'name' => 'Sonata',
            'vehicle_id' => '2',                
        ],
        [
            'name' => 'Solaris',
            'vehicle_id' => '2',                
        ],
      ]);
    }
}
