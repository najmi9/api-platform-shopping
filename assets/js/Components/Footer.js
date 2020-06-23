import React from 'react';

const Footer = () => {
    return (
    	<footer>
    	  <div className="footer right_footer text-center">
    	    <p className="text-center">
    	      <i className="fas fa-map-marker-alt"></i> {" "}
              Marrakech-Chichaoua-Sidi_El_Mokhtar    	    
    	    </p>
    	    <p>
    	      <i className="fas fa-phone"></i> 07 62 95 17 42
    	    </p>
            <p>
             <a to="mailto:imadnajmi9@gmail.com">
              <i className="fas fa-envelope"></i> {" "} imadnajmi9@gmail.com 
              </a>
            </p>
    	  </div>

           <div className="footer text-center left_footer"> 
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-github"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>

    	  <div className="footer middle_footer text-center" >
    	    All Rights Reserved @2020 Imad Najmi.
    	  </div>
    	   
    	</footer>
        
    );
};



export default Footer;
