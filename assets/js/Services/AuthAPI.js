import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL} from "./Config";
import UserInfo from "../Components/UserInfo";

const LOGIN_API = API_URL+"/login_check";
const REGISTER_URL = API_URL + "/users";


function logout() {
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("authRefreshToken");
  delete axios.defaults.headers["Authorization"];
}


function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then(response => response.data)
    .then(data => {
      if (data) {
         window.localStorage.setItem("authToken", data.token);
         window.localStorage.setItem("authRefreshToken", data.refresh_token);
         setAxiosToken(data.token);
      }
      return data.token;
    });
}


function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}


const setup = async () => {
  let token = window.localStorage.getItem("authToken");
  if (token) {
      if (UserInfo.isTokenExpired(token)) {
       await UserInfo.refreshToken();
       const token = window.localStorage.getItem("authToken");
      } 
      if (token) {  
         setAxiosToken(token);  
      }
  }
}

const isAuthenticated = () => {
  let token = window.localStorage.getItem("authToken");
  if (token) {
      if (UserInfo.isTokenExpired(token)) {
          UserInfo.refreshToken();
         const token = window.localStorage.getItem("authToken");
      }
      if (token) { 
        return true;
      }
  }
  return false;
}


export default {
  authenticate,
  logout,
  setup,
  isAuthenticated
};