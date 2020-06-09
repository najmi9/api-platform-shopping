import React from 'react';

//<Field type={type} placeholder={placehlder} name={name} value={valu/>
const Field = ({ type, placeholder, name, onChange, className, value}) =>{
	   return <div className="form-group">
	   <input
           type={type}
           placeholder={placeholder}
           name={name}
           onChange={onChange}
           className={className}
           value={value}
	       />
 
	       </div>;
}
export default Field;