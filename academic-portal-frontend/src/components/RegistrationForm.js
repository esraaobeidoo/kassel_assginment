import React, { useState } from 'react';
import { register } from '../services/authService';
import './RegistrationForm.css';

function RegistrationForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      setSuccessMessage('Registration successful!'); // Set success message
      setError(null); // Clear any previous error messages
      setUser({ // Reset user state for next registration
        name: '',
        email: '',
        password: '',
        role: 'student',
      });
    } catch (ex) {
      if (ex.response && ex.response.data) {
        setError(ex.response.data); // Set the error message from the response
      } else {
        setError('An unexpected error occurred.'); // Fallback error message
      }
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-control"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button type="submit" className="btn">Register</button>
        {error && <div className="error">{error.error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </form>
    </div>
  );
}

export default RegistrationForm;
