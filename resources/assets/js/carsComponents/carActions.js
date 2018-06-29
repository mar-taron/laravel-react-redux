
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { baseUrl } from '../config';

export function fetchCars(){
  return function (dispatch) {
    axios.get(baseUrl+"api/cars")
    .then((response) => {
      dispatch({type: "FETCH_CARS_FULFILLED", payload: response.data.data});
    })
    .catch((error) => {
      dispatch({type: "FETCH_CARS_REJECTED", payload: error});
    })
  }
}

export function fetchCar(id){
  return function (dispatch) {
    axios.get(baseUrl+"api/cars/"+id)
    .then((response) => {
      dispatch({type: "FETCH_CAR_FULFILLED", payload: response.data.car});
    })
    .catch((error) => {
      dispatch({type: "FETCH_CAR_REJECTED", payload: error});
    })
  }
}

export function deleteCar(formData){
  return function (dispatch) {
    axios.post(baseUrl+"api/cars/delete", formData)
    .then((response) => {
      NotificationManager.success(response.data.message, 'Success', 5000);
      dispatch(fetchcars());
    })
    .catch((error) => {
      NotificationManager.error("An error occured in the operation", 'Error', 5000);
    })
  }
}