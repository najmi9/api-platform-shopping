import './App.css';
import './Style/MobileStyle.css';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import  store  from './redux/store/store';
import AuthContext from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ToTop from './Components/ToTop'
import PasswordForgotten from './Components/PasswordForgotten'
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Contacts from './Pages/Contacts';
import ResetPassword from './Pages/ResetPassword';
import Product from './Pages/Product';
import Paypal from './Pages/Paypal';
import Activation from './Pages/Activation';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Test from './Pages/Test';
import BuyProduct from './Pages/BuyProduct';
import { ToastContainer, toast } from "react-toastify";
import AuthAPI from "./Services/AuthAPI";
import PrivateRoute from './Components/PrivateRoute';
import Orders from './Pages/Orders';
import Sidebar from './Components/Sidebar';



 AuthAPI.setup();



const  App = ({ cartItems }) => {
 
    const  isOk = AuthAPI.isAuthenticated()
    const [isAuthenticated, setIsAuthenticated] = useState(isOk);
 
   const [price, setPrice] = useState(0);
   const [carts, setCarts] = useState([]);
   const [product, setProduct] = useState(false);

   const NavbarWithRouter = withRouter(Navbar);

  return (
  <Provider store={store}>
  <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        price,
        setPrice,
        carts,
        setCarts,
        product,
        setProduct,
      }}
    >
   <Router>
   <NavbarWithRouter />
   <Sidebar />
      <Switch>
      <Route path="/login" component={ Login } exact/>
      <Route path="/register" component={ Register } exact/>
      <PrivateRoute path="/product/buy/end" component={ Paypal } exact/>
      <Route path="/reset-password" component= { PasswordForgotten} exact />
      <Route path="/new-password" component= { ResetPassword} exact />
      <Route path="/" component= { Home} exact />
      <Route path="/email-confirmation" component= { Activation} exact />
      <Route path="/test" component= { Test} exact />
      <Route path="/cart" component= { Cart } exact />
      <Route path="/new-contact" component= { Contact } exact />
      <PrivateRoute path="/contact/:id" component= { Contact } exact />
      <PrivateRoute path="/contacts" component= { Contacts } exact />
      <PrivateRoute path="/orders" component= { Orders } exact />
      <PrivateRoute path="/product/:id" component= { Product } exact />
      <PrivateRoute path="/product/new" component= { Product } exact />
      <Route path="/product/buy/:productId" component= { BuyProduct } exact />
     </Switch>
     <ToTop />
     
     <Footer />
   </Router>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </AuthContext.Provider>
     </Provider>
  );
}
              

export default App;