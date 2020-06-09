import axios from 'axios';
import {API_URL} from './Config';
import UserInfo from '../Components/UserInfo';

const CART_URL = API_URL + "/carts";
const createCart = async (cart) =>{
	//console.log(cart.quantity)
	const response = await axios.post(CART_URL, cart);
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
	const CARTS_OF_USER = CART_URL + "?user="+ id+"&&paid=0"; 
	const response = await axios.get(CARTS_OF_USER);
	return await response.data['hydra:member'];
}

const updateCartsOfUser = async (cartsItems) =>{

  const oldCarts =JSON.parse(localStorage.getItem('oldCarts')) ;
  if (oldCarts) {
  	 cartsItems.forEach(async(cart)=>{
  	const card = oldCarts.filter(o=>o.product.id === cart.product.id);
  	if (card.length===1) {
  		if(card[0].quantity !== cart.quantity){
  		await updateCart(card[0].id,{
          	"product": API_URL+"/products/"+card[0].product.id,
            "quantity":cart.quantity
           })

  	}
  }else{
  	await createCart({
          	"product": API_URL+"/products/"+cart.product.id,
          	"quantity":cart.quantity
          });
  }
  		
  		
  	
  });
  }
 

   //const cs = await fetchCartsOfUser(UserInfo.parseJwt().userId);
  // localStorage.setItem('oldCarts', JSON.stringify(cs));
     
}

export default {
	updateCartsOfUser,
	fetchCartsOfUser,
	createCart,
	updateCart,
	deleteCart
}