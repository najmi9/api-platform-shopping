import axios from 'axios';
import { API_URL } from './Config';

const ORDER_URL = API_URL+"/orders";

const createOrder = async data =>{
 const res = await axios.pose(ORDER_URL, data);
 return await res.data;
} 

const fetchOrdersForThisUser = async (id) =>{
	const res = await axios.get(ORDER_URL+"?user="+id);
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