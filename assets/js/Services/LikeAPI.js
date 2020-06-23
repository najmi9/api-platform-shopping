import axios from 'axios';
import UserInfo  from '../Components/UserInfo';
import Cache from "./Cache";
import {API_URL} from './Config';


const LIKE_URL = API_URL + "/likes";

const deleteLike = async (productId) =>{
	const userId = UserInfo.parseJwt(localStorage.getItem("authToken")).userId;
	if (userId) {
   const response = await axios.get(LIKE_URL+"?product="+productId+"&user="+userId);
	const likeId = await response.data["hydra:member"][0].id;
    const res = await axios.delete(LIKE_URL+"/"+likeId);
    return await res.data;
	}

}

const createLike = async like =>{
  const response = axios.post(LIKE_URL, like);
 return await response.data;
}

const getLikesForUser = async id =>{

  const cachedLikes = await Cache.get("likes");
  if (cachedLikes) {
    return await cachedLikes;
  }
  const res = await axios.get(LIKE_URL+"?user="+id);
  Cache.set("likes", await res.data["hydra:member"]);
  return await res.data["hydra:member"];
}

export default {
	getLikesForUser,
	deleteLike,
	createLike
}