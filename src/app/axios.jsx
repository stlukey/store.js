import axios from 'axios';
//mport localStorage from 'local-storage';

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(value) {
    console.log("Saving token...");
    localStorage.token = value;
}

export function removeToken() {
    console.log("Removing token...");
    localStorage.removeItem('token');
}

export default () => axios.create({
  baseURL: API_URL,
  headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.token === null ?
          '' : `Bearer ${localStorage.token}`
  }
});
