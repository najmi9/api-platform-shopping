import React, { useState, useEffect, useContext } from 'react';
import { toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import ProductAPI from '../Services/ProductAPI';
import TableLoader from '../Components/Loaders/TableLoader';
import Comments from '../Components/Comments';
import AuthContext from '../contexts/AuthContext';
import Paypal from './Paypal';
import CartAPI from '../Services/CartAPI';
import { API_URL } from '../Services/Config';
import '../Style/Product.css'

const BuyProduct = ({ match, history }) =>{
  const { productId } = match.params;
  const { isAuthenticated, setPrice, setCarts, setProduct } = useContext(AuthContext);
  const [product, setProducte] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const id = Math.ceil((Math.random()*30));
  const handleAddQuantity = () =>{
    setQuantity(quantity+1);
  }

  const handleRetrieveQuantity = () =>{
    if (quantity>1) {
      setQuantity(quantity-1);
    }
  }

   const fetchProduct = async (productId) =>{
    setProducte(await ProductAPI.fetchProduct(productId));
    setLoading(true);
   }

   const handleBuyProduct = async (id) =>{
      const res = await CartAPI.createCart({
        'product':API_URL+"/products/"+id,
        'quantity':quantity
      })
        const cart = await res.data;
        setPrice(parseInt(product.price)*quantity);
        setCarts([cart]);
        setProduct(true);
   }

useEffect(()=>{
  fetchProduct(productId);
}, [productId])
  
     return  <div className="product">

    { !loading && (<div className="loader text-center"><TableLoader /></div>) }
    { loading && (
    <div className="product-content">
      <div className="product-body">
        <div className="product-img ">
          <img  src={"https://picsum.photos/id/"+id+"/600/300"} />
        </div>
        <div className="right-side" >
        <h6> { product.title } </h6>
    
        <p className="bg-secondary text-light">
          {product.description}
        </p>
        <h4>
          Prix : 
          <span className="badge badge-primary">
            {product.price} Dh
          </span>
        </h4>
        <p>
        <strong> La quantitié disponible : </strong> { product.available_quantity }
        </p>
        <p>
          <button className="btn btn-sm btn-q" onClick={handleAddQuantity} >+</button>
          <button className="btn btn-sm btn-q"> {quantity} </button>
          <button className="btn btn-sm btn-q" onClick={handleRetrieveQuantity}>-</button>
          <button className="btn"> Total : {quantity * parseInt(product.price)} Dhs</button>         
        </p>
        <p>
        <i className="fas fa-truck"></i> : free shipping in Morrocco.
        </p>
        <p> 
          <Link to="/" className="btn btn-danger mr-5">Retour à la liste des produits </Link> 
          
         <Link className="btn btn-warning"
          onClick={()=>handleBuyProduct(productId)} to="/pay-for-product" >
            <i className="fas fa-dollar"></i> Finaliser le paiement
         </Link>
        </p>
      </div>
      </div>
      <div className="comments">
        <Comments commentsPart={product.comments} productId={productId} />   
      </div>

      </div>)
    }
  </div>
}

export default BuyProduct;