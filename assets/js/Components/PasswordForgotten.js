import React, { useState } from 'react';
import AuthAPI from '../Services/AuthAPI';

const PasswordForgotten = () => {
	const [credentials, setCredentials] = useState({
		'userEmail':''
	});
  const [resultat, setResultat] = useState('');
  const [loading, setLoding] = useState(true);
  const [responseLoaded, setResponseLoaded] = useState(true);
	  const handleChange = ({ currentTarget })=>{
    const {name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
  }

  const handleForgottenEmailSubmit = async e =>{
      setLoding(false);
  	e.preventDefault();
  	try {
  		const resultat = await AuthAPI.sendEmailToUpdatePassword(credentials.userEmail);	  
       if (resultat.status === 404) {
          setResultat(resultat.message);
          setLoding(true);            
       }
      setResultat(resultat.message);
      setResponseLoaded(false);
  	} catch(e) {
      setLoding(true);
      setResponseLoaded(false);
  		toast.error("une erreur est servenu ressayer plus tard !")
  		console.log(e);
  	}
  }
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Mot de Passe Oublié</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

      { !responseLoaded && (<h1 className="text-center text-secondary" > {resultat} </h1> ) }
      
      { !loading && responseLoaded && (<div className="d-flex justify-content-center text-danger" 
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
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    );
};

export default PasswordForgotten;
