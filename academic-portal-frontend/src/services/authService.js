import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  

const apiUrl = 'http://localhost:3007'; 

export async function register(user) {
  return await axios.post(`${apiUrl}/auth/signup`, user);
}

export async function login(email, password) {
  try {
    console.log('Attempting login with:', email, password);

    // Log API URL and payload
    console.log('API URL:', `${apiUrl}/auth/signin`);
    console.log('Request Payload:', { email, password });

    // Make the POST request
    const { data } = await axios.post(`${apiUrl}/auth/signin`, { email, password });
    console.log('Login response data:', data);

    if (data && data.token) {
      const token = data.token;
      console.log('JWT Token received:', token);

      // Store token in localStorage
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage:', localStorage.getItem('token'));

      // Set Authorization header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Decode token if needed
      return jwtDecode(token);
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response.status, error.response.data);
      throw new Error('Invalid Login: ' + error.response.data);
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
    return jwtDecode(token); // Decode token if needed
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem('token');
}

// Set Authorization header with initial token from localStorage
axios.defaults.headers.common['Authorization'] = `Bearer ${getJwt()}`;


// axios.defaults.headers.common['Content-Type'] = 'application/json';


