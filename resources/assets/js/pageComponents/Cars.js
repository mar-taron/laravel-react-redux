
import React, {Component}  from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/Table.scss'
import { connect } from "react-redux";
import { baseUrl } from '../config';
import { Link } from "react-router";
import { fetchCars, deleteCar } from "../carsComponents/carActions";

class Cars extends React.Component{
  constructor(){
    super();
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
    this.handleBtnUpdate = this.handleBtnUpdate.bind(this);
   }

  componentWillMount(){
    this.props.dispatch(fetchCars());
  }

  handleBtnUpdate(id, event){
    event.preventDefault();
    let r = confirm("Are you sure you want to delete this document!");
    if (r == true) {
      const url = baseUrl+"/api/v1/cars/delete";
      let formElement = document.getElementById("form_"+id);
      let formData = new FormData(formElement);
      this.props.dispatch(deletecar(formData));
    }
  }

  handleBtnDelete(id, event){
    event.preventDefault();
    if (confirm("Are you sure you want to delete this car!")) {
      let formElement = document.getElementById("form_"+id);
      let formData = new FormData(formElement);
      this.props.dispatch(deleteCar(formData));
    }
  }

  render(){
    return(
        <div>
        <table>
          <caption>Cars</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Vehicle</th>
              <th scope="col">Model</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.cars.map((car, index) => {
              return (
                <tr key={index+1}>
                  <td data-label={car.name}>{car.name}</td>
                  <td data-label="Image">Image</td>
                  <td data-label={car.vehicle}>{car.vehicle}</td>
                  <td data-label={car.model}>{car.model}</td>
                  <td>
                    {<form id={"form_"+car.id} className="pull-left" method="post">
                      <button onClick={(event) => this.handleBtnUpdate(car.id, event)}>Update</button>
                      <button onClick={(event) => this.handleBtnDelete(car.id, event)}>Delete</button>
                      <input type="hidden" name="car_id" value={car.id} />
                    </form>}
                  </td>
                </tr>
              )
            }) 
          }
          </tbody>
        </table>
      </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      cars: state.cars.cars
    }
  }

  export default connect(mapStateToProps)(CSSModules(Cars, styles))
