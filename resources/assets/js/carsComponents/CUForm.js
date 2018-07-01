import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setModal } from '../sharedComponents/modalActions';
import { createCar, updateCar} from './carActions';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Select from 'react-select';

import TextFieldGroup from '../sharedComponents/TextFieldGroup';
import ImageUploader from 'react-images-upload';
import { CREATE, UPDATE } from '../config';


import 'react-select/dist/react-select.css';
import styles from '../sharedComponents/styles/formStyles.scss';

class CUForm extends Component {
	constructor() {
		super();
		this.state = {
            name: '',
            selectedFile: '',
			vehicles : [],
			models : [],
			vehicle: '',
			model: '',
			errors : '',
			isLoading : false,
			user: null
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.changeVehicle = this.changeVehicle.bind(this);
		this.changeModel = this.changeModel.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
	}

	componentDidMount(){
		this.getDetails();
		if (this.props.mode === UPDATE) {
			this.setData();
		} 
	}

	setData(){
		this.setState({
			name: this.props.car.name,
			selectedFile: {
				name: this.props.car.image
			},
			vehicle: {
				value: this.props.car.vehicle_id,
				label: this.getCarVehicleName(this.props.car.vehicle_id)
			},
			model: {
				value: this.props.car.model_id,
				label: this.getCarModelName(this.props.car.model_id)
			}
		});
	}

	getDetails(){
		const vehicles = [];
		const models = [];
		this.props.vehicles.forEach(function(vehicle){
			vehicles.push({
				value: vehicle.id,
				label: vehicle.name
			}); 
		})
		this.setState({
			vehicles: vehicles,
			vehicle: vehicles[0]
		}, () => {
			const filteredModels = this.props.models.filter((model) => {
				return model.vehicle_id == this.state.vehicle.value
			});
			filteredModels.forEach(function(model){
				models.push({
					value: model.id,
					label: model.name
				}); 
			})
			this.setState({
				models: models,
				model: models[0]
			})
		});


	}

	getCarVehicleName(id){
		const vehicle = this.props.vehicles.filter((vehicle) => {
			return vehicle.id == id
		});
		return vehicle[0]['name'];
	}

	getCarModelName(id){
        const model = this.props.models.filter((model) => {
			return model.id == id
		});
		return model[0]['name'];
	}

	isValid() {
		// to do validation
		return true;
	}

	createOrUpdate() {
	    let formElement = document.querySelector("form");
	    let formData = new FormData(formElement);
	    formData.append('name', this.state.name);
	    formData.append('vehicle_id', this.state.vehicle.value);
	    formData.append('model_id', this.state.model.value);
        formData.append('image', this.state.selectedFile, this.state.selectedFile.name)
        if (this.props.mode === CREATE) {
          this.props.dispatch(createCar(formData));
        } else if (this.props.mode === UPDATE){
          this.props.dispatch(updateCar(this.props.car.id, formData));
        }
	    
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({errors: {}, isLoading: true});
			this.createOrUpdate();
			this.props.dispatch(setModal(''));
		} else {
			//display errors
		}
	}

	onChange(e) {
		this.setState({ name : e.target.value})
	}

	changeVehicle(selectedOption) {
		const models = [];
		this.setState({ vehicle : selectedOption}, () => {
			const filteredModels = this.props.models.filter((model) => {
				return model.vehicle_id == this.state.vehicle.value
			});
			filteredModels.forEach(function(model){
				models.push({
					value: model.id,
					label: model.name
				}); 
			})
			this.setState({
				models: models,
				model: models[0]
			})
		})
	}

	changeModel(selectedOption) {
		this.setState({ model : selectedOption})
	}

	fileChangedHandler(event) {
	  this.setState({selectedFile: event.target.files[0]})
	}

	render() {

		return (
			<form styleName="modalForm" onSubmit={this.onSubmit}>
				<TextFieldGroup
					placeholder="Name"
					value={this.state.name}
					error={this.state.errors.name}
					onChange={this.onChange}
					/>

				<Select
			        name="vehicle"
			        value={this.state.vehicle.value}
			        onChange={this.changeVehicle}
			        options={this.state.vehicles}
			        className="formSelect"
			        clearable={false}
			      />	

				<Select
			        name="model"
			        value={this.state.model.value}
			        onChange={this.changeModel}
			        options={this.state.models}
			        className="formSelect"
			        clearable={false}
			      />	

			     <div>
			     	<input type="file" onChange={this.fileChangedHandler} />
			     </div>

				<div>
					<button disabled={this.state.isLoading}>Submit</button>
				</div>
			</form>
		)
	}
}

CUForm.contextTypes = {
	router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
	  vehicles: state.cars.vehicles,
	  models: state.cars.models,
	  car: state.cars.car
	}
}


export default connect(mapStateToProps)(CSSModules(CUForm, styles, {'allowMultiple' : true}));
