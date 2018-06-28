<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
  protected $table = 'cars';
  protected $fillable = ['name', 'vehicle_id', 'model_id'];
  public $timestamps =false;
  protected $primaryKey = 'id';
}
