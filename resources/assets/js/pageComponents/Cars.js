
import React, {Component}  from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/Table.scss'
import { connect } from "react-redux";
import { baseUrl } from '../config';
import { Link } from "react-router";
import { fetchCars, fetchCar, deleteCar, fetchDetails } from "../carsComponents/carActions";
import { setModal } from '../sharedComponents/modalActions';

const noImage = 'no-image-available.png';

class Cars extends React.Component{
  constructor(){
    super();
    this.handleBtnCreate = this.handleBtnCreate.bind(this);
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
    this.handleBtnUpdate = this.handleBtnUpdate.bind(this);
   }

  componentWillMount(){
    this.props.dispatch(fetchCars());
    this.props.dispatch(fetchDetails());
  }

  handleBtnCreate(e){
    e.preventDefault();
    this.props.setModal('CREATE');
  }

  handleBtnUpdate(id, e){
    e.preventDefault();
     this.props.dispatch(fetchCar(id));
  }

  handleBtnDelete(id, e){
    e.preventDefault();
    if (confirm("Are you sure you want to delete this car!")) {
      this.props.dispatch(deleteCar(id));
    }
  }

  render(){
    return(
        <div>
         <button onClick={(e) => this.handleBtnCreate(e)}>Create New</button>
        <table className={this.props.cars.length ? "" : "hide"}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Vehicle</th>
              <th scope="col">Model</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.props.cars.map((car, index) => {
              return (
                <tr key={index+1}>
                  <td data-label="Name"> <div>{car.name}</div></td>
                  <td data-label="Image">
                     <img src={`${baseUrl}images/${car.image ? car.image: noImage}`} width="60px" height="60px" />
                  </td>
                  <td data-label="Vehicle"><div>{car.vehicle}</div></td>
                  <td data-label="Model"><div>{car.model}</div></td>
                  <td>
                    {<form id={"form_"+car.id} className="pull-left" method="post">
                      <button onClick={(e) => this.handleBtnUpdate(car.id, e)}>Update</button>
                      <button onClick={(e) => this.handleBtnDelete(car.id, e)}>Delete</button>
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
