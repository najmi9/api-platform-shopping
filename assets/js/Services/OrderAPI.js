import axios from 'axios';
import { API_URL } from './Config';
import Cache from "./Cache";


const ORDER_URL = API_URL+"/orders";

const createOrder = async data =>{
 const res = await axios.post(ORDER_URL, data);
 return await res.data;
} 

const fetchOrdersForThisUser = async (id) =>{
	const cachedOrders = await Cache.get("souk-sidi-el-mokhtar-orders");
	if (cachedOrders) {
		return await cachedOrders;
	}
	const res = await axios.get(ORDER_URL);
	Cache.set("souk-sidi-el-mokhtar-orders", await res.data["hydra:member"])
	return await res.data["hydra:member"]; 
}

const canceledOrder =async data =>{
 await axios.post(API_URL+"/cancled_orders", data);
}

export default {
	createOrder,
	fetchOrdersForThisUser,
	canceledOrder
}