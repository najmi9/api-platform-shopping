import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductAPI from '../Services/ProductAPI';
import TableLoader from '../Components/Loaders/TableLoader';
import Comments from '../Components/Comments';
import AuthContext from '../contexts/AuthContext';
import CartAPI from '../Services/CartAPI';
import '../Style/Product.css'
import { connect } from 'react-redux';

const BuyProduct = ({ match, history, cartItems }) =>{
  const { productId } = match.params;
  const { setPrice, setCarts, setProduct } = useContext(AuthContext);
  const [product, setProducte] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
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
    if ((cartItems.length ===0) || (cartItems.length !==0 && !cartItems.filter(c=>c.product.id === id)[0])) {
        const res = await CartAPI.createCart(id, quantity);
        const cart = await res.data;
        setPrice(parseInt(product.price)*quantity);
        setCarts([cart]);
        setProduct(true);
    }else {
        const user = await UserInfo.parseJwt();
        if (user) {
            await CartAPI.updateCartsOfUser(cartItems);
            const cs = await CartAPI.fetchCartsOfUser(user.userId);
            localStorage.setItem('oldCarts', JSON.stringify(cs));
            const cart = cs.filetr(c=>c.product.id === id)[0];
            if (cart) {
               setPrice(parseInt(cart.product.price)*quantity);
               setCarts([cart]);
               setProduct(true); 
            }
        }
      }



      const res = await CartAPI.createCart(id, quantity);
        const cart = await res.data;
        setPrice(parseInt(product.price)*quantity);
        setCarts([cart]);
        setProduct(true);
   }

useEffect(()=>{
  fetchProduct(productId);
}, [productId])
  
     return  <div className="product">
   
    { !loading && (<div className="loader text-center" style={{"margin":"auto"}}><TableLoader /></div>) }
    { loading && (
    <div className="product-content">
      <div className="product-body">
        <div className="product-img text-center">
          <img  src="https://picsum.photos/id/55/200/300" alt="produit" 
            className="product-img"
          />
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
        <strong> La quantitié disponible : </strong> { product.availableQuantity || 1 }
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
          <Link to="/" className="btn btn-danger mr-5">
          <i className="fas fa-arrow-left"></i> Retour 
          </Link> 
          
         <Link className="btn btn-outline-warning"
          onClick={()=>handleBuyProduct(productId)} to="/pay-for-product" >
            <i className="fas fa-arrow-right"></i> pay now
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

const mapStateToProps = (state) =>{
  return {
    cartItems: state.cart
  }
}

export default connect(mapStateToProps)(BuyProduct);
