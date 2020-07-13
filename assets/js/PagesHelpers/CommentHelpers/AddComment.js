import React, { useState, useEffect } from 'react';
import CommentAPI from '../../Services/CommentAPI';
import { toast } from 'react-toastify';
import ProductAPI from '../../Services/ProductAPI';
import { API_URL } from "../../Services/Config";


const AddComment = ({ productId, setStateAfterAddComment }) =>{
  const [comment, setComment] = useState({
  	content:''
  })
 
  const handleCancel = () =>{
    const comment = document.getElementById('js-add-comment');
      comment.classList.replace ('show-comment', 'hide-comment') ;
      document.getElementById('btn-comment').style.display='block';
  }

 const handleChange = ({ currentTarget }) =>{
 	const { name,value } = currentTarget;
 	setComment({...comment, [name]:value})
 }

 const handleSubmit = async (e) => {
      handleCancel();
 	    e.preventDefault();
 	    try {
 		 await CommentAPI.createComment(comment.content, productId);
 		 toast.success("Votre commentaire  à été bien ajouté ");
     setStateAfterAddComment();
 	  } catch(e) {
 		 toast.error("Une erreur est servenue essayer plustard !");
 	  }	
 }
 
  useEffect(()=>{
  }, [])

	return <form onSubmit={handleSubmit} className="comment-form ">
	        <div className="form-group">
            <textarea className="form-control" name="content" 
            defaultValue={comment ? comment.content : " "}
            placeholder="Votre commentaire..." onChange={handleChange} ></textarea>
	        </div>
          <div className="form-group text-center">
	          <button type="submit" className="btn btn-warning">
	            Commenter !
	          </button>
	          <a id="cancel-comment" className="btn btn-danger btn-xl" 
	          onClick={handleCancel}>
	            <i className="fas fa-times"></i> quitter
	          </a>
          </div>
        </form>
}
export default AddComment;