import React, { useEffect, useState } from 'react';
import ProductAPI from '../Services/ProductAPI';
import FormContentLoader from '../Components/Loaders/FormContentLoader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Product = ({ match, history }) =>{
  const [products, setProducts] = useState([]);
const { id="new" } = match.params;
const [product, setProduct] = useState({
	'title':"",
	'description':"",
	'price':"0 Dh",
	'picture':'',
	
})
   const [loading, setLoading] = useState(false);
   const [editing, setEditing] = useState(false);
   const [categories, setCategories] = useState([]);
   const [errors, setErrors] = useState(null);
 
 const fetchProduct = async id =>{
     try {       
      setProduct(await ProductAPI.fetchProduct(id));
      setLoading(false);
    } catch (error) {
      toast.error("Le produit n'a pas pu être chargé");
      history.replace("/");
    }
 }

  const  fetchProducts = async () =>{
   setLoading(false);
   setProducts(await ProductAPI.fetchProducts());
   }



 useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      setEditing(true);
      fetchProduct(id);
    }
  }, [id]);

   const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setProduct({ ...product, [name]: value });
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        
        setProduct(await ProductAPI.updateProduct(id, product));
        toast.success("Le client a bien été modifié");
        history.replace("/product/buy/"+id);
  
      } else {
        setProduct(await ProductAPI.createProduct(product));
        toast.success("Le produit a bien été créé");
        history.replace("/product/buy/"+id);

      }
    } catch ({ response }) {
      if (response) {
       console.log(response.data);
      }
        toast.error("Des erreurs dans votre formulaire !");     
    }
  };

	return  <>
      {(!editing && <h1>Création d'un Produit</h1>) || (
        <h1>Modification du produit</h1>
      )}

      {loading && <FormContentLoader />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
               className="form-control"
            name="title"
            placeholder="titre de produit"
            value={product.title}
            onChange={handleChange}  
            />
               <input
               className="form-control"
            type="text"
            name="description"
            placeholder="Description de produit"
            value={product.description}
            onChange={handleChange}
            />
               <input
               className="form-control"
            type="text"
            name="price"
            placeholder="le prix de produit ..."
            value={product.price}
            onChange={handleChange}
            />
               <input
               className="form-control"
            type="text"
            name="picture"
            placeholder="l'image  de produit"
            value={product.picture}
            onChange={handleChange}
            />
              
             <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/products" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>  
        </form>
     )}
     </>
}
export default Product;