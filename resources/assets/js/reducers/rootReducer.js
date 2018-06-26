import { combineReducers } from 'redux';
import auth from './authReducer';
import modal from './modalReducer';
import cars from './carsReducer';

const rootReducer = combineReducers({
	auth,
	modal,
	cars
})

export default rootReducer;
