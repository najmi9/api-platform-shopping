 import React, { useState } from 'react';
 import { connect } from "react-redux";
 import addToCart from '../redux/actions/actions';
 import  LoveIcon  from '../PagesHelpers/handleLoveIcon';
 import { Link } from 'react-router-dom';
 
 const Product = ({ product, addToCart }) =>{
  const [item, setItem] = useState(product);

  return  <div className="card" key={item.id}>
  
      <img   src={"/media/"+item.picture.filePath} 
      className="card-img-top prod-pic" id={"prod-pic-"+item.id}/>

      <div className="card-body">
        <h5 className="card-title price text-primary bg-light" id="js-price"> 
          {item.price.toLocaleString('fr')} Dhs 
        </h5> 
       
        <p className="card-title">
          <Link to={"/product-"+item.id} 
          className="text-center prod-title">
            {item.title}
          </Link>
        </p>
         <h6> <span> promotion :  {item.promo}</span> </h6>
        <p className="card-text text-center">
          <LoveIcon item={item} />
          <button className="btn btn-warning btn-pro btn-sm" 
          onClick={()=>addToCart(item)}>        
            <i className="fas fa-cart-plus">  </i>
          </button>

          <Link to={"/product-"+item.id}
          className="btn btn-success btn-sm">
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





           
		     
		        
		         

  
		   
	

		  

		
      

       
		        
      
		        
		      