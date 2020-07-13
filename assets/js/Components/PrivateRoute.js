import React from 'react';
import { Route } from 'react-router-dom';
import AuthAPI from '../Services/AuthAPI';
import Login from '../Pages/Login';

const PrivateRoute = ({path, component}) =>{

	return <> {AuthAPI.isAuthenticated() && (<Route path={path} component={component} />) }
	          { !AuthAPI.isAuthenticated() && (<><h1 className="text-center text-dnager"> Se connecter pour voir la page ! </h1>
	          	<Login /></>) }
		  </> 
}
export default PrivateRoute;