
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
      dispatch({type: "FETCH_CAR_FULFILLED", payload: response.data.data});
      dispatch({type: "SET_MODAL", modal: "UPDATE"});
    })
    .catch((error) => {
      dispatch({type: "FETCH_CAR_REJECTED", payload: error});
    })
  }
}

export function deleteCar(id){
  return function (dispatch) {
    axios({method: 'delete', url: baseUrl+"api/cars/delete", data: {id: id}})
    .then((response) => {
      NotificationManager.success(response.data.message, 'Success', 5000);
      dispatch(fetchCars());
    })
    .catch((error) => {
      NotificationManager.error("An error occured in the operation", 'Error', 5000);
    })
  }
}

export function createCar(formData){
  return function (dispatch) {
    axios.post(baseUrl+"api/cars", formData)
    .then((response) => {
      NotificationManager.success('Car has been created!', 'Success', 5000);
      dispatch(fetchCars());
    })
    .catch((error) => {
      NotificationManager.error("An error occured in the operation", 'Error', 5000);
    })
  }
}

export function updateCar(id, formData){
  return function (dispatch) {
    axios.post(baseUrl+"api/update_car/" + id, formData)
    .then((response) => {
      NotificationManager.success('Car has been update!', 'Success', 5000);
      dispatch(fetchCars());
    })
    .catch((error) => {
      NotificationManager.error("An error occured in the operation", 'Error', 5000);
    })
  }
}

export function fetchDetails(){
  return function (dispatch) {
    axios.get(baseUrl+"api/details")
    .then((response) => {
     dispatch({type: "FETCH_DETAILS_FULFILLED", vehicles: response.data.data.vehicles, models: response.data.data.models });
    })
    .catch((error) => {
     dispatch({type: "FETCH_DETAILS_REJECTED", payload: error});
    })
  }
}