import React, { useState, useEffect } from 'react';
import '../Style/home.css';
import '../Style/cards.css';
import ProductAPI from '../Services/ProductAPI';
import Pagination from '../Components/Pagination'
import Product from '../Components/Product';
import SearchHelper from '../PagesHelpers/SearchHelper';
import Error from '../Components/Error';
import Loader from '../Components/Loaders/Loader';
const Home = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState([]);
  const [error, setError] = useState(false);
  const MemoizedProduct = React.memo(Product);
  const handlePageChange = page => setCurrentPage(page);
  const itemsPerPage = 6;

  const handleCategoryChange = (value) => {
    var prods = [];
    prods.push(...data.filter(product => product.category.id == value))
    setResults(prods);
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
    <div>
      {loading && (<div className="loader"><Loader /></div>)}

      {error && (<Error id="main-site" />)}

      {!error && !loading && (<div className="search-component">
          <SearchHelper handleSearchChange={handleSearchChange}
            handleCategoryChange={handleCategoryChange} data={data} />
        </div>)
      }

      {!error && (<section className="main">
        {searched.length > 0 && renderMe(searched)}
        {results.length > 0 && renderMe(results)}
        {!loading && results.length === 0 && searched.length === 0 && renderMe(data)}
      </section>)}
    </div>)

}
export default Home;
