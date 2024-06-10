import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to the Academic Portal</h1>
      <p>Manage your courses efficiently and effectively.</p>
      <div className="button-container">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
