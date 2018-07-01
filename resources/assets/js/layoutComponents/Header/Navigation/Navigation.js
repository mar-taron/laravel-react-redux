import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../authComponents/authActions';
import { setModal } from '../../../sharedComponents/modalActions';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './Navigation.scss';

class Navigation extends Component {

    constructor(){
    	super();
        this.state = {
        	opened: "hide-menu",
        }
    }

	logout(e) {
		e.preventDefault();
		this.props.setModal('SIGN_OUT');
	}

	openLogin(e) {
		e.preventDefault();
		this.props.setModal('SIGN_IN');
	}

	openSignUp(e) {
		e.preventDefault();
		this.props.setModal('SIGN_UP');
	}

	toogleMenu(){
        this.setState({
        	opened: this.state.opened ? "" : "hide-menu"
        });
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		const userLinks = (
			<nav styleName="navLinks" className="main-menu">
			    <a className="hamburger-menu" onClick={this.toogleMenu.bind(this)}>Menu</a>
			    <ul className={'ul-main-menu ' + this.state.opened} >
			       <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
				   <li><NavLink to="/Cars" activeClassName="active">Cars</NavLink></li>
				   <li><a href="#" onClick={this.logout.bind(this)}>Log Out</a></li>
			    </ul>				
			</nav>
		);
		const guestLinks = (
			<nav styleName="navLinks" className="main-menu">
			    <a className="hamburger-menu" onClick={this.toogleMenu.bind(this)}>Menu</a>
			    <ul className={'ul-main-menu ' + this.state.opened} >
			      <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
				  <li><a href="#" onClick={this.openLogin.bind(this)}>Log In</a></li>
			      <li><a href="#" onClick={this.openSignUp.bind(this)}>Sign Up</a></li>
			    </ul>				
			</nav>
		);
		return (isAuthenticated) ? userLinks : guestLinks;
	}
}

Navigation.PropTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	openLogin: PropTypes.func
}

function mapStateToProps(state) {
	return {auth: state.auth}
}

export default connect(mapStateToProps, { logout, setModal} )(CSSModules(Navigation, styles));
