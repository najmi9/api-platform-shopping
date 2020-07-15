import axios from 'axios';
import {API_URL} from './Config';
import { toast } from 'react-toastify';

const CART_URL = API_URL + "/carts";
const createCart = async (id, quantity) =>{
	//console.log(cart.quantity)
	const response = await axios.post(CART_URL, {
        'product':API_URL+"/products/"+id,
        'quantity':quantity
      });
	return await response.data;
}

const deleteCart = async (id) =>{
	const response = await axios.delete(CART_URL + "/"+id);
	return await response.data;
}

const updateCart = async (id, cart) =>{
	const response = await axios.put(CART_URL+"/"+id, cart);
	return await response.data;
}
const fetchCartsOfUser = async (id)=>{
	const CARTS_OF_USER = CART_URL + "?user="+ id+"&paid=0"; 
	const response = await axios.get(CARTS_OF_USER);
	return await response.data['hydra:member'];
}


const updateCartsOfUser = async (cartsItems) =>{
  console.log(cartsItems)
  if (!cartsItems || cartsItems.length === 0) {
    return;
  }

  const oldCarts =JSON.parse(localStorage.getItem('oldCarts'));
  console.log(oldCarts)
  if (!oldCarts || oldCarts.length === 0) {
     cartsItems.forEach(async(cart)=>{
      try {
        const res = await createCart(cart.product.id, cart.quantity);
        console.log(res);
      } catch(e) {
        if (e.response) {
          toast.error(e.error.message)
          console.log(e.response);
        }
        if (e.request) {
          toast.error(e.error.message)
          console.log(e.request);
        }
      }
     });
     return;
  }
  cartsItems.forEach(async(cart)=>{
   
  	const card = oldCarts.filter(o=>o.product.id === cart.product.id);
  	if (card.length === 1) {
      //if cartItems ==== oldCarts ==> cartItems.default === 0;
  		if(card[0].quantity !== cart.quantity){

  		  await updateCart(card[0].id,{
          	"product": API_URL+"/products/"+card[0].product.id,
            "quantity":cart.quantity});
  	  }
    }else{
  	  await createCart(cart.product.id, cart.quantity);
    }
  }); 
}

export default {
	updateCartsOfUser,
	fetchCartsOfUser,
	createCart,
	updateCart,
	deleteCart
}