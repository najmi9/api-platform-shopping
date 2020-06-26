import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import AuthAPI from '../Services/AuthAPI';


const ResetPassword = ({match, history}) => {
   const {resetPasswordCode } = useContext(AuthContext);
   const {id} = match.params;
   const [dispalyForm, setDisplayForm] = useState(false);
   const [loading, setLoading] = useState(false);
   const [spinnerDisplay, setSpinnerDisplay] = useState(false)
   const [credentials, setCredentials] = useState({
   	"password":'',
   	"passwordConfirm":''
   });
   const [code, setCode] = useState('');

   const handleChangeCode = ({ currentTarget }) =>{
   	setCode(currentTarget.value)
   }
   
    const handleChange = ({ currentTarget })=>{
    const {name, value } = currentTarget;
    setCredentials({...credentials, [name]: value})
    }

   const handleValidateCode = e =>{
    e.preventDefault();
   	if (resetPasswordCode === code) {
        setLoading(true);
        setDisplayForm(true);
        toast.info("Voila, essayer de réintialiser votre mot de passe !");
   	}else {
   		toast.error("le code d'activation est incorrect, vérifier bien votre email!")
   	}
   }

   const handleResetPassword = async e =>{
   e.preventDefault();
   if (credentials.password !== credentials.passwordConfirm) {
      toast.error("les mots de passes sont différentes!");
      return;
   }
   if (credentials.password .length<6) {
      toast.error("les mot de passe doit être superieur de 6 caractères !");
      return;
   }

    setSpinnerDisplay(true);
    setDisplayForm(false);
   	const response = await AuthAPI.resetPassword(id, {
   		"userId":id,
   		"resetPasswordCode" : code,
   		"password": credentials.password

   	});
   	if (response.status == 200) {
      localStorage.clear('newPasswordCode');
   		toast.success("votre mot de passe est bien modifié !");
     history.push("/login");
   	}else{
   		toast.error("votre requête n'est pas bon !");
      setSpinnerDisplay(true);
      setDisplayForm(false);
   	}
   }

    return (<div>
         {!loading && (
        <div className="container p-4">
          <h3 className="border-bottom bg-light"> Entrez le code de réintialization de mot de passe </h3>
          <form onSubmit={handleValidateCode}>
           <div className="form-group">
             <input className="form-control" placeholder="entrez votre code dans l'email qui vous avez reçu !"
             name="code" value={code} onChange={handleChangeCode} required={true}/>
           </div>
           <div className="form-group">
           <button className="btn btn-primary btn-xl">
             vérifier on code !
           </button>
           </div>
         </form>
        </div>)
         }

        { dispalyForm && !spinnerDisplay && (<div  className="container p-4">
          <h3 className="border-bottom bg-light text-center"> Entrez le nouveau mot de passe </h3>

            <form onSubmit={handleResetPassword}>
           <div className="form-group">
             <input className="form-control" type="password"
             placeholder="entrer le nouveau mot de pass"
              name="password" value={credentials.password} onChange={handleChange} />
           </div>
           <div className="form-group">
             <input className="form-control" type="password"
             name="passwordConfirm" placeholder="confirmer le nouveau mot de pass"
             value={credentials.passwordConfirm} onChange={handleChange} />
           </div>
           <div className="form-group">
           <button className="btn btn-primary btn-xl">
             modifier mon mot de passe !
           </button>
           </div>
           </form>
           </div>)
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
