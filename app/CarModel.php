<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
  protected $table = 'car_models';
  protected $fillable = ['name', 'vehicle_id'];
  public $timestamps =false;
  protected $primaryKey = 'id';


  public function vehicle()
  {
      return $this->belongsTo('App\Vehicle');

  }
}
