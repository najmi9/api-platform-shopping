import React from 'react';

const Field = ({ type, placeholder, name, onChange, value}) => <div className="form-group">
	   <input
           type={type}
           placeholder={placeholder}
           name={name}
           onChange={onChange}
           className="form-control"
           value={value}
	       /> </div>;

export default Field;