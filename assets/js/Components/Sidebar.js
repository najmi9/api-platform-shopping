import React, { useState } from 'react';
import '../Style/Sidebar.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Sidebar = ({totalQuantity}) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleClickSidebar = () =>{
    if (isClicked) {
      setIsClicked(false)
    }else {
      setIsClicked(true)
    }
    $(".side_bar").slideToggle(500);

  }

    return (
       <>
       <button onClick={handleClickSidebar} className="btn-side-bar btn btn-sm btn-danger"> 
         <i className={isClicked ? ("fas fa-times"): ("fas fa-sliders-h")}></i>
       </button>
        <div className="side_bar">
           <ul className="list-group list-group-flush">
             <li className="list-group-item" id="side_bar">
                <Link to="/cart">
                 <i className="fas fa-shopping-cart"></i>
                 <span className="badge badge-danger">{totalQuantity} </span>
                 </Link>
             </li>
             <li className="list-group-item" id="side_bar">
                 <Link to="contact/new"> <i className="fas fa-envelope"></i> </Link>
             </li>
             <li className="list-group-item" id="side_bar">
               <Link to="/"><i className="fas fa-question-circle"></i></Link>
             </li>
             <li className="list-group-item" id="side_bar"> 
             <Link to="/"><i className="fas fa-trophy"></i></Link> </li>
           </ul>
        </div>
        </>
    );
};


const mapStateToProps = state =>{
  return {
    totalQuantity : state.cart.reduce((totalQuantity, item)=>totalQuantity + item.quantity ,0)
  }
}

export default connect(mapStateToProps)(Sidebar);
