import React, {useContext} from 'react';
import OrderAPI from '../Services/OrderAPI';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import {toast} from 'react-toastify'; 
import { API_URL } from '../Services/Config';
import AuthContext from "../contexts/AuthContext";

 
 const PayNow = ()=>{

 const { carts, price, product } = useContext(AuthContext);
 
        const orderHelper = async (tableOfCarts, payment) =>{
            try {
              await OrderAPI.createOrder({
                "payer_id":payment.payerID,
                "payment_id"    :payment.paymentID,
                "token"     :payment.paymentToken,
                "email"      :payment.email,
                "paid" :payment.paid,
                "name" :payment.address.recipient_name,
                "country":payment.address.country_code,
                "city"     :payment.address.city,
                "linel"    :payment.address.line1,
                "zip"   :payment.address.postal_code,
                "state"  :payment.address.state,
                "carts": tableOfCarts.map(c=>(API_URL+"/carts/"+c.id))
              });
            toast.success('votre paiement à été bien passer !');
            } catch(e) {
                toast.error("votre paiment est bien passer, mais il y a une erreur de notre côte, on va l evérifier plustard")
                console.log(e);
            }
        }
        
        const createOrder = async (payment) =>{
        const allCarts = JSON.parse(localStorage.getItem("oldCarts"));
        var selectedCarts = [];
        carts.forEach(element=>{
            const x = allCarts.filter(c=>c.product.id===element.product.id);
            if (x[0]) {
            selectedCarts.push(x[0]);
            }
        });
          orderHelper(selectedCarts, payment);
       }

        const ID = "AWPUlrMIpJfZeL-DlTtiisy4JdIn8EME5yU8IoAdWb2tB7DcwzqUPC_jUTLjN0flRkqR3kS8KWvTI_7v";
        const SECRET = "EEMEC_w4pXuJWI0B8wKgVaqVyek03YG5ZbCBsD-Dsc5xCYEskiwrwBWjr5ap5fMQtOsRGubc6S77jwTP"
     
        const onSuccess =async (payment) => { 
        if (product) {
             orderHelper(carts, payment)
        }else {
         createOrder(payment); 
        }         
        }
 
        const onCancel = (data) => {
            const orderCreater = async data =>{
                 await OrderAPI.canceledOrder({
                "billingID": data.billingID,
                "intent": data.intent,
                "paymentID": data.paymentID,
                "paymentToken":data.paymentToken
             });
            }
            orderCreater(data);
           
        }
 
        const onError = (err) => {
             toast.error("une erreur est servenue réyasser plustard ! ")
            console.log("Error!", err);
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = price; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
 
        const client = {
            sandbox: ID,
            production: ID,
        }

        return (<div style={{"marginTop": 100+"px"}}>
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        </div>
        );
    }
    export default PayNow;