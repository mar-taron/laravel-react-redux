import React from 'react';
import {connect} from 'react-redux';

// import ExportDataModal from './ExportDataModal.jsx';
import * as actions from './modalActions.js';
import SignInModal from '../authComponents/SignInModal';
import SignOutModal from '../authComponents/SignOutModal';
import SignUpModal from '../authComponents/SignUpModal';
import CreateModal from '../carsComponents/CreateModal';
import UpdateModal from '../carsComponents/UpdateModal';


const ModalConductor = props => {
  switch (props.currentModal) {
    case 'SIGN_IN':
    	return <SignInModal {...props}/>;
	case 'SIGN_OUT':
		return <SignOutModal {...props}/>;
	case 'SIGN_UP':
		return <SignUpModal {...props}/>;
	case 'CREATE':
		return <CreateModal {...props}/>;

	case 'UPDATE':
		return <UpdateModal {...props}/>;

	default:
      return null;
  }
};

function mapStateToProps(state) {
	return {currentModal: state.modal.currentModal}
}

export default connect(mapStateToProps, actions)(ModalConductor);
