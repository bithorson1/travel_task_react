import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.is_staff || decoded.is_superuser;
    } catch (error) {
      console.error("Token decode error", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        {!isAdmin && (
          <Link to="/request" className="nav-link">New Request</Link>
        )}
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;
