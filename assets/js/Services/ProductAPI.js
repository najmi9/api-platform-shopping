//import PRODUCT_URL from './Config';
import Cache from "./Cache";
import axios from 'axios';

const API_URL = "http://localhost:8000/api";
const PRODUCT_URL = API_URL + "/products";

const fetchProducts = async () => {
  //Cache.invalidate('products');
  const cachedProducts = await Cache.get("products");
if (cachedProducts) {return cachedProducts}
   const res = await axios.get(PRODUCT_URL);
  Cache.set('products', await res.data['hydra:member']);
	  return await res.data['hydra:member'];
}

const fetchProduct = async (id) =>{
  const cachedProduct = await Cache.get("product-"+id);
  if (cachedProduct) {
    return cachedProduct
  }
      const res = await axios.get(PRODUCT_URL+"/"+id);
      Cache.set("product"+id, res.data)
     return res.data;
}
const deleteProduct = async (id) =>{
     const res = await axios.delete(PRODUCT_URL+"/"+id);
     return res.data;
}
const updateProduct = async (id, data) =>{
  Cache.invalidate('products');
  const response = await axios.put(PRODUCT_URL+"/"+id,  data );
     return response.data;
}

const createProduct = async (data) =>{
 
   const response = await axios.post(PRODUCT_URL, data);
     return response.data;
}

const fetchCategories = async () =>{
  const cachedCategories = Cache.get('categories');
  //if (cachedCategories) {
  //  return cachedCategories
  //}
   const res = await axios .get(API_URL+"/categories")
   Cache.set('categories',res.data['hydra:member'] );
     return res.data['hydra:member'];
}


export default {
	fetchProducts,
	fetchProduct,
	deleteProduct,
	updateProduct,
	createProduct,
     fetchCategories
}


