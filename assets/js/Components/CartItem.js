import React, {useStae, useRef} from 'react';
import { connect } from 'react-redux';
import CartAPI from '../Services/CartAPI';

const CartItem = ({ handleDeleteProduct, item, index, removeFromCart,  addToCart, cartItems,handleChange }) =>{
  const input = useRef(null);
   const isChecked  = () =>{
   const element = document.querySelector("input#js-selectionned-item.check-"+item.product.id)
    
    if (element) {
      return element.checked 
    }
   }

	return (    <div className="card">
                 <div className="card-title">
                    
                      <span className="text-left text-primary" 
                         style={{"fontSize":25+"px"}} > 
                         { item.product.price } Dhs
                      </span>
                      <input type="checkbox" onChange={()=>handleChange(item) }
                      value={item.product.price * item.quantity} 
                      id="js-selectionned-item" 
                      className={"check-"+item.product.id}
                      ref={input}
                     /> 
                    
                 </div>
                 <div className="card-body">   
                    <p className="card-img"> 
                      <img 
                      alt={"img"} 
                         src="https://picsum.photos/id/32/200/300"
                           className="card-img" /> 
                   
                    </p>
                   <p className="text-center"> { item.product.title } </p>
                   <p className="text-center"> 

                     <button className="btn btn-sm btn-primary mr-2"
                     onClick={()=>addToCart(item.product)} 
                    disabled={isChecked()?(true):(false)}
                     >+
                     </button>

                      <span id="js-qts">
                        { item.quantity } 
                      </span>

                      <button className="btn btn-sm btn-primary ml-2" 
                      onClick={()=>removeFromCart(index)} 
                      disabled={isChecked()?(true):(false)}
                      >-</button>
                      {"  "}
                      <button className="btn btn-success m-3">
                        { item.product.price *  item.quantity} Dhs
                      </button>
                      <button onClick={()=>handleDeleteProduct(index, item)} 
                      className="btn btn-danger btn-small m-2" 
                      disabled={isChecked()?(true):(false)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                   </p>
                </div>
              </div>)
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
  }
}

export default connect(mapStateToProps, mapDispatchToState)(CartItem);