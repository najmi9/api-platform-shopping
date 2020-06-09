//import PRODUCT_URL from './Config';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";
const CONTACT_API = API_URL + '/contacts';

const fetchContacts = async () =>{
	//const cachedContacts = Cache.get('contacts');
	//if(cachedContacts) return cachedContacts;
	const res = await axios.get(CONTACT_API);
	//Cache.set('contacts', res.data['hydra:member'])
	return res.data['hydra:member'];
}

const fetchContact = async (id) =>{
	const res = await axios.get(CONTACT_API+"/"+id);
	return res.data;
}

const createContact = async (data) =>{
	const res = await axios.post(CONTACT_API, data);
	return res;
}

const deleteContact = async (id) =>{
	const res = await axios.delete(CONTACT_API+"/"+id);
	return res;
}

const updateContact = async (id, data) =>{
	const res = await axios.put(CONTACT_API+"/"+id, data);
	return res.data['hydra:member'];
}



export default {
	fetchContacts,
	fetchContact,
	createContact,
	deleteContact,
	updateContact
}