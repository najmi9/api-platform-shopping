import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/js/bootstrap.js';
import "react-toastify/dist/ReactToastify.css";
import '../css/app.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
