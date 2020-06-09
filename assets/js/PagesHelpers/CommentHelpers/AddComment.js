import React, { useState, useEffect } from 'react';
import CommentAPI from '../../Services/CommentAPI';
import { toast } from 'react-toastify';
import ProductAPI from '../../Services/ProductAPI';
import $ from 'jquery';


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

 const handleSubmit = (e) => {
 handleCancel();
 	e.preventDefault();
 	console.log(comment)
 	try {
 		CommentAPI.createComment({
 			"content": comment.content,
 			"product":"http://lcoalhost:8000/api/products/"+productId
 		})
 		toast.success("Votre commentaire  à été bien ajouté ");
    setStateAfterAddComment();
 	} catch(e) {
 		toast.error("Une erreur est servenue essayer plustard !");
 		console.log(e);
 	}
 	
 }
 

  useEffect(()=>{
  }, [])


	return <form onSubmit={handleSubmit}>
	 <div className="form-group">
        <textarea className="form-control" name="content" 
        defaultValue={comment ? comment.content : " "}
        placeholder="Votre commentaire..." onChange={handleChange} ></textarea>
	 </div>
	 <button type="submit" className="btn btn-outline-warning">
	 Commenter !
	 </button>
	 <a id="cancel-comment" className="btn btn-danger" 
	 onClick={handleCancel}>
	<i className="fas fa-times"></i>
	 </a>
	</form>

}
export default AddComment;