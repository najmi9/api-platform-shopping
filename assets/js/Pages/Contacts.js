import React, {useEffect, useState } from 'react';
import ContactAPI from '../Services/ContactAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contacts = ( { history} ) => {

     const [contacts, setContacts] = useState([]);
     const [loading, setLoading] = useState(false);

     const fetchContacts = async () =>{
        try {
        setContacts(await ContactAPI.fetchContacts());
        toast.success('Voilà, les contacts disponible !')
        } catch(e) {
            toast.error('Une erreur est survenue ! ')
            console.log(e);
        }
     }

     const handleDelete = id =>{
        window.alert("Vous voulez vraiment supprimé ce message !")
       try {
        ContactAPI.deleteContact(id);
        toast.warning('le message est bien supprimée')
        setContacts(contacts.filter(contact=>contact.id != id));
       } catch(e) {
           toast.error('une erreur survenue lors de la supprission ! ')
           console.log(e);
       }
     }

   useEffect(()=>{
  fetchContacts();
     setLoading(true);
   },[])
    
    return <div className="container"> { loading && ( contacts.map(contact => (
           <div className="container bg-light p-5" key={contact.id}>
             <h4> { contact.email } </h4> 
             <h6> { contact.message } </h6>
             <button onClick={()=>handleDelete(contact.id)} className="btn btn-danger btn-sm">
             <i className="fa fa-trash"></i>
             </button>
             <Link className="btn btn-info ml-5 btn-sm" to={"/contact/"+contact.id}>
             <i className="fas fa-edit"></i>
             </Link>
           </div>
         
        )) )}</div>
 }
 export default Contacts;