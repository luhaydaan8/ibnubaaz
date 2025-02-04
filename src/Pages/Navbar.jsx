// src/Components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the external CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>FTS</h1>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/farmer-dashboard">Dashboard</Link></li>
        <li><Link to="/loans">Loan Requests</Link></li>
        <li><Link to="/tools">Tools</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
