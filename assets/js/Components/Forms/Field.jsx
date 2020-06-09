import React from "react";

const Field = ({
  name,
 className,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => (
  <div className="form-group">
    <label htmlFor={name}>{name}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder }
      name={name}
      id={name}
      className="form-control"
    />
  </div>
);

export default Field;
