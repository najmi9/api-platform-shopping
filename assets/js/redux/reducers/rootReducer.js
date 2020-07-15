import React from 'react';

function loadState(){
    try{
        const state = localStorage.getItem('cart');

        if(state !== null){
            return JSON.parse(state);
        }        
    } catch(e){
        // ignore errors
    }

    return {
        cart: [],
        selectedProdcutToBuy: 0
    };
}

const initialState=loadState();

const reducer = (state=initialState, action) => {


	switch(action.type){



		case 'ADD_TO_CART' : {

			const new_state = {...state};
			const productInfo = action.productInfo;
			let isAlreadyExist = false;

		    state.cart.map((item)=>{

		   	if (item.product.id == productInfo.id) {
		   	 	item.quantity ++;
		   	 	isAlreadyExist = true;
		   	 }

		   });

		    	if (!isAlreadyExist) {
           
		    		return  {
                   cart: [ 
                       ...state.cart,
                      {
                      	product: productInfo,
                      	quantity: 1,
                        createdAt: new Date()
                      }                
                   ]
		        }
		    	}else{
		    		return new_state;
		    	}
		}



		case 'REMOVE_FROM_CART' :{

            const new_state = {...state};
            const item =new_state.cart[action.index]
            if(item){
               if (item.quantity == 1) {
                    new_state.cart.splice(action.index, 1);
                    return new_state;
                }else if(item.quantity > 1){
                     item.quantity --;
                     return new_state;
                }
            }
		}

    case 'REMOVE_ALL_QUANTITY' :{
       const new_state = {...state};
       const item =new_state.cart[action.index];
       new_state.cart.splice(action.index, 1);
       return new_state;
    }

		case 'CLEAR_CART' :{
			return { cart:[]};
		}

    case 'ADD_TO_CART_WHEN_LOGIN': {
       const new_state = {...state};
       const cart = action.cart;

       let isAlreadyExist = false;

        state.cart.map((item)=>{

        if (item.product.id == cart.product.id) {
          item.quantity =  item.quantity + cart.quantity;
          isAlreadyExist = true;
         }

       });

          if (!isAlreadyExist) {
           
            return  {
                   cart: [ 
                       ...state.cart,
                      {
                        product: cart.product,
                        quantity: cart.quantity,
                        createdAt: new Date()
                      }                
                   ]
            }
          }else{
            return new_state;
          }
    }


		default : return state;
		}	
}

export default reducer;