import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    try {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      // Force reload the page to clear any cached state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="user-sidebar">
      <div className="sidebar-header">
        <h2>Task Tracker</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/user/dashboard" 
          className={`nav-item ${isActive('/user/dashboard') ? 'active' : ''}`}
        >
          My Projects
        </Link>
        <Link 
          to="/user/profile" 
          className={`nav-item ${isActive('/user/profile') ? 'active' : ''}`}
        >
          Profile
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar; 