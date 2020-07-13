import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthContext from "../contexts/AuthContext"; 
import CartAPI from '../Services/CartAPI';
import AuthAPI from '../Services/AuthAPI';
import UserInfo from '../Components/UserInfo';
import CartItem from '../Components/CartItem';
import { toast } from 'react-toastify';
import Paypal from './Paypal';
import '../Style/Card.css'


const Cart = ({ total, cartItems, removeFromCart, addToCart, removeAllQuantity })=> {

 const { setPrice, setCarts } = useContext(AuthContext);
 const [selectionnedTotal, setSelectionnedTotal] = useState(0);
 const [selectionnedCarts, setSelectionnedCarts] = useState([]);

 const handleChange = (item) =>{
  var selectionnedTotal = 0;
  var selectionnedCarts = [];
  document.querySelectorAll("input#js-selectionned-item").forEach(e=>{
    if (e.checked) {
        selectionnedTotal = selectionnedTotal + parseInt(e.value);
        selectionnedCarts.push(item);
    }
  });
  setSelectionnedTotal(selectionnedTotal);
  setPrice(selectionnedTotal);
  setCarts(selectionnedCarts); 
 }

 const handleCheckAll = ({currentTarget}) =>{
    if (currentTarget.checked) {
      document.querySelectorAll("input#js-selectionned-item").forEach(e=>{e.checked=true})
        setSelectionnedTotal(total);
        setPrice(total);
        setCarts(cartItems); 
    }else {
           document.querySelectorAll("input#js-selectionned-item").forEach(e=>{e.checked=false})
           setSelectionnedTotal(0);
           setPrice(0);
          setCarts([]); 
    }
 }

 const updateCartState = async () =>{
  if (AuthAPI.isAuthenticated()) {
    const user = await UserInfo.parseJwt();
    if (user.userId) {
        await  CartAPI.updateCartsOfUser(cartItems);
  const cs = await CartAPI.fetchCartsOfUser(user.userId);
   localStorage.setItem('oldCarts', JSON.stringify(cs));
  }
    }
   
 }

   const handleDeleteProduct =(index, item) => {
    alert("Vous êtes sure que vous voulez supprimeer ce produit !");
    const oldCarts = JSON.parse(localStorage.getItem('oldCarts'));
    if (oldCarts) {
        oldCarts.forEach(async (c,i)=>{
     if (item.product.id === c.product.id) {
      oldCarts.splice(i, 1);
      localStorage.setItem("oldCarts", JSON.stringify(oldCarts))
       await CartAPI.deleteCart(c.id)
     }
    })
    } 

    removeAllQuantity(index);

   }

  return (<div>
 
        <table className="table price-table">
          <thead>
            <tr>
              <th> total de cart: {total} Dhs </th>
              <th>
               total Séléctionné :  { selectionnedTotal } Dhs
              </th>
            </tr>
          </thead>
        </table>

        { cartItems.length>0 && (<div className="carts">
          { (cartItems.map((item, index)=>( <div key={index}>
              <CartItem 
                  item={item} 
                  index={index} 
                  handleChange={()=>handleChange(item)} 
                  handleDeleteProduct={()=>handleDeleteProduct(index, item)}
              />                              
            </div>)))
          }
          </div>)
        }

        <div className="payment-btn" >
            { selectionnedTotal>0 && (<div className="pay"> 
                <Link className="text-center btn btn-warning" 
                onClick={updateCartState} to="/pay-for-product" >
                  <i className="fas fa-dollar-sign"></i>
                  finaliser les paiement ! 
                </Link>
                <button className="btn">
                 {selectionnedTotal}
                </button> dhs.
              </div>)
            }

            <div className="payment-btn" >
              <label htmlFor="checkAll">
                 <input type="checkbox" id="checkAll" onChange={handleCheckAll} />
                 Tout Couché 
              </label>

              {selectionnedCarts.length ===0 && (<div className="select-me"> 
                                           <i className="fas fa-check"></i>
                                           Séléctionner les produits qui tu veux acheter maintenant !
                                          </div>)}
            </div>
        </div>

        { cartItems.length=== 0 && (<div className="border mt-5 p-5 text-secondary">
          <div className="text-center">
          <i className="fas fa-shopping-cart fa-8x"></i>
          </div>
          <h1 className="text-center"> 
            Il n'y a pas ecncore des produits dans le panier ! 
          </h1>
          </div>)
        }
     </div>
);
}

const mapStateToProps = (state) =>{
  return {
    cartItems: state.cart,
    total : state.cart.reduce((total, item) => total + item.product.price * item.quantity,0)    
  }
}

const mapDispatchToState = dispatch =>{
  return {
     removeFromCart: (index)=>dispatch({ type: 'REMOVE_FROM_CART', index }),
     addToCart : (productInfo)=>dispatch({type:'ADD_TO_CART', productInfo}),
    removeAllQuantity  : (index)=>dispatch({type: "REMOVE_ALL_QUANTITY", index})
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Cart);