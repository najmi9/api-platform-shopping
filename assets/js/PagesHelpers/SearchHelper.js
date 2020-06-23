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
 
 return<>      
           
          <form className="form-search"  style={{ "margin": 20+ "px" }}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                 <span className="input-group-text" id="basic-addon1">
                   <i className="fas fa-search"></i>
                  </span>
              </div>          
              <input name="q" className="form-control" 
              placeholder="Chercher une produit" onChange={handleSearchChange} 
              aria-describedby="basic-addon1" aria-label="search"/>  
            </div>           
          </form>
          <form>
          <div className="text-left mb-4">
          <h6 className="text-muted text-italic bg-light mt-5"> Les categories : </h6>
           {!loading && (<div className="d-flex justify-content-center text-success" 
           role="status" id="spinner">
           <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
              <span className="sr-only">Loading...</span>
           </div>
              </div>)
            }

           {loading && (categories.map(c=>(
           <div className="form-group form-check" key={c.id} id="search-category">
             
             <label className="form-check-label js-categories search-category" htmlFor={c.id}>
                <input type="radio" name="c" className="form-check-input"
                 id={c.id} onChange={()=>handleCategoryChange(c.id)} value={c.title} />
             {c.title}
             </label>
           </div>
           	)))}
           {loading && (<div className="form-group form-check">
                                  <label htmlFor="all"> 
                                 <input type="radio" name="c" onChange={()=>handleCategoryChange(null, true)} id="all" />
                                  {"  "}
                                 voir tout les produits
                                 </label>
                                 </div>)}
          </div>
          
          </form>
     
       </>

}

export default SearchHelper;