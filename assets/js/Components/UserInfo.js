import LikeAPI from "../Services/LikeAPI";
import jwtDecode from "jwt-decode";

function parseJwt () {
   const token = localStorage.getItem("authToken");
   if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
          var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
    }
  }

  
};



    function isHasRoleAdmin (){
        const userToken = localStorage.getItem('authToken');
        let exist = false;
        if (userToken) {
            const userRoles = parseJwt().roles;
            userRoles.forEach( function(role) {
                if (role == "ROLE_ADMIN") {
                exist = true
                    }
                });
            }
        if (exist) {
            return true;
        }else{
            return false
        }
    } 
    const isLikedByUser = async (productId) =>{
        let isLiked = false;

        if (parseJwt()) {
            const userId = parseJwt().userId;
            const likes = await LikeAPI.getLikesForUser(userId);
            if (likes) {
            likes.map(like=>{
            	const pro = like.product;
            	const idOfPro = pro.substr(14);
                 if (+idOfPro == productId) {
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
	isHasRoleAdmin
}