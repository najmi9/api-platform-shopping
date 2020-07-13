import React from 'react';
import AuthAPI from "../Services/AuthAPI";
import { NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from 'react-redux';
import CartAPI from '../Services/CartAPI'
import Cache from '../Services/Cache'

const Navbar = ({ history, totalQuantity, cartItems, clearCart }) =>{
  
    const handleLogout = async () => {
     await CartAPI.updateCartsOfUser(cartItems);
    localStorage.clear();
    clearCart();
    await AuthAPI.logout();
    Cache.invalidate('souk-sidi-el-mokhtar-orders');
    Cache.invalidate('products');
    Cache.invalidate('likes');
    toast.info("Vous êtes désormais déconnecté 😁");
    history.push("/");
  };

	return <nav className="navbar navbar-expand-md navbar-light bg-light navbar-prod mb-3 w-100">
   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <NavLink className="navbar-brand" to="/">Souk Sidi El Mokhtar </NavLink>
 
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
  <i className="fas fa-home"></i>
        Home</NavLink>
      </li>
 <li className="nav-item">
        <NavLink className="nav-link" to="/new-contact">
  <i className="fas fa-envelope"></i>
        Message</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/orders">
  <i className="fas fa-luggage-cart"></i>
        MyOrders</NavLink>
      </li>
     
    </ul>
  
  <ul className="navbar-nav ml-auto">
          {(!AuthAPI.isAuthenticated() && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                <i className="fas fa-user-plus"></i>
                  Inscription
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-success"
                >
                 <i className="fas fa-sign-in-alt"></i>
                  Connexion !
                </NavLink>
              </li>
            </>
          ))}
          {AuthAPI.isAuthenticated() && (
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-danger">
               <i className="fas fa-lock"></i>  Déconnexion
              </button>
            </li>
          )}
        </ul>
  </div>
  <nav className="navbar navbar-expand-lg">
   <ul className="navbar-nav ml-auto">
  <li className="nav-item">
        <NavLink className="nav-link" to="/cart" tabIndex="-1">
            <i className="fas fa-shopping-cart"></i>  
            <span id="js-items" className="badge badge-primary"> 
                { totalQuantity }
            </span>
        </NavLink>
      </li>
      </ul>
  </nav>
</nav>

}

const mapStateToProps = state =>{
  return {
    cartItems: state.cart,
    totalQuantity : state.cart.reduce((totalQuantity, item)=>totalQuantity + item.quantity ,0)
  }
}
const mapDispatchToState = dispatch =>{
  return {
     clearCart: ()=>dispatch({type:'CLEAR_CART'})
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Navbar);
