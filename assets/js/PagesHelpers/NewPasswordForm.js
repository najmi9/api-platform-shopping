import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AuthAPI from '../Services/AuthAPI';

const NewPasswordForm = ({ resetPasswordCode, history }) => {
   const [dispalyForm, setDisplayForm] = useState(false);
   const [spinnerDisplay, setSpinnerDisplay] = useState(false);
    
	  const [credentials, setCredentials] = useState({
   	"password":'',
   	"passwordConfirm":''
   });
	const [errors, setErrors] = useState({
    password: "",
    passwordConfirm: ""
   });
   const apiErrors = {};

      const handleChange = ({ currentTarget })=>{
    const {name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
    }

	   const handleResetPassword = async e =>{
   e.preventDefault();
    setSpinnerDisplay(true);
    setDisplayForm(true);
  try {
    const response = await AuthAPI.resetPassword({
      "resetPasswordCode":parseInt(resetPasswordCode),
      "password": credentials.password,
      "passwordConfirm": credentials.passwordConfirm,
    });
     setErrors({});
    toast.success("votre mot de passe est bien modifié !");
     history.push("/login");
  } catch(e) {
       setSpinnerDisplay(false);
    setDisplayForm(false);
        if (e.response) {
            const { violations } = e.response.data; 
            if (violations) {
               violations.forEach(violation => {
        document.querySelector("input[name="+violation.propertyPath+"]").classList.add('is-invalid')
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
            }    
      
        }
     
     
      toast.error('des erreurs dans votre formulaire ! ')
  }
}

    return (
        <div  className="container p-4">
          <h3 className="border-bottom bg-light text-center"> Entrez le nouveau mot de passe </h3>

           {!dispalyForm && ( <form onSubmit={handleResetPassword}>
                                 <div className="form-group">
                                   <input className="form-control" type="password"
                                   placeholder="entrer le nouveau mot de pass"
                                    name="password" value={credentials.password} onChange={handleChange} />
                                   <div className="invalid-feedback"> {errors.password} </div>
                                 
                                 </div>
                                 <div className="form-group">
                                   <input className="form-control" type="password"
                                   name="passwordConfirm" placeholder="confirmer le nouveau mot de pass"
                                   value={credentials.passwordConfirm} onChange={handleChange} />
                                   <div className="invalid-feedback"> {errors.passwordConfirm} </div>
                                  
                                 </div>
                                 <div className="form-group">
                                 <button className="btn btn-primary btn-xl">
                                   modifier mon mot de passe !
                                 </button>
                                 </div>
                                 </form>)}
             { dispalyForm && spinnerDisplay && (
          <div className="d-flex justify-content-center text-danger"role="status" id="spinner">
            <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
               <span className="sr-only">Loading...</span>
            </div>
          </div>
          )
        }
           </div>
    );
};


export default NewPasswordForm;
