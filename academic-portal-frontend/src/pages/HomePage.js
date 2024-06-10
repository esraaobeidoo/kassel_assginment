import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      // Replace with actual API call
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'Student',
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing tokens
    // For now, just redirect to the login page
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <h1>Academic Portal</h1>
      <div className="user-card">
        <div className="user-info">
          <img
            src={`https://api.adorable.io/avatars/150/${user.email}.png`}
            alt="User Avatar"
            className="user-avatar"
          />
          <h2>Name :{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>{user.role}</p>
        </div>
        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>
      </div>
      <div className="button-container">
       
      </div>
    </div>
  );
};

export default HomePage;
