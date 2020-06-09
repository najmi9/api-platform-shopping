import React, {useStae} from 'react';
import { connect } from 'react-redux';
import CartAPI from '../Services/CartAPI';
import moment from 'moment';



const CartItem = ({ old, item, index, removeFromCart,  addToCart, cartItems,handleChange }) =>{



	return (<>    
                <td> <input type="checkbox" onChange={()=>handleChange(item) } value={item.product.price * item.quantity} id="js-selectionned-item" /> </td>
                <td>  { moment(item.createdAt , "YYYYMMDD").fromNow()}  </td>      
                <td>  { item.product.id } </td>
                <td> <img alt={item.product.picture} src={ item.product.picture } width="90px" height = "90px" /> </td>
                <td className="text-center" style={{ maxWidth:200 +'px' }}> { item.product.title } </td>
                <td> { item.product.price } Dh </td>
                <td> 
                   {!old && (<button className="btn btn-sm btn-primary mr-2"
                      onClick={()=>addToCart(item.product)}>+</button>) }
                 
                     

                      <span id="js-qts">
                     { item.quantity } 
                     </span>

                     {!old && (<button className="btn btn-sm btn-primary ml-2" 
                      onClick={()=>removeFromCart(index)}>-</button>)}
                </td>
                <td>
                 { item.product.price *  item.quantity}
               
                </td>
              

       </>)
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