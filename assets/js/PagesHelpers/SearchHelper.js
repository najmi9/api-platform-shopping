import React, { useState, useEffect} from 'react';
import ProductAPI from "../Services/ProductAPI";
import 'nouislider/distribute/nouislider.css';


const SearchHelper = ({handleSearchChange, handleCategoryChange,}) =>{

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
 
 

	const fetchCategories = async ()=>{
		setCategories(await ProductAPI.fetchCategories());
    setLoading(true);
	}
  
useEffect(()=>{
	fetchCategories();
}, [])
 
 return<div style={{ "position":"sticky" }} >      
            <h4>Les produits : </h4>   
          <form className="form-search"  style={{ "margin": 20+ "px" }}>
              <input name="q" className="form-control" 
              placeholder="Chercher une produit" onChange={handleSearchChange} />             
          </form>
          <form>
          <div className="text-left">
          <h4> Les categories : </h4>
           {!loading && (<div className="spinner-border m-5" role="status">
              <span className="sr-only">Loading...</span>
              </div>)
            }

           {loading && (categories.map(c=>(
           <div className="form-group form-check" key={c.id}>
             
             <label className="form-check-label js-categories" htmlFor={c.id}>
                <input type="radio" name="c" className="form-check-input"
                 id={c.id} onChange={()=>handleCategoryChange(c.id)} value={c.title} />
             {c.title}
             </label>
           </div>
           	)))}
           <div className="form-group form-check">
            <label htmlFor="all"> 
           <input type="radio" name="c" onChange={()=>handleCategoryChange(null, true)} id="all" />
            {"  "}
           voir tout les produits
           </label>
           </div>
          </div>
          
          </form>
     
       </div>

}

export default SearchHelper;