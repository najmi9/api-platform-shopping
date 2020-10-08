import React, {useEffect, useState } from 'react';
import ContactAPI from '../Services/ContactAPI';
import { toast } from 'react-toastify';

const Contact = ( { history, match } ) => {
	 const { id="new" } = match.params;
     const [ editing, setEditing ] = useState(false);
     const [contact, setContact] = useState({
     	'email':'',
     	'message':''
     });

     const handleChange = ( { currentTarget } ) =>{
        const { name, value } = currentTarget;
        setContact({ ...contact, [name]: value });
     }

     const handleSubmit = e =>{
     	e.preventDefault();
     	try {
     		console.log(editing);
     		if (!editing) {
     		ContactAPI.createContact(contact);
     		toast.success("Votre message est bien envoyée !");
             history.replace("/");
          }else{
          	console.log(contact)
          	ContactAPI.updateContact(id,contact)
          	toast.success("Votre message est bien modifiée !");
             history.replace("/");
          }
     	} catch(e) {
     		toast.error("Votre Message n'est envoyée, essayer plus-tard !")
     		console.log(e);
     	}

     }
    const fetchContact = async(id) =>{
    	try {
    	setContact(await ContactAPI.fetchContact(id));
    	} catch(e) {
     			toast.error("Impossible de charger le message !")
     			console.log(e);
     		}
    }
     useEffect( ()=>{
     	if (id == "new") {
     		setEditing(false);     		
     	}else{    		
     			fetchContact(id);    		
     		     setEditing(true)
     	}
     }, [id])

  return <div className="container p-5 bg-light mt-3 w-60 text-center">
           { !editing && (<h3 className="text-primary border-bottom mb-3"> Me contacter </h3>) || (<h1>Modéfication de message !</h1>) } 
            <form onSubmit={ handleSubmit } >
           <div className="form-group">
               <input type="email" value={contact.email} placeholder="votre email ..."
               onChange={handleChange} name="email" className="form-control" />
           </div> 

           <div className="form-group">
               <textarea type="message" value={contact.message} placeholder="votre message ..."
               onChange={handleChange} name="message"  className="form-control"> </textarea>
           </div> 
           <button className="btn btn-success" type="submit"> Envoyer </button>
         </form>
   </div>
}
export default Contact;