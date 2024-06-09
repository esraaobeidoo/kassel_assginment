import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  

const apiUrl = 'http://localhost:3007'; 

export async function register(user) {
  return await axios.post(`${apiUrl}/auth/signup`, user);
}


export async function login(email, password) {
  try {
    console.log('Attempting login with:', email, password);
    const { data } = await axios.post(`${apiUrl}/auth/signin`, { email, password }, { withCredentials: true });
    console.log('Login response data:', data); // Log response data
    if (data && data.token) {
      console.log('JWT Token received:', data.token); // Ensure this logs the token
      localStorage.setItem('token', data.token);
      return jwtDecode(data.token);
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response.status, error.response.data);
      throw new Error('Invalid Login');
    } else if (error.request) {
      console.log('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.log('Error setting up request:', error.message);
      throw new Error('Error occurred during login');
    }
  }
}


export function logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization']; 
  }

export function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem('token');
}

axios.defaults.headers.common['Authorization'] = `Bearer ${getJwt()}`;


