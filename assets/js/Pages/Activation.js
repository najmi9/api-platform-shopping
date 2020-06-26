import React, { useState, useContext } from 'react';
import AuthAPI from '../Services/AuthAPI';
import AuthContext from '../contexts/AuthContext';
import {toast} from 'react-toastify'

const Activation = ( { match, history } ) => {
    const { id } = match.params;
    const [acode, setCode] = useState(0);
    const { code } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    
	 const handleChange = ({ currentTarget })=>{  
      setCode(currentTarget.value);
   }


    if (id==null) {
      return ;
    }   

   const handleSubmit = async (e) =>{

      e.preventDefault();
      try {
          const response = await AuthAPI.activate(parseInt(acode));
          if (response.data.status === 200) {
            toast.success(response.data.message)
            history.push("/login")
          }
      } catch(e) {
        toast.error("une erreur est servenue, raysser plustard !")
      }
    
      toast.warning("le code d'activation est incorrect !");
    
   	  }

    return (<div className="container p-5 m-4">
      <h3> Tapez le code d'activation qui a été envoyé à vote email d'inscription : </h3>
      {!loading && (<div className="d-flex justify-content-center text-info" 
            role="status" id="spinner">
            <div className="spinner-border" role="status" style={{"width": 3+"rem", "height": 3+"rem", "margin": 40+"px"}} >
              <span className="sr-only">Loading...</span>
            </div>
            </div>)}

      {loading && (<form onSubmit={handleSubmit} >
       <div className="form-group">
         <input type="number" className='form-control' name="code"  value={acode}
         onChange = {handleChange} placeholder="code d'activation de compte !" />
       </div>
        <div className="form-group">
         <button type="submit" className='btn btn-success'>
           Activer
        </button>
       </div>

       </form> )}
      </div>
    );
};


export default Activation;
