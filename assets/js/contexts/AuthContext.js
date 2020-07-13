import React from "react";

export default React.createContext({
  price: 0,
  setPrice: value=> {},
  carts : [],
  setCarts : value=>{},
  product: false,
  setProduct: value=>{},
  code: 0,
  setCode: value=>{},
  resetPasswordCode:0,
  setResetPasswordCode: value =>{}
});
