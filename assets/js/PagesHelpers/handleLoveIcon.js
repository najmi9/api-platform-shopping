import React, { useContext, useState, useEffect, useCallback } from 'react';
import LikeAPI from '../Services/LikeAPI';
import AuthAPI from '../Services/AuthAPI';
import { toast } from 'react-toastify';
import UserInfo from '../Components/UserInfo';
import ProductAPI from '../Services/ProductAPI';


const LoveIcon = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState(item)
  const [user, setUser] = useState({ });
   

   const handleLove = async (product) =>{
        const isLogged =  AuthAPI.isAuthenticated();
        if (!isLogged) {
          toast.info("Vous pouvez pas aimer si vous êtes déconnecté !");
          return;
        }
        if(isLiked){
            setIsLiked(false);                 
            await LikeAPI.deleteLike(product);   
            setProduct(await ProductAPI.fetchProduct(product.id));    
        }else{
            setIsLiked(true);
            await LikeAPI.createLike(product.id);
            setProduct(await ProductAPI.fetchProduct(product.id));
       }       
    }
    
    const memorizedLikes = useCallback(async()=>{
          let user = await UserInfo.parseJwt();
          if (!user) {
           return  isLiked;
         }
         return await  LikeAPI.getLikesForUser(user.userId);
    }, [user.userId]);

   const isLikedByUser = async (productId) =>{
        let isLiked = false;
        const likes = await memorizedLikes();       
        if (likes) {
            likes.map(like=>{
                 if (like.product.id == productId) {
                    isLiked = true;
                }
            });

        }
        return  isLiked;
    }

useEffect(()=>{

  /**
   *  AuthAPI.isAuthenticated().then(response=>{
   *     if(!response){
   *      return;
   *     }
   *     UserInfo.isLikedByUser(product.id).then(response=>{
   *       setIsLiked(response);
   *     });
   *  })
   */
     if (AuthAPI.isAuthenticated()) {
        UserInfo.parseJwt().then(response=>setUser(response))
        
         UserInfo.isLikedByUser(product.id).then(response=>{
        setIsLiked(response)});
     }
   

}, [product.id])

  return <>
     <span className="" id="js-likes">
            { product.likes.length }
          </span> 

  <button className="btn" id="btn-js-love" 
          onClick={()=>handleLove(product)}>
            <i 
            className={ isLiked 
            ? ("fas fa-heart btn-love") : ("far fa-heart")} 
            id={"js-love-"+product.id}>
            </i>
          </button>
          </>
}
   
    export default LoveIcon;