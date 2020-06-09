import React from 'react';
import PRODUCT_URL from './Config';
import axios from 'axios';

const fetchProducts = () => {
	return axios.get(PRODUCT_URL);
}

const fetchProduct = (id) =>{
     return axios.get(PRODUCT_URL+"/"+id);
}
const deleteProduct = (id) =>{
     return axios.delete(PRODUCT_URL+"/"+id);
}
const updateProduct = (id, data) =>{
     return axios.put(PRODUCT_URL+"/"+id, {
     	data
     });
}

const createProduct = (data) =>{
     return axios.post(PRODUCT_URL, {
     	data
     });
}




export default {
	fetchProducts,
	fetchProduct,
	deleteProduct,
	updateProduct,
	createProduct
}


