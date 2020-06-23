import React from 'react';
import { NavLink } from 'react-router-dom';

const Theme = () =>{
	return(
     <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-prod w-100">
   
 
 
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
  <i className="fas fa-home"></i>
        Home</NavLink>
      </li>
      </ul>
     
  <NavLink className="navbar-brand" to="/">Souk Sidi El Mokhtar </NavLink>

      </nav>
   );
}

export default Theme;