import React from "react";

export default React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: value => {},
  price: 0,
  setPrice: value=> {},
  carts : [],
  setCarts : value=>{}
});
