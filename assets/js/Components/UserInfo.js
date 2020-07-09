import { API_URL} from "../Services/Config";
import LikeAPI from "../Services/LikeAPI";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { toast } from 'react-toastify';

const parseJwt = async () => {
   let token = localStorage.getItem("authToken");
   if (token) {
       if (isTokenExpired(token)) {
         await refreshToken();
         const token = localStorage.getItem("authToken");
       }
      if (token) {   
        return jwtDecode(token);
      }
   }
   return null;  
};

 const isTokenExpired = (token) =>{
    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
         return false;
    }

    return true;
 } 

 const refreshToken = async () =>{
    const refresh_token =  localStorage.getItem("authRefreshToken");
    if (!refresh_token) {
      localStorage.setItem("authToken", '');
      return;
    }
    try {
        const response = await axios.post(API_URL+"/token/refresh", {
          "refresh_token": refresh_token
        });
        localStorage.setItem("authToken", await response.data.token);
    } catch(e) {
        localStorage.setItem("authToken", '');
        toast.error("un erreur est produit lors d'actualisation de token !")
        console.log(e);
    }
 }


    const isLikedByUser = async (productId) =>{

        let isLiked = false;

        if (await parseJwt()) {
            const user = await parseJwt();
            const likes = await LikeAPI.getLikesForUser(user.userId);
            if (likes) {
            likes.map(like=>{
                 if (like.product.id == productId) {
                    isLiked = true;
                }
        });

        }
        }
        return  isLiked;

    }
    
export default {
    isLikedByUser,
	parseJwt,
    isTokenExpired,
    refreshToken
}