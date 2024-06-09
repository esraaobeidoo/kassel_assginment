// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  const user = getCurrentUser();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      {user ? (
        <>
          <span className="nav-item">Welcome, {user.name}</span>
          <button className="nav-item logout-btn" onClick={() => { logout(); window.location = '/'; }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/register" className="nav-item">Register</Link>
        </>
      )}
      {user && user.role === 'teacher' && (
        <Link to="/courses/new" className="nav-item">Add Course</Link>
      )}
      <Link to="/courses" className="nav-item">Courses</Link>
    </nav>
  );
};

export default NavBar;
