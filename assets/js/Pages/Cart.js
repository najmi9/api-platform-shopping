import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthContext from "../contexts/AuthContext"; 
import CartAPI from '../Services/CartAPI';
import UserInfo from '../Components/UserInfo';
import CartItem from '../Components/CartItem';
import { toast } from 'react-toastify';
import Paypal from './Paypal';


const Cart = ({ total, cartItems, removeFromCart, addToCart, removeAllQuantity })=> {

 const { isAuthenticated, setPrice, setCarts } = useContext(AuthContext);
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

 const updateCartState = async () =>{
  if (isAuthenticated) {
    if (UserInfo.parseJwt()) {
        await  CartAPI.updateCartsOfUser(cartItems);
  const cs = await CartAPI.fetchCartsOfUser(UserInfo.parseJwt().userId);
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

    useEffect(()=>{
   // fetchCarts();
   // setLoading(true);
 },[])

  const renderCart = (data)=>(
     <table className="table  table-striped">  
         <thead>
         <tr>
         <th> </th>
         <th> date : </th>
           <th> ID :</th>
           <th>Image :</th>
           <th>Titre</th>
           <th>Prix :</th>
           <th>Quantité :</th>
           <th> Somme en Dh: </th>
         </tr>
         </thead>
         <tbody>
            {(data.map((item, index)=>( <tr key={index}>
              <CartItem old={false} item={item} index={index} handleChange={()=>handleChange(item)} />
               { (<td>   <button onClick={()=>handleDeleteProduct(index, item)} className="btn btn-danger btn-small">
                    <i className="fas fa-trash"></i>
                  </button></td>)} 
                

             </tr>)))}           
         </tbody>
        </table>
  );

 return <div className="container mt-5">
 <div className="mt-10 text-center" style={{'marginTop':50+'px'}}>
 Bienvenue dans de votre cart :
 </div>
  <div className="mb-5">    
  <table className="table" style={{'position':'sticky', 'top':100 + 'px', 'background':'black', 'color':'white'}}>

  <tr>
    <th> total de cart: {total} Dhs </th>
    <th className="text-right"> total des produits Séléctionnés : { selectionnedTotal } Dhs</th>
  </tr>

  </table>
   {cartItems.length>0 && (<>
     <h1 className="mt-5"> Les nouveaux produites : </h1>
     {  renderCart(cartItems) }
     <div>

      {selectionnedTotal>0 && (  <Link className="text-center btn-success" onClick={updateCartState} to="/product/buy/end" >
           finaliser les paiement !
        </Link>)}
      </div>
      </>
    )}

    <div>
      <h1> Séléctionnez les produits pour les achter  ! </h1>
    </div>


        { cartItems.length=== 0 && (<div>
          <div className="cart-move">
          <i className="fas fa-shopping-cart fa-10x"></i>
          </div>
          <h1 className="text-center"> Il n'y a pas ecncore des produits dans le pannier ! </h1>
          </div>)
        }
      </div>
     </div>
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