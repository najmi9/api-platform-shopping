import React , { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import  AuthContext from '../contexts/AuthContext';
import CommentItem from '../PagesHelpers/CommentHelpers/CommentItem';
import AddComment from '../PagesHelpers/CommentHelpers/AddComment';
import CommentAPI from '../Services/CommentAPI';

const Comments = ({commentsPart, productId}) =>{
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState(commentsPart);
  const { isAuthenticated } = useContext(AuthContext);

     const setState = id =>{
        setComments(comments.filter(c=>c.id!==id));
     }

     const setStateAfterAddComment = async () =>{
      setComments(await CommentAPI.fetchCommentsForThisProduct(productId));
     }

    const handleAddComment = () =>{
      const comment = document.getElementById('js-add-comment');
      comment.classList.replace ('hide-comment', 'show-comment') ;
      document.getElementById('btn-comment').style.display='none';
  }


     return (
      <>
       {!isAuthenticated && (
        <h2> 
          Se connecter pour commenter!!
          <Link to="/login" className="btn btn-warning">
            se connecter
          </Link>
        </h2>) }
        {comments.length > 0 && (<h2> {comments.length} Commentaires.</h2>)} 
        {comments.length == 0 && (<h2> Il  n'a pas encore des ommentaires sur ce produit.</h2>)} 
        { isAuthenticated && (
          <button
          className="btn btn-outline-primary btn-sm"
          onClick={handleAddComment} id="btn-comment">
            Laisser une commentaire !
          </button>  )
        }      
        <div id="js-add-comment" className="hide-comment">
          <AddComment productId={productId} setStateAfterAddComment={setStateAfterAddComment} />             
        </div>
        { comments.length>0 && ( 
            <div id="comments"> 
              { comments.map(comment=>(
                <CommentItem commentElement={comment} key={comment.id} productId={productId} setState={()=>setState(comment.id)} />              
              ))
              } 
            </div>)
        }
      </>)
}

export default Comments;