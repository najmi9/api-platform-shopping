import React, { useContext, useState, useEffect } from 'react';
import LikeAPI from '../Services/LikeAPI';
import AuthContext from '../contexts/AuthContext';
import { API_URL } from'../Services/Config';
import { toast } from 'react-toastify';
import UserInfo from '../Components/UserInfo';
import ProductAPI from '../Services/ProductAPI';


const LoveIcon = ({ item }) => {
  const { isAuthenticated } =useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState(item)

   const handleLove = async (id) =>{
   if (isAuthenticated) {
          if(isLiked){
          setIsLiked(false)       
           try {
           await LikeAPI.deleteLike(id);   
           setProduct(await ProductAPI.fetchProduct(product.id));                        
           } catch(e) {
             console.log(e);
           }
       }else{
         setIsLiked(true)
           try {
              await LikeAPI.createLike({
          "product":API_URL+"/products/"+id
           });
          setProduct(await ProductAPI.fetchProduct(product.id));
           } catch(e) {
            toast.error("Un problème de connexion, se connecter à nouveau !")
             console.log(e);
           }
       } 
       
     }else{
      toast.info("Vous pouvez pas aimer si vous êtes déconnecté !")
     }
    }
useEffect(()=>{
if (isAuthenticated) {
  UserInfo.isLikedByUser(product.id).then(response=>{
    setIsLiked(response)
  });
}
  

}, [product.id])

  return <>
     <span className="" id="js-likes">
            { product.likes.length }
          </span> 

  <button className="btn" id="btn-js-love" 
          onClick={()=>handleLove(product.id)}>
            <i 
            className={ isLiked 
            ? ("fas fa-heart btn-love") : ("far fa-heart")} 
            id={"js-love-"+product.id}>
            </i>
          </button>
          </>
}
   
    export default LoveIcon;