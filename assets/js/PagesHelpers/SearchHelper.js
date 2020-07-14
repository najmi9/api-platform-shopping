import React, { useState, useEffect} from 'react';
import ProductAPI from "../Services/ProductAPI";
import Carousel from '../Components/Carousel';

const SearchHelper = ({handleSearchChange, handleCategoryChange,}) =>{

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

	const fetchCategories = async ()=>{
    try {
      setCategories(await ProductAPI.fetchCategories());
      setLoading(true);
    } catch(e) {
      setLoading(true)
      console.log(e);
    }
		
	}
  
useEffect(()=>{
	fetchCategories();
}, [])
 
 return<>      
           
          <form className="form-search m-2">
            
            <div className="input-group">
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

          <div id="header-view">
          <Carousel />
          
          <form id="categories">  
  
           { !loading && (
               <div className="d-flex justify-content-center text-warning text-center m-5"
               role="status" id="spinner">
                <div className="spinner-border" role="status" style={{
                   "width": 4+ "rem",
                    "height": 4 + "rem",
                    "padding": 40 + "px",
                    "margin":"auto"}} >
                  <span className="sr-only">Loading...</span>
                  </div>
               </div>
             )
           }

           {loading && (categories.map(c=>(
              <label id="search-category"  key={c.id}  htmlFor={c.id}>
                <input type="radio" name="c" 
                 id={c.id} onChange={()=>handleCategoryChange(c.id)} value={c.title} />
              {c.title}
              </label>)))
            }          
          </form>
         </div>
       </>

}

export default SearchHelper;