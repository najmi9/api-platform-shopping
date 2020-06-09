import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Field from '../Services/Field';

const Contact = () =>{
    
    const [contactInfo, setContactInfo] = useState({
              email:'',
              message:''
        	})
    const [ errors, setErrors ] = useState([]);
    const [ loading, setLoading] = useState(false);

    const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setContactInfo({ ...contactInfo, [name]: value });
  };
  const handleSubmit = (e) =>{
   e.preventDefault();
   console.log(contactInfo);
   const url = "http://localhost:8000/api/contacts";
   try{
      
       axios
   .post(url,{
   	"email":contactInfo.email,
   	'message':contactInfo.message
   })
   .then(response=> {
   	console.log(response);
   	setLoading(true);
     })
   .catch((error) =>setErrors(error.response.data['violations']))

   }catch{
     console.log(error)
   }
  
  }



 	const element =null;
   console.log(errors.length)
  	if (errors.length > 0) {
     const element = errors.map((err) => {
     	return <li> {err.message} </li>
     })}
  
	return <form onSubmit={ handleSubmit }>
	 
	 <Field type={"text"} name={"email"} placeholder={"Email"} 
	   className={"form-control"} 
	   onChange={handleChange} value={contactInfo.email}
	    />
	  <textarea className="form-control" placeholder="Vore message .."
	  value={contactInfo.message}  name="message"
	  onChange={ handleChange }> </textarea>
    <ul className="text-danger"> 
     { element && <ul> { element } </ul>}
    </ul>

     <button type="submit" 
     className="btn btn-warning"> Hit the Button </button>
	       </form>
}
export default Contact;