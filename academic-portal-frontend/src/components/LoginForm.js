import React, { useState } from 'react';
import { login } from '../services/authService';
import './LoginForm.css';
import { getJwt } from '../services/authService';

function LoginForm() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
  
    const handleChange = ({ currentTarget: input }) => {
      setCredentials({ ...credentials, [input.name]: input.value });
    };
  
    const handleSubmit = async (e) => {
        console.log('Submitting login with credentials:', credentials);
        e.preventDefault();
        try {
          const result = await login(credentials.email, credentials.password);
          console.log('Login result:', result);
        } catch (ex) {
          if (ex.message === 'Invalid Login') {
            setError('Invalid email or password. Please try again.');
          } else {
            setError('An unexpected error occurred. Please try again later.');
            console.error('Login error:', ex);
          }
        }
      };

    const token = getJwt(); 
    console.log('JWT Token:', token);

    
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
