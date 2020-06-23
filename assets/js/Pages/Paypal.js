import React, { useState, useEffect, useContext} from 'react';
import AuthContext from "../contexts/AuthContext";
import { Link } from 'react-router-dom';
import LoginModal from '../Pages/LoginModal';
import Register from '../Pages/Register';
import { connect } from 'react-redux';
import PayNow from '../Components/PayNow'

const Paypal = () =>{
 const { isAuthenticated, setIsAuthenticated, price} = useContext(AuthContext);

	return <div className="container p-5" id="component">
	   <h4 className="text-center">
      { price } Dhs à payer.
      </h4>
             { isAuthenticated && (
              <PayNow  />) }
		{!isAuthenticated && (
              <div>
            
                       <LoginModal />
                      <h6>
                          Si vous n'avez pas un compte encore !
                           Essayer de crée un c'est très facile ! 
                      </h6>
                   
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
