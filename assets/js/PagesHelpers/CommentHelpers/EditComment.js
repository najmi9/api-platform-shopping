import React, {useState, useEffect} from 'react';
import CommentAPI from '../../Services/CommentAPI';
import { API_URL } from '../../Services/Config';
import  { toast } from 'react-toastify';
import '../../Style/home.css';
import $ from 'jquery';
import ReactDOM from 'react-dom';


const EditComment = ({productId, commentId, setStateAfterEdit}) =>{
    const [comment, setComment] = useState({ content:"" });

    const handleChange = ({currentTarget})=>{
       const {name, value} = currentTarget;
       setComment({...comment, [name]: value});
    }

  const handleSubmit = e =>{
    handleCancelEditComment();
    e.preventDefault();
    try {
      CommentAPI.updateComment(commentId, {
        "content": comment.content,
        "product":API_URL+"/products/"+productId
      });
      toast.success("le commentaire est bien modifiée !")
      setStateAfterEdit(commentId);
    } catch(e) {
      toast.error("une erreur est servenue essayer plustard !");
      console.log(e);
    }

  }
  
  const handleCancelEditComment = ()=>{
          const comment = document.getElementById("comment-content-"+commentId);
      comment.classList.replace ('hide', 'show') ;           
     ReactDOM.unmountComponentAtNode(document.getElementById('js-edit-comment-'+commentId))
  }

  const fetchComment =async (id)=>{
    const old = await CommentAPI.fetchComment(id);
    if (old) {
  setComment({
    content: old.content
  })
    }
 }

 useEffect(()=>{
  fetchComment(commentId);
 }, [])

    return <div>
    <form onSubmit={handleSubmit}>
                      <textarea placeholder="commenter ... " name="content"
                       value={comment.content} onChange={handleChange}
                       className="form-control"
                      />
                      <button type="submit" className="btn btn-success">
                      Enregistre les modifications !
                      </button>
                     </form>
          <a className="btn btn-danger btn-sm" onClick={handleCancelEditComment}>
          <i className="fas fa-times"></i>
          </a>
          </div>;
  
  }
  export default EditComment;