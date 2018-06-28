<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;

use App\Car;
use Validator ;

class CarsController extends BaseController  
{
    // get Cars
    public function index()
    { 
        $cars = Car::all();
        return $this->sendResponse($cars->toArray(), 'Cars read succesfully');
    }

    // create Car
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name'=> 'required',
            'details'=> 'required' 
        ] );
        if ($validator -> fails()) {
            return $this->sendError('error validation', $validator->errors());
        }
        $car = Car::create($input);
        return $this->sendResponse($car->toArray(), 'Car created succesfully');
        
    }

    // fetch Car
    public function show($id)
    {
        $car = Car::find($id);
        if (   is_null($car)   ) {
            return $this->sendError(  'Car not found ! ');
        }
        return $this->sendResponse($car->toArray(), 'Car read succesfully');
        
    }

    // update Car 
    public function update(Request $request , Car $car)
    {
        $input = $request->all();
        $validator =    Validator::make($input, [
            'name'=> 'required',
            'details'=> 'required' 
        ] );
        if ($validator -> fails()) {
            return $this->sendError('error validation', $validator->errors());
        }
        $car->name =  $input['name'];
        $car->details =  $input['details'];
        $car->save();
        return $this->sendResponse($car->toArray(), 'Car updated succesfully');
        
    }

    // delete Car 
    public function destroy(Car $car)
    { 
        $car->delete();
        return $this->sendResponse($car->toArray(), 'Car deleted succesfully');
    }
    
}