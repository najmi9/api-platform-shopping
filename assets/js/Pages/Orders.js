import React, { useState, useEffect } from 'react';
import UserInfo from '../Components/UserInfo';
import OrderAPI from '../Services/OrderAPI';
import { toast } from 'react-toastify';
import moment from 'moment';

const Orders = () =>{
   
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const fetchOrders = async () =>{
   	const user = UserInfo.parseJwt();
	if (user) {
       try {
       	setOrders(await OrderAPI.fetchOrdersForThisUser(user.userId));
       	setLoading(true);
       } catch(e) {
        setError(true)
        toast.error("une error est servenue essayer plustard !")
       	console.log(e);
       }
	}
   }
useEffect(()=>{
	fetchOrders();
}, [])

	return (
       <div>
        <h5 className="text-center"> Mes Orderes : </h5>
        {error || orders.length ===0  && (<h1 className="bg-light text-info text-center">
          Il n'a pas des orders encore !
        </h1>)}
        <div className="orders">
        {loading && (orders.map(o=>(
          <div className="card" key={o.id} >
             <div className="card-title">
               <h5> l'état de paiment :

                { o.paid?(<h2 className="text-primary"> 
                     <i className="fas fa-checked"></i> Payé</h2>):
                     (<h2 className="text-danger"> 
                     <i className="fas fa-times"></i>Non Payé</h2>)
                } 
               <small className="text-muted text-italic" > {o.createdAt } </small> </h5>
               <p className="text-muted text-italic" >ID de Paiement :<strong> {o.paymentId} </strong></p>
               <p className="bg-light" ><i className="fas fa-truck"></i> Adress de livrasion : 
                 <strong>{o.country}-{o.city}-{o.linel}-{o.zip} </strong></p>
               <p> Nom de Récipaint : <strong className="text-success" >{o.name}</strong>  </p>
             </div>
             <div className="card-body">
               <h4> Les produits </h4>
               { o.carts.map(cart=>(
                  <div className="prod-order" key={cart.id}>
                    
                    <img src={cart.product.picture ?(cart.product.picture.contentUrl):(null)} alt={cart.product.title} height = '100px' width="100px" style={{ "flaot":"left" }} /> 
                    
                    <h5> 
                      le prix : 
                      <span className="badge badge-primay">
                        {cart.product.price} Dhs
                      </span> 
                    </h5> 
                    <p className="text-center border" > {cart.product.title} </p>
                  </div>
                ))
               }
             </div>
          </div>              
        	)))
        }
        </div>
       </div>
		)
}

export default Orders;