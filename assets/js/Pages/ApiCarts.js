import React, { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";
import CartAPI from '../Services/CartAPI';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const ApiCart = ({ cartItems, addToCart  })=>{

if (localStorage.getItem('authToken')) {

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

   const id = parseJwt(localStorage.getItem('authToken')).userId;
        
        const data = async ()=>{
          const oldCarts = await CartAPI.fetchCartsOfUser(id);


        data();
    }    
}
return<div></div>;
   
}


const mapStateToProps = state =>{
	return {
		cartItems : state.cart
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		addToCart : (productInfo)=>dispatch({type:'ADD_TO_CART', productInfo})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiCart);