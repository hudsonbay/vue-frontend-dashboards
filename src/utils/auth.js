import decode from "jwt-decode";
import axios from "axios";

const AUTH_TOKEN_KEY = "authToken";
const USER_EMAIL = "USER_EMAIL";

import store from "../store";

export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${axios.defaults.baseURL}/api/users/login`,
        method: "POST",
        data: {
          email: email,
          password: password,
        },
      });

      console.log("response", res.data);
      console.log("res", res);

      setAuthToken(res.data.data.token);
      await fetchLoggedUserInfo(res.data.data.id);
      resolve();
    } catch (err) {
      console.error("Caught an error during login:", err);
      // reject(err);
      if (err.response && err.response.status === 401) {
        alert("Error during login");
        console.log("err.response", err.response.data);
      } else {
        // Handle error however you want
        alert("handling error");
      }
    }
  });
}

export function logoutUser() {
  clearAuthToken();
  store.commit("clearUser");
}

export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function storeUserEmail(email) {
  localStorage.setItem(USER_EMAIL, email);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getLoggedUserEmail() {
  return localStorage.getItem(USER_EMAIL);
}

export function getLoggedUserInfo() {
  return store.state.user;
}

export function fetchLoggedUserInfo(id) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${axios.defaults.baseURL}/api/users/${id}`,
        method: "GET",
        data: {
          id: id,
        },
      });
      storeUserInfo(res.data.data);
      resolve();
    } catch (err) {
      console.error("Caught an error during login:", err);
      reject(err);
    }
  });
}

export function storeUserInfo(data) {
  // localStorage.setItem(USER_INFO, JSON.stringify(data));

  //add all the dashboards to global state
  store.commit("storeUserInfo", data);
}

export function clearAuthToken() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

export function getUserInfo() {
  if (isLoggedIn()) {
    return decode(getAuthToken());
  }
}

function getTokenExpirationDate(encodedToken) {
  let token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  let date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
