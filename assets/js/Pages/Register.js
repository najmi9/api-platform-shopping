import React, { useState } from 'react';
import AuthAPI from '../Services/AuthAPI';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';


const Register = ({ history }) =>{
	const [user, setUser] = useState({
		'username':'',
		'email': '',
		'password':''
	})

	const handleChange = ({ currentTarget  })=>{
		const { name, value } = currentTarget;
		setUser({ ...user, [name]:value });
	}
 
   const handleSubmit = async (e) =>{
   	e.preventDefault();
   	try {
   		await AuthAPI.register(user);
   		toast.success('Votre compte à été bien crée !, se connecter maintenant')
      document.getElementById('js-action').style.display="none";
      history.push("/login");
   	} catch(e) {
   		toast.error('une error survenue ! essayer plustard!');
   		console.log(e);
   	}
   }

 return <div className="container p-5 mt-5 bg-light border text-center " id="js-action">
          <h4 text-center> Création de compte : </h4>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
           <input type="text" name="username" onChange={handleChange} 
           value={user.username}
            placeholder="entrer votre username..." className="form-control"
            />
          </div>
           
             <div className="form-group">
              <input type="email" name="email" onChange={handleChange} 
           value={user.email}
            placeholder="entrer votre email..." className="form-control"
            />
          </div>
           
             <div className="form-group">
              <input type="password" name="password" onChange={handleChange} 
           value={user.password}
            placeholder="entrer votre password..." className="form-control"
            />
          </div>
           
            <button type="submit" className="btn btn-outline-success btn-xl">
               S'iscrire !
            </button>
          </form>
        </div>
}
export default Register;