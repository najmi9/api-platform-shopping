import React, { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../Services/AuthAPI";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { connect } from 'react-redux';
import PayNow from '../Components/PayNow'

const Paypal = () =>{
 const { price} = useContext(AuthContext);

	return <div className="container p-5" id="component" style={{"paddingBottom":40+"px"}}>
	   <h4 className="text-center text-warning border bg-light p-2">
     { price===0 ? (<>....</>):(<>{ price } Dhs à payer.</>) }
      
      </h4>
             { AuthAPI.isAuthenticated() && (
              <PayNow  />) }
		{!AuthAPI.isAuthenticated() && (
              <div>
            
                       <Login />
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
