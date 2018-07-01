<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\DB;

use App\Car;
use App\Vehicle;
use App\CarModel;
use Validator ;

class CarsController extends BaseController  
{
    // get Cars
    public function index()
    {
        $cars = DB::table('cars')
            ->leftJoin('vehicles', 'vehicles.id', '=', 'cars.vehicle_id')
            ->leftJoin('car_models', 'car_models.id', '=', 'cars.model_id')
            ->select('cars.*', 'vehicles.name as vehicle', 'car_models.name as model')
            ->get();
        
        return $this->sendResponse($cars->toArray(), 'Cars read succesfully');
    }

    // create Car
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name'=> 'required',
        ] );

        if ($validator -> fails()) {
            return $this->sendError('error validation', $validator->errors());
        }

        $image = $request->file('image');

        $input['image'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('/images');

        $image->move($destinationPath, $input['image']);
     
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
    public function update_car($id, Request $request)
    { 
        $input = $request->all();
        $validator =    Validator::make($input, [
            'name'=> 'required'
        ] );
       
        if ($validator -> fails()) {
            return $this->sendError('error validation', $validator->errors());
        }

        $car = Car::find($id);
        if ($input['image']) {            
            $image = $request->file('image');
            $input['image'] = time().'.'.$image->getClientOriginalExtension();

            $destinationPath = public_path('/images');

            $image->move($destinationPath, $input['image']);
            $car->image =  $input['image'];
        }
      
        $car->name =  $input['name'];
        $car->vehicle_id =  $input['vehicle_id'];
        $car->model_id =  $input['model_id'];
        $car->save();
        return $this->sendResponse($car->toArray(), 'Car updated succesfully');
        
    }

    // delete Car 
    public function destroy(Request $request)
    {
        $id = $request->all();
        $car = Car::where('id', $id)->first();
        $car->delete();
        return $this->sendResponse($car->toArray(), 'Car deleted succesfully');
    }

    // get Details
    public function details()
    {
        $data = [
           'vehicles' => Vehicle::all(),
           'models' => CarModel::all(),
        ]; 
        return $this->sendResponse($data, 'Get data succesfully');
    }
    
}