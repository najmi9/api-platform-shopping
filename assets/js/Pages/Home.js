import React, { useState, useEffect } from 'react';
import '../Style/home.css';
import ProductAPI from '../Services/ProductAPI';
import Pagination from '../Components/Pagination'
import Product from '../Components/Product';
import SearchHelper from '../PagesHelpers/SearchHelper';
import Error from '../Components/Error';

const Home = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState([]);
  const [error, setError] = useState(false);
  const MemoizedProduct = React.memo(Product);
  const handlePageChange = page => setCurrentPage(page);
  const itemsPerPage = 5;

  const handleCategoryChange = (value, cancel = false) => {
    var prods = [];
    prods.push(...data.filter(product => product.category.id == value))
    setResults(prods);
    if (cancel) {
      setResults([]);
    }
  }

  const filteredItems = (data, value = "") => data.filter(
    c =>
      c.title.toLowerCase().includes(value.toLowerCase()) ||
      c.description.toLowerCase().includes(value.toLowerCase()) ||
      c.category.title.toLowerCase().includes(value.toLowerCase())
  );

  const handleSearchChange = ({ currentTarget }) => {
    setSearched(filteredItems(data, currentTarget.value));
  }

  const fetchProducts = async () => {
    try {
      setData(await ProductAPI.fetchProducts());
      setLoading(false);

    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }
  const style = {
    "width": 3+ "rem",
    "height": 3 + "rem",
    "margin": 80 + "px",
    "padding": 20 + "px"
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderMe = (data) => {
    return (
      <>
        {Pagination.getData(
          data,
          currentPage,
          itemsPerPage
        ).map(product => (<MemoizedProduct product={product} key={product.id} />))}

        {itemsPerPage < data.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={data.length}
            onPageChanged={handlePageChange} />
        )}
      </>
    );
  }

  return (
    <>
      {
        loading && (<div className="d-flex justify-content-center text-success"
          role="status" id="spinner" id="main-site">
          <div className="spinner-border" role="status" style={style} >
            <span className="sr-only">Loading...</span>
          </div>
        </div>)
      }

      {error && (<Error id="main-site" />)}

      {!error && (<section>

        {!loading && (<div className="search-component">
          <SearchHelper handleSearchChange={handleSearchChange}
            handleCategoryChange={handleCategoryChange} data={data} />
        </div>)}
        {searched.length > 0 && renderMe(searched)}
        {results.length > 0 && renderMe(results)}
        {!loading && results.length === 0 && searched.length === 0 && renderMe(data)}

      </section>)}
    </>)

}
export default Home;
