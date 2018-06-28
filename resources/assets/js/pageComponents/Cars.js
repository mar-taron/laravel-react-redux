
import React, {Component}  from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/Table.scss'
import { connect } from "react-redux";
import { baseUrl } from '../config';
// import { Link } from "react-router";
import { fetchCars, deleteCar } from "../carsComponents/carActions";

class Cars extends React.Component{
  constructor(){
    super();
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }

  componentWillMount(){
    this.props.dispatch(fetchCars());
  }
 
  handleBtnDelete(id, event){
    event.preventDefault();
    let r = confirm("Are you sure you want to delete this document!");
    if (r == true) {
      const url = baseUrl+"/api/v1/cars/delete";
      let formElement = document.getElementById("form_"+id);
      let formData = new FormData(formElement);
      this.props.dispatch(deletecar(formData));
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Name">Visa - 3412</td>
              <td data-label="Image">04/01/2016</td>
              <td data-label="Vehicle">$1,190</td>
              <td data-label="Model">03/01/2016 - 03/31/2016</td>
            </tr>
          </tbody>
        </table>
      </div>
      );
    }
  }

  // mapStateToProps(state) {
  //   return {
  //    // cars: state.cars.cars,
  //   };
  // };

  export default connect(null)(CSSModules(Cars, styles))
