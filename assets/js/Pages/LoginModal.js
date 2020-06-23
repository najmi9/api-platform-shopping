import React, { useState, useContext } from 'react';
import AuthAPI from '../Services/AuthAPI';
import { toast } from 'react-toastify';
import AuthContext from "../contexts/AuthContext";
import  ApiCart from '../Pages/ApiCarts';
import CartAPI from '../Services/CartAPI';
import { connect } from 'react-redux';
import UserInfo from '../Components/UserInfo';
import PasswordForgotten from '../Components/PasswordForgotten';
import { Link } from 'react-router';

const LoginModal = ({ history, cartItems, addToCart}) => {
  const { setIsAuthenticated, setHasRoleAdmin } = useContext(AuthContext);
 const [credentials, setCredentials] = useState({
  'email': '',
  'password': ''
 })
   const [error, setError] = useState("");

 const [oldCarts, setOldCarts] = useState([]);
 const [loading, setLoading] =useState(false);

 const apiErrors = {};
 
  const handleChange = ({ currentTarget })=>{
    const {name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }
    
     const fetchCarts = async () =>{
      const user = UserInfo.parseJwt();    
      if (user) {
      const cs = await CartAPI.fetchCartsOfUser(user.userId);
      if (cs.length>0) {
        localStorage.setItem('oldCarts', JSON.stringify(cs))
      }
      cs.map(c=>{
        addToCart(c.product);
      });
      }  
       await  CartAPI.updateCartsOfUser(cartItems);
       const cs = await CartAPI.fetchCartsOfUser(UserInfo.parseJwt().userId);
       localStorage.setItem('oldCarts', JSON.stringify(cs));  
    }

  const handleSubmit =async  e =>{
       setLoading(true);
    e.preventDefault();
    try {

      await AuthAPI.authenticate(credentials);
      setIsAuthenticated(true); 
      await fetchCarts();
      toast.success('Votre connexion a été bien fait');
        setLoading(false);
    } catch(error) {
      setLoading(false);

      setError(error.response.data.message )
      toast.error(error.response.data.message )
    }
  }
	return <div className="container p-5 mt-5">
      <h5 className="text-center"> Connexion au site</h5>

     <div className="invalid-feedback is-invalid"> {error} </div>

      {loading && (<div className="d-flex justify-content-center text-success" 
           role="status" id="spinner">
           <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
              <span className="sr-only">Loading...</span>
           </div>
              </div>)
            }

      {!loading && (<div className="bt-light text-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group mb-2">
               <div className="input-group-prepend">
                 <div className="input-group-text"><i className="fas fa-envelope"></i>
                 </div>
               </div>
               <input type="email" placeholder="Entrez votre email ..."
                className="form-control" onChange={handleChange} 
                  value={credentials.email} name="email" />
            </div>
          </div>

          <div className="form-group">
           <div className="input-group mb-2">
             <div className="input-group-prepend">
              <div className="input-group-text"><i className="fas fa-lock"></i>
              </div>
            </div>
            <input type="password" placeholder="Entrez votre mot de pass ..."
             className="form-control"  name="password"
            onChange={handleChange}  value={credentials.password} />
          </div>
        </div>
         <button type="submit" 
          className="btn btn-primary"> Connexion ! 
          </button>

        </form>
         <div className="m-3">
        <button type="button" className="btn" data-toggle="modal" data-target="#exampleModal">
 J'ai oublié le mot de passe ?
</button>

  <PasswordForgotten />

        </div>
      </div>)}
  </div> 
}

const mapStateToProps = state=>{
  return {
    cartItems: state.cart
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    addToCart : (productInfo)=>dispatch({type:'ADD_TO_CART', productInfo})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);