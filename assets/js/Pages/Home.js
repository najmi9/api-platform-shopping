import React, { useState, useEffect} from 'react';
import '../Style/home.css';
import ProductAPI from '../Services/ProductAPI';
import TableLoader from '../Components/Loaders/TableLoader';
import Pagination from '../Components/Pagination'
import Product from '../Components/Product';
import SearchHelper from '../PagesHelpers/SearchHelper';

const Home = () =>{
  const [data, setData] = useState([]);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState([]);


  const handlePageChange = page => setCurrentPage(page);
  const itemsPerPage = 5;
 
   

   const handleCategoryChange = (value, cancel=false) =>{
         var prods = [];  
         prods.push(...data.filter(product=>product.category.id == value)) 
         setResults(prods); 
        if (cancel) {
        setResults([]);   
        }   
        console.log(results)     
  }
  const filteredItems = (data, value="") => data.filter(
       c =>
       c.title.toLowerCase().includes(value.toLowerCase()) ||
       c.description.toLowerCase().includes(value.toLowerCase()) ||
       c.category.title.toLowerCase().includes(value.toLowerCase())
  );


  const handleSearchChange = ({currentTarget}) =>{
       setSearched(filteredItems(data, currentTarget.value));       
  }
   
  const fetchProducts = async () =>{
       setData(await ProductAPI.fetchProducts());
       setLoading(false);
  }

  

  useEffect(()=>{
   	   fetchProducts();
  }, []);
  
  const renderMe = (data) =>{
    return (
      <>
      { Pagination.getData(
         data,
         currentPage,
         itemsPerPage
         ).map(product=>(<Product product={product} key={product.id} /> )) } 
      
       {itemsPerPage < data.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={data.length}
          onPageChanged={handlePageChange} />
      )}
       </> );
  }

	return  (
  <section> 
        <div className="search-component">
            <SearchHelper handleSearchChange={handleSearchChange}
            handleCategoryChange={handleCategoryChange} data={data} />
        </div>
  
        { loading && (<div className="text-center loader-child "><TableLoader /></div>) }
        
        { searched.length>0 && renderMe(searched) }
        { results.length>0  && renderMe(results) }
        {!loading && results.length===0 && searched.length === 0&& renderMe(data) }
      </section>)
    
}
export default Home;
