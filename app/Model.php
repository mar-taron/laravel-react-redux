<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Model extends Model
{
  protected $table = 'models';
  protected $fillable = ['name', 'vehicle_id'];
  public $timestamps =false;
  protected $primaryKey = 'id';


  public function vehicle()
  {
      return $this->belongsTo('App\Vehicle');

  }
}
