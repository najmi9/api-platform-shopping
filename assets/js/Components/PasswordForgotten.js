import React, { useState } from 'react';
import AuthAPI from '../Services/AuthAPI';
import { toast } from "react-toastify";


const PasswordForgotten = ({history}) => {
	const [email, setEmail] = useState("");
   const [errors, setErrors] = useState({
    email: ""
  });
  const apiErrors = {};
  const [loading, setLoding] = useState(true);

	  const handleChange = ({ currentTarget })=>{
       setEmail(currentTarget.value)
    }

  const handleForgottenEmailSubmit = async e =>{
      setLoding(false);
  	  e.preventDefault();
  	try {
  		const resultat = await AuthAPI.sendEmailToUpdatePassword({"email" :email});	  
      setErrors({});
      toast.info("un code de vérifaication a été envoyer à cet email, veuillez de le confirmer !")
      history.push("/user/new-password");

  	} catch(e) {
      setLoding(true);
  		 if (e.response) {
       const { violations } = e.response.data; 
       if (violations) {
            violations.forEach(violation => {
       document.querySelector("input[name="+violation.propertyPath+"]").classList.add('is-invalid')
          apiErrors[violation.propertyPath] = violation.message;
       });
        setErrors(apiErrors);
      toast.error('Email Invalid ')
        
       }    
       if (e.response.data.message) {
         toast.error(e.response.data.message)
       }
    } 
  	}
  }
    return (
        <div className="container p-4 m-4 bg-light">
      <div className="text-center">
        <h5 className="text-success">Mot de Passe Oublié</h5>
      </div>
      <div className="body">
      { !loading && (<div className="d-flex justify-content-center text-danger" 
            role="status" id="spinner">
            <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
              <span className="sr-only">Loading...</span>
            </div>
            </div>)
      }   
  
     { loading &&( <form onSubmit={handleForgottenEmailSubmit} >
                 <div className="form-group">
                 <label htmlFor="email"> Entrez votre email : </label>
                  <input className="form-control" name="email" id="email"
                  placeholder="Vous allez recevoir un email dans cet adrress !"
                   value={email} onChange={handleChange}  />
                  <div className="invalid-feedback"> {errors.email} </div>
                </div>
                <div className="form-group">
                   <button type="submit" className="btn btn-success w-100">send</button>
                </div>
                  </form>)
      }
      </div>
    </div>
    );
};

export default PasswordForgotten;
