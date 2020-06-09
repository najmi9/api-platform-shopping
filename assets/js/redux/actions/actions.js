import {ADD_TO_CART}  from './types';

export default function addToCart(productInfo) {
	return {
		type: ADD_TO_CART,
		productInfo
	}
}