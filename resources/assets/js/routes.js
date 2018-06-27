import React from 'react';
import {Router,
		Route,
		Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

//public pages
import Layout from './layoutComponents/Layout';
import Home from './pageComponents/Home';
import Cars from './pageComponents/Cars';
// import NewCar from "./pageComponents/NewCar";
// import EditCar from "./pageComponents/EditCar";


//auth pages
import requireAuth from './authComponents/common/requireAuth';

// misc
import NoMatch from './components/NoMatch';

const routerHistory  = createBrowserHistory()

const Routes = () => {
	return (
		<Router history={routerHistory}>
			<Layout>
				<Route exact path="/" component={Home}/>
				<Route path="/Cars" component={requireAuth(Cars)} />
		      
			</Layout>
		</Router>
	)
}

export default Routes
