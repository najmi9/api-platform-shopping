import axios from 'axios';
import UserInfo  from '../Components/UserInfo';
import Cache from "./Cache";
import {API_URL} from './Config';


const LIKE_URL = API_URL + "/likes";

const deleteLike = async (product) =>{
	const user = await UserInfo.parseJwt();
	if (user.userId) {
    const likeId = product.likes.filter(like=>like.user.id === user.userId)[0].id;
    const res = await axios.delete(LIKE_URL+"/"+likeId);
    return await res.data;
	}

}

const createLike = async id =>{
  const response = axios.post(LIKE_URL, { "product":API_URL+"/products/"+id});
 return await response.data;
}
 
const getLikesForUser = async id =>{
   const cachedLikes = await Cache.get("likesForUser");
   if (cachedLikes) {return cachedLikes;}

  const res = await axios.get(LIKE_URL+"?user="+id);
  Cache.set("likesForUser", await res.data["hydra:member"]);
  return await res.data["hydra:member"];
}

export default {
	getLikesForUser,
	deleteLike,
	createLike
}