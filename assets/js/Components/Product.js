 import React, { useState } from 'react';
 import { connect } from "react-redux";
 import addToCart from '../redux/actions/actions';
 import  LoveIcon  from '../PagesHelpers/handleLoveIcon';
 import {handleImage} from '../PagesHelpers/HomeHelper';
 import { Link } from 'react-router-dom';

 const Product = ({ product, addToCart }) =>{
  const [item, setItem] = useState(product);
  handleImage(item.id);

  return  <div className="card" key={item.id}>
      <img 

      src="http://lorempixel.com/400/200/business"

      onClick={()=>handleImage(item.id)}
      className="card-img-top prod-pic" id={"prod-pic-"+item.id}/>
      <div className="card-body">
        <h3 className="card-title price" id="js-price"> 
          {item.price.toLocaleString('fr')} Dh 
          <p className="ml-0 text-primary bg-light"> 
           <span> Promotion :  {item.promo}</span>
          </p>
        </h3> 
        <h5 className="card-title">
          <Link to={"/product/buy/"+item.id} 
          className="text-center prod-title">
            {item.title}
          </Link>
        </h5>
        <p className="card-text text-center">
         
          
          <LoveIcon item={item} />

          <button className="btn btn-warning btn-pro" 
          onClick={()=>addToCart(item)}>        
            <i className="fas fa-cart-plus">  </i>
          </button>

          <Link to={"/product/buy/"+item.id}
          className="btn btn-success">
            <i className="fas fa-cart-arrow-down"></i>
          </Link>
        </p>
        <p className="text-muted text-italic text-center">
        #{item.category.title}
        </p>
      </div>
    </div>

  }

  const mapDipatchToProps = (dispatch) =>{
  return {
    addToCart: (productInfo)=>dispatch(addToCart(productInfo))
  }
}
export default connect(null,mapDipatchToProps)(Product);





           
		     
		        
		         

  
		   
	

		  

		
      

       
		        
      
		        
		      