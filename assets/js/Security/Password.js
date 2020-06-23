import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/js/bootstrap.js';
import "react-toastify/dist/ReactToastify.css";
import '../Style/home.css';
import Theme from './index'

ReactDOM.render(
  <React.StrictMode>
   <Router>
      <Theme />
   </Router>
  </React.StrictMode>,
  document.getElementById('newpassword-header')
);


ReactDOM.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
  document.getElementById('newpassword-footer')
);

