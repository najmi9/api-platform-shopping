import React, { useState, useEffect, useContext } from 'react';
import UserInfo from '../Components/UserInfo';
import OrderAPI from '../Services/OrderAPI';
import { toast } from 'react-toastify';
import moment from 'moment';

const Orders = () =>{
   
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);

   const fetchOrders = async () =>{
   	const user = UserInfo.parseJwt();
	if (user) {
       try {
       	setOrders(await OrderAPI.fetchOrdersForThisUser(user.userId));
       	setLoading(true);
       } catch(e) {
        toast.error("une error est servenue réysser plustard !")
       	console.log(e);
       }
	}
   }
useEffect(()=>{
	fetchOrders();
}, [])

	return (
       <div id="component">
       {console.log(orders)}
        <h1> Mes Orderes : </h1>
        {loading && (orders.map(o=>(
           <div className="card" key={o.id} >
             <div className="card-title">
               <h1> l'état de paiment : {o.paid?(<h1 className="text-primary"> Payé</h1>):(<h1>Non Payé</h1>)} 
               <small> { o.createdAt} </small> </h1>
               <h5>ID de Paiement : {o.paymentId} </h5>
               <h6><i className="fas fa-truck"></i> Adress de livrasion : {o.country}-{o.city}-{o.linel}-{o.zip} <i className="fas fa-truck-container"></i> </h6>
               <h4> Nom de Récipaint : <strong>{o.name}</strong> qui achter le produit. </h4>
               <h4> Nom de l'utilisateur : <strong>{o.user.username} </strong> lièe à l'order. </h4>
             </div>
             <div className="card-body">
              <div> <img src={o.product.picture} width="200px" height="128px"
               /> </div>
              <h5> le prix :{o.product.price} Dhs</h5> 
              <p> {o.product.title} </p>
             </div>
          </div>              
        	)))
        }
       </div>
		)
}

export default Orders;