import React from 'react';
import {  Link } from 'react-router-dom'

const Navbar = () =>{

return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="/">Najmi IMAD</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <a className="nav-link" href="/" data-toggle="tooltip" data-placement="top" title="Home">
        <i className="fas fa-home"></i>Home 
        <span className="sr-only">(current)</span>
        </a>
      </li>
       <li className="nav-item ">
        <Link className="nav-link"  to="/form" data-toggle="tooltip" data-placement="top" title="Contact">
        <i className="fas fa-user"></i>Form
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/contact" data-toggle="tooltip" data-placement="top" title="Contact">
        <i className="fas fa-users" ></i>Contact
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/products" data-toggle="tooltip" data-placement="top" title="Contact">
        <i className="fas fa-pen" ></i>Products
        </Link>
      </li>
     </ul>  

    </div>
    </nav>
}

export default Navbar;