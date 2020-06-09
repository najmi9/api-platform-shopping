import React, { useState, useEffect, useContext} from 'react';
import AuthContext from "../contexts/AuthContext";
import { Link } from 'react-router-dom';
import LoginModal from '../Pages/LoginModal';
import Register from '../Pages/Register';
import { connect } from 'react-redux';
import PayNow from '../Components/PayNow'

const Paypal = () =>{
 const { isAuthenticated, setIsAuthenticated, price} = useContext(AuthContext);

	return <div className="container mt-5 p-5" id="component">
	   <h1 className="text-center bg-primary text-light ">
      { price } Dhs à payer.
      </h1>
             { isAuthenticated && (
              <PayNow />) }
		{!isAuthenticated && (
              <div>
            
                       <LoginModal />
                      <h1>
                          Vous n'avez pas un compte !
                           Essayer de crée un c'est très facile ! 
                      </h1>
                   
                      <Register />
                    
              </div>
			)}
	       </div>
}


const mapStateToProps = (state) =>{
  return {
    total : state.cart.reduce((total, item)=>total+item.quantity * item.product.price,0)
  }
}

export default connect(mapStateToProps)(Paypal);
