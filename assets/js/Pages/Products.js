import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const Products = () =>{
   const [customers, setCustomers] = useState([]);
   const [loading, setLoading ] = useState(false);
 
    const getData= async ()=>{
      try{
    const url = "http://localhost:8000/api/products";
    const response = await axios.get(url);
    setCustomers(response.data['hydra:member']);
    setLoading(true);
    toast.success("Les produits sont hcargés avec success");
  }catch(error){
    console.log(error)
    toast.error('Impossible de charger les clients')
  }
  }

  useEffect(()=>{
	  getData();
  },[])

  const handleDelete = async (id)=>{
    const url = "http://localhost:8000/api/products/"+id;
    setCustomers(customers.filter(customer => customer.id !== id));
    try{
      await axios.delete(url);
      toast.success('Le Produit à été supprimer avec success');
    }catch(error){
      console.log(error);
      toast.error('Impossible se supprimer le produit');
    }
  }
  const handleEdit = (id) =>{
    console.log(id)
  }
  


	return  <div className="bg-light p-4">
         <table className="table">
           <thead>
              <tr>
                <th> ID </th>
                <th> Price </th>
                <th> Title </th>
                <th> Category </th>
                <th></th>
              </tr>
           </thead>
             { loading && (
           <tbody>
         {
             customers.map((customer)=>(<tr key={customer.id}>
                           <td> { customer.id }</td>
                           <td> { customer.price.toLocaleString() } Dh</td>
                           <td> { customer.title }</td>
                           <td> { customer.category.title }</td>
                           <td> 
                             <button onClick={() => handleDelete(customer.id)} className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button>
                             <button onClick={() => handleEdit(customer.id)} className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                           </td>
                          </tr>
                          ))
         }
           </tbody>
              ) 
             }
             </table>    
        
         
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />     
	</div>
}
export default Products;