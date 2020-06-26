import React, { useState, useContext } from 'react';
import AuthAPI from '../Services/AuthAPI';
import AuthContext from '../contexts/AuthContext';
import { toast } from "react-toastify";


const PasswordForgotten = ({history}) => {
  const {setResetPasswordCode} = useContext(AuthContext);
	const [credentials, setCredentials] = useState({
		'userEmail':''
	});
  const [loading, setLoding] = useState(true);
	  const handleChange = ({ currentTarget })=>{
    const {name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }

  const handleForgottenEmailSubmit = async e =>{
      setLoding(false);
  	e.preventDefault();
  	try {
  		const resultat = await AuthAPI.sendEmailToUpdatePassword(credentials.userEmail);	  
       if (resultat.data.status === 404) {
          toast.error("utilisateur non trouvé !")
          setLoding(true);
          return;            
       }
        if (resultat.status === 400) {
          toast.error("email invalid !")
          setLoding(true);
          return;           
       }
      const id = await resultat.data.id
      localStorage.setItem("newPasswordCode", await resultat.data.resetPasswordCode);
      setResetPasswordCode(await resultat.data.resetPasswordCode);
      history.push("/user/new-password/"+id);
  	} catch(e) {
      setLoding(true);
  		toast.error("Email Invalid!")
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
                  <input className="form-control" name="userEmail" id="email"
                  placeholder="Vous allez recevoir un email dans cet adrress !"
                   value={credentials.userEmail} onChange={handleChange}  />
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
