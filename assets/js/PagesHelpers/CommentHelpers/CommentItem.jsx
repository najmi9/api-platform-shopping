import React, {useState, useEffect} from 'react';
import  AuthAPI from '../../Services/AuthAPI';
import CommentAPI from '../../Services/CommentAPI';
import ReactDOM from 'react-dom';
import { toast} from 'react-toastify';
import EditComment from './EditComment';
import moment from 'moment';
import UserInfo from '../../Components/UserInfo';

const CommentItem = ({commentElement,productId, setState }) =>{
  const [comment, setComment] = useState(commentElement)
  const [commentOwner, setCommentOwner] = useState(false);

    const handleDeleteComment =async (commentId) =>{
    try {
      alert("vous êtes sure de supprimer ce commentaire !");
      await CommentAPI.deleteComment(commentId);
      toast.info("le commentaire est supprimé !")
      setState(commentId);
    } catch(e) {
      console.log(e);
    }
  }
  
  const setStateAfterEdit = async  id =>{
  	setComment(await CommentAPI.fetchComment(id));
  }

  const handleEditComment = async  (commentId) =>{
    
   const comment = document.getElementById("comment-content-"+commentId);
      comment.classList.replace ('show', 'hide') ;
     ReactDOM.render(<EditComment commentId={commentId} productId={productId} setStateAfterEdit={()=>setStateAfterEdit(commentId)} />, document.getElementById('js-edit-comment-'+commentId));   
  }
 
   const hasCommentOwner = async commentId =>{
 	 var itsHisComment = false;
  	 const user = await  UserInfo.parseJwt();
     if (user) {
        const commts = await CommentAPI.fetchCommentsForThisUser(user.userId);
        if(!commts || commts.length == 0){
         return itsHisComment ;
        }
        commts.forEach( function(comment) {
          if (comment.id === commentId) {
           itsHisComment=true;
          }
        });

     }
  	 
  	
  	 return itsHisComment;
  }

 useEffect(()=>{
 	hasCommentOwner(comment.id).then(x=>{
 		setCommentOwner(x)
 	});
 },[comment.id])

return  <div className="container card" id="comment">
          
            <div className="card-title">               
                <h6> 
                    <i className="fas fa-user"></i> {"  "} {"  "}
                    {comment.user.username} {" "}
                    <small> commenter à {"  "}
        { moment(comment.createdAt , "YYYYMMDD").fromNow()}
                     </small>
                </h6>
            </div>
            <div className="card-body">
                <p id={"comment-content-"+comment.id} className="show">
                    { comment.content } 
                </p>
                              
            </div>
            { AuthAPI.isAuthenticated() && commentOwner && (
                <div>
                    <p id="edit-delete-btns" className="show"> 
                        <a className="text-muted btn-link btn" 
                        onClick={()=>handleDeleteComment(comment.id)}>
                            supprimer
                        </a>

                        <a className="text-muted btn-link btn" 
                        onClick={()=>handleEditComment(comment.id)}>                
                             modifier
                        </a>
                    </p>
                    <p id={"js-edit-comment-"+comment.id} className="show">
                    </p>
                </div>)
                }
            </div>
}
export default CommentItem;