import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Login from '../Pages/Login';

const PrivateRoute = ({path, component}) =>{
	const { isAuthenticated } = useContext(AuthContext);

	return <> {isAuthenticated && (<Route path={path} component={component} />) }
	          { !isAuthenticated && (<><h1 className="text-center text-dnager"> Se connecter pour voir la page ! </h1>
	          	<Login /></>) }
		  </> 
}
export default PrivateRoute;