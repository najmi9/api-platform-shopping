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
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import PasswordForgotten from './Components/PasswordForgotten'
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import ResetPassword from './Pages/ResetPassword';
import Paypal from './Pages/Paypal';
import Activation from './Pages/Activation';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import BuyProduct from './Pages/BuyProduct';
import { ToastContainer, toast } from "react-toastify";
import AuthAPI from "./Services/AuthAPI";
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import UrlNotFound from './Components/UrlNotFound';
import Orders from './Pages/Orders';

 AuthAPI.setup();

const  App = ({ cartItems }) => {
  
   const [price, setPrice] = useState(0);
   const [carts, setCarts] = useState([]);
   const [product, setProduct] = useState(false);

   const NavbarWithRouter = withRouter(Navbar);

  return (
  <Provider store={store}>
  <AuthContext.Provider
      value={{
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
   
      <Switch>
      <PublicRoute path="/login" component={ Login } exact/>
      <Route path="/register" component={ Register } exact/>
      <PrivateRoute path="/pay-for-product" component={ Paypal } exact/>
      <Route path="/reset-password" component= { PasswordForgotten} exact />
      <Route path="/new-password" component= { ResetPassword} exact />
      <Route path="/" component= { Home} exact />
      <Route path="/email-confirmation" component= { Activation} exact />
      <Route path="/cart" component= { Cart } exact />
      <Route path="/new-contact" component= { Contact } exact />
      <PrivateRoute path="/orders" component= { Orders } exact />
      <Route path="/product-:productId" component= { BuyProduct } exact />
      <Route component={UrlNotFound} />
     </Switch>
    
     
     <Footer />
   </Router>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </AuthContext.Provider>
     </Provider>
  );
}
              

export default App;