import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Header.scss'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../../sharedComponents/styles/styles.css';


import Navigation from './Navigation/Navigation'

class Header extends Component {
    render() {
		return (
			<header styleName="header">
				<section styleName="HeaderBar">				    	
					<Navigation />
				</section>
				<NotificationContainer/>

			</header>
		)
    }
}

export default CSSModules(Header, styles)
