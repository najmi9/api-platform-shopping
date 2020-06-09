import React, { useState, useEffect, useContext } from 'react';
import { toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import ProductAPI from '../Services/ProductAPI';
import TableLoader from '../Components/Loaders/TableLoader';
import Comments from '../Components/Comments';
import AuthContext from '../contexts/AuthContext';
import Paypal from './Paypal';

const BuyProduct = ({ match, history }) =>{
  const { productId } = match.params;
  const { isAuthenticated } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);



   const fetchProduct = async (productId) =>{
    setProduct(await ProductAPI.fetchProduct(productId));
    setLoading(true);
   }

useEffect(()=>{
  fetchProduct(productId);
}, [productId])
  
     return  <div className="container">
    { !loading && (<TableLoader />) }
    { loading && (
      <div className="p-5 text-center">
        <div className="text-center p-4">
          <img src={ product.picture } />
        </div>
        <h1>Prix : <span className="badge badge-primary">
                       {product.price} Dh
                   </span>
        </h1>
        <h4> { product.title } </h4>
        <div>
          <p className="bg-secondary text-light">
            {product.description}
          </p>
        </div>
        <p> 
          <Link to="/" className="btn btn-danger mr-5">Retour à la liste des produits </Link> 
          
         <Paypal  price={parseInt(product.price)} productId={productId} />
        </p>

        <div className="comments">
        <Comments commentsPart={product.comments} productId={productId} />   
        </div>

      </div>)
    }
  </div>
}

export default BuyProduct;