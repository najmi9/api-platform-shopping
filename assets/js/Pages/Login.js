import React, { useState } from 'react';
import AuthAPI from '../Services/AuthAPI';
import { toast } from 'react-toastify';
import CartAPI from '../Services/CartAPI';
import { connect } from 'react-redux';
import UserInfo from '../Components/UserInfo';
import { Link } from 'react-router-dom';

const Login = ({ history, cartItems, addToCart}) => {
 const [credentials, setCredentials] = useState({
  'email': '',
  'password': ''
 })

 const [oldCarts, setOldCarts] = useState([]);
 const [loading, setLoading] =useState(false);

 const apiErrors = {};
 
  const handleChange = ({ currentTarget })=>{
    const {name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }
    
     const fetchCarts = async () =>{
      const user = await UserInfo.parseJwt();    
      if (user.userId) {
      const carts = await CartAPI.fetchCartsOfUser(user.userId);
      if (carts.length>0) {
        localStorage.setItem('oldCarts', JSON.stringify(carts))
      }
      carts.map(c=>{
        addToCart(c.product);
      });

      if (cartItems.length>0) {
          await  CartAPI.updateCartsOfUser(cartItems);
          const cs = await CartAPI.fetchCartsOfUser(user.userId);
          localStorage.setItem('oldCarts', JSON.stringify(cs)); 
      }
      }        
    }

     const handleSubmit =async  e =>{
       setLoading(true);
       e.preventDefault();
    try {
      const response = await AuthAPI.authenticate(credentials);
      await fetchCarts();
      toast.success('Votre connexion a été bien fait');
      setLoading(false);
      history.push("/");
    } catch(error) {
      setLoading(false);
     if (error.response &&error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
     }else {
       toast.error("une erreur est servenue réyasser plustard !")
     }
    }
  }
	return <div className="bg-light container p-4 mt-4" id="login-desktop">
      <h5 className="text-center text-success m-3"> Connexion au site</h5>
      {loading && (<div className="d-flex justify-content-center text-success" 
           role="status" id="spinner">
           <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
              <span className="sr-only">Loading...</span>
           </div>
              </div>)
            }

      {!loading && (<div className="bg-light text-center m-2">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group mb-2">
               <div className="input-group-prepend">
                 <div className="input-group-text"><i className="fas fa-envelope"></i>
                 </div>
               </div>
               <input type="email" placeholder="Entrez votre email ..."
                className="form-control" onChange={handleChange} 
                  value={credentials.email} name="email" required={true} />
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
            onChange={handleChange}  value={credentials.password} 
            required={true} />
          </div>
        </div>
         <button type="submit" 
          className="btn btn-primary"> Connexion ! 
          </button>

        </form>
         <div className="m-3">
        <Link to="/reset-password" className="btn">
         J'ai oublié le mot de passe ?
          </Link>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);