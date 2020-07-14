import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import AuthAPI from '../Services/AuthAPI';
import Login from '../Pages/Login';
import UserInfo from './UserInfo';

const PublicRoute = ({path, component}) =>{

   const [user, setUser] = useState({});

   useEffect(()=>{
     UserInfo.parseJwt().then(response=>{
       if(!response){
       	return;
       }
       setUser(response);
     });

   }, [user])

	return (<>
	 {!AuthAPI.isAuthenticated() && (<Route path={path} component={component} />) }
	 
	 { AuthAPI.isAuthenticated() && (<>
	 	<h3 className="text-center text-dnager">
	   Vous êtes connecté comme 
	   <span className="text-danger"> { user.email }</span>
	  </h3>
	          	
	          	</>) }
		  </>) 
}
export default PublicRoute;