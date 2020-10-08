import React, { useState } from 'react';
import UserAPI from '../Services/UserAPI';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const Register = ({ history }) =>{
  const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

	const [user, setUser] = useState({
		'username':'',
		'email': '',
		'password':'',
    'passwordConfirm':''
	})

   const apiErrors = {};

	const handleChange = ({ currentTarget  })=>{
		const { name, value } = currentTarget;
		setUser({ ...user, [name]:value });
	}
 
   const handleSubmit = async (e) =>{
     setLoading(true);
   	e.preventDefault();
   	try {
   		const data = await UserAPI.register(user);      
       setErrors({});
   		 toast.success("Votre compte à été bien crée !, il reste juste que t'activer.")
       document.getElementById('js-action').style.display="none";
       history.push("/email-confirmation");

   	} catch(error) {
      toast.error('des erreurs dans votre formulaire ! ')
        setLoading(false);
        if (error.response) {
            const { violations } = error.response.data;     
       violations.forEach(violation => {
        document.querySelector("input[name="+violation.propertyPath+"]").classList.add('is-invalid')
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        }   
   	}
   }
  

 return <div className="p-2 mt-2 container bg-light border text-center" id="js-action">
          <h4 className="text-center text-info m-3"> Création de compte : </h4>
          { loading && (<div className="d-flex justify-content-center text-success" 
            role="status" id="spinner">
            <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
              <span className="sr-only">Loading...</span>
            </div>
            </div>)
          }
          {!loading && (<form onSubmit={handleSubmit}>
          <div className="form-group">
           <input type="text" name="username" onChange={handleChange} 
           value={user.username}
            placeholder="entrer votre username..." 
             className="form-control" required/>
            <div className="invalid-feedback"> {errors.username} </div>
          </div>
           
             <div className="form-group">
              <input type="email" name="email" onChange={handleChange} 
           value={user.email}
            placeholder="entrer votre email..." 
             className="form-control"
             required
            />
             <div className="invalid-feedback"> {errors.email} </div>
          </div>
           
             <div className="form-group">
              <input type="password" name="password" onChange={handleChange} 
           value={user.password}
            placeholder="entrer votre password..."
             className="form-control" required
            />
             <div className="invalid-feedback"> {errors.password} </div>
          </div>

           <div className="form-group">
              <input type="password" name="passwordConfirm" onChange={handleChange} 
           value={user.passwordConfirm}
            placeholder="confirmer votre password..." 
             className="form-control" required
            />
             <div className="invalid-feedback"> {errors.passwordConfirm} </div>
          </div>
           
            <button type="submit" className="btn btn-outline-success btn-xl">
               S'iscrire !
            </button>
          </form>)}
        </div>
}
export default Register;