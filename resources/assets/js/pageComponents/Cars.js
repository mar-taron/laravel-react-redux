
import React, {Component}  from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/Home.scss'
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
    console.log(baseUrl);
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
        <h1 className="pull-left">cars</h1>
        <div className="col-lg-12">
			  <table className="table table-responsive">
			  <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Contact Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
                {/* this.props.cars.map((car, index) => {
                    return (
                      <tr key={index+1}>
                        <td>{car.fullname}</td>
                        <td>{car.email}</td>
                        <td>{car.phone_number}</td>
                        <td>{car.contact_address}</td>
                        <td>
<Link to={'cars/'+car.car_id+'/edit'} className="btn btn-success btn-xs pull-left"><i className="glyphicon glyphicon-pencil"></i></Link>
<form id={"form_"+car.car_id} className="pull-left" method="post">
                  <input type="hidden" name="car_id" value={car.car_id} />
                  <a className="btn btn-danger btn-xs" onClick={(event) => this.handleBtnDelete(car.car_id, event)} href="#" id={car.car_id}><i className="glyphicon glyphicon-trash"></i></a>
                </form>
              </td>
            </tr>
          )
        }) */}
        </tbody>
			</table>
			</div>
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
