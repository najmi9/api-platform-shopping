import React, { useState, useEffect} from 'react';
import ProductAPI from "../Services/ProductAPI";
import Carousel from '../Components/Carousel';
import Loader from '../Components/Loaders/Loader';

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
 
 return(<>          
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
                    <div className="text-center">
                       <Loader />
                    </div>)
                  }
                    <div id="search-category"   >
                          <input type="radio" name="c" 
                          />
                        Les Catégories : 
                  </div>
                  <div id="search-category"   >
                          <input type="radio" name="c" 
                          />
                        Musique et Vidéo
                  </div>
                  { loading && (categories.map(c=>(
                      <div id="search-category"  key={c.id}>
                          <input type="radio" name="c" 
                          id={c.id} onChange={()=>handleCategoryChange(c.id)} value={c.title} />
                          {c.title}
                      </div>)))
                  }          
              </form>
              <div className="anounce text-center">
                 <img src="https://picsum.photos/id/99/200/300" width="100%" height="245px" />
              </div>
          </div>
       </>);

}

export default SearchHelper;