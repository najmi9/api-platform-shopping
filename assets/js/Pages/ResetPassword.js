import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AuthAPI from '../Services/AuthAPI';
import NewPasswordForm from '../PagesHelpers/NewPasswordForm'; 


const ResetPassword = ({history}) => {
   const [dispalyForm, setDisplayForm] = useState(false);
   const [loading, setLoading] = useState(false);
   const [spinnerDisplay, setSpinnerDisplay] = useState(false);
   const [resetPasswordCode, setCode] = useState('');
   const [errors, setErrors] = useState({
    resetPasswordCode: ""
   });
   const apiErrors = {};

 

   const handleChangeCode = ({ currentTarget }) =>{
   	setCode(currentTarget.value)
   }
   
  

   const handleValidateCode =async (e) =>{
       setLoading(true);
       setDisplayForm(false);
       setSpinnerDisplay(true);
    try {
      e.preventDefault();
       const response = await AuthAPI.isCodeValid(
        {"resetPasswordCode": parseInt(resetPasswordCode)})   
      
       toast.info("Voila, essayer de réintialiser votre mot de passe !"); 
       setDisplayForm(true);
       setSpinnerDisplay(false)
    } catch(e) {
      setLoading(false);
       setSpinnerDisplay(false);
        if (e.response) {
            const { violations } = e.response.data; 
            if (violations) {
               violations.forEach(violation => {
        document.querySelector("input[name="+violation.propertyPath+"]").classList.add('is-invalid')
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        console.log(apiErrors)
            }   

            if (e.response.data.message) {
              toast.error(e.response.data.message);
            }else {
               toast.error("des erreurs dans votre formulaire !")
            } 
      
        }
    }    
   }


    return (<div className="p-5 m-5">
         {!loading && (
        <div className="container p-4">
          <h3 className="border-bottom bg-light"> Entrez le code de réintialization de mot de passe </h3>
          <form onSubmit={handleValidateCode}>
           <div className="form-group">

             <input className="form-control" 
             placeholder="entrez votre code dans l'email qui vous avez reçu !"
             name="resetPasswordCode" 
             value={resetPasswordCode}
             onChange={handleChangeCode} 
             required={true} />

             <div className="invalid-feedback"> {errors.resetPasswordCode} </div>
            
           </div>
           <div className="form-group">
           <button className="btn btn-primary btn-xl" type="submit">
             vérifier on code !
           </button>
           </div>
         </form>
        </div>)
         }

        { dispalyForm && !spinnerDisplay && (<NewPasswordForm history={history} resetPasswordCode={resetPasswordCode} />)
        }

        { !dispalyForm && spinnerDisplay && (
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

export default ResetPassword;
