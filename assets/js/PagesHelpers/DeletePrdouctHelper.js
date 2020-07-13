 import React, { useState, useEffect, useContext} from 'react';
 import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
  
  const { hasRoleAdmin } =useContext(AuthContext);
 import AuthContext from '../contexts/AuthContext';
 
 const handleDelete = async (id) =>{        
       window.confirm('Vous voulez vraiment suprimé ce produit ?');
       await ProductAPI.deleteProduct(id);
       setProducts(products.filter(prod=> prod.id !== id ));
       toast.success('Votre produit à été bien suprimé !')     
    }
              { hasRoleAdmin  &&  (
            <button className="btn btn-danger btn-pro" 
            onClick={()=>handleDelete(product.id)}> 
              <i className="fas fa-trash"></i> 
            </button> )
          }

          { hasRoleAdmin  &&  ( 
            <Link className="btn btn-info btn-pro"
            to={"/product/"+product.id}>
              <i className="fas fa-edit"></i> 
            </Link>)
          }