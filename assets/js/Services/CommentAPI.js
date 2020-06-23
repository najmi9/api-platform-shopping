import React from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";
const COMMENT_API = API_URL  + "/comments";

const createComment = async (comment) =>{
	const response = await axios.post(COMMENT_API, comment);
	return await response.data['hydra:member'];
}

const deleteComment = async (id) =>{
	const response = await axios.delete(COMMENT_API + "/" +id);
	return await response.data['hydra:member'];
}

const updateComment = async (id, comment) =>{
	const response = await axios.put(COMMENT_API + "/" +id, comment);
	return await response.data['hydra:member'];
}

const fetchComment = async (id) =>{
	const response = await axios.get(COMMENT_API + "/" +id);
	return await response.data;
}

const fetchCommentsForThisProduct = async id =>{
	//console.log(COMMENT_API+"?product="+id+"?order[createdAt]=asc")
	const res = await axios.get(COMMENT_API+"?product="+id); 
	return await res.data["hydra:member"];
}

const fetchCommentsForThisUser = async  id =>{
	const res = await axios.get(COMMENT_API+"?user="+id); 
	return await res.data["hydra:member"];
}

export default {
  fetchComment,
  createComment,
  deleteComment,
  updateComment,
  fetchCommentsForThisProduct,
  fetchCommentsForThisUser
}