import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import LoginModal from '../Pages/LoginModal';

const PrivateRoute = ({path, component}) =>{
	const { isAuthenticated } = useContext(AuthContext);

	return <> {isAuthenticated && (<Route path={path} component={component} />) }
	          { !isAuthenticated && (<><h1 className="text-center"> Access Denied ! </h1>
	          	<LoginModal /></>) }
		  </> 
}
export default PrivateRoute;