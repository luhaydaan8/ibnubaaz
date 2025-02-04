// src/Pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the external CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="hero">
        <h1 className="hero-heading">Welcome to Our Service Platform!</h1>
        <p className="hero-subheading">
          We are here to help you with tools, loans, and maintenance services. Your satisfaction is our priority.
        </p>
      </div>
      <div className="services">
        <div className="service-box">
          <h3 className="service-title">Tool Rentals</h3>
          <p>Find the tools you need for your next project.</p>
        </div>
        <div className="service-box">
          <h3 className="service-title">Loan Services</h3>
          <p>Flexible loan options tailored to your needs.</p>
        </div>
        <div className="service-box">
          <h3 className="service-title">Maintenance</h3>
          <p>Reliable maintenance services to keep things running smoothly.</p>
        </div>
      </div>
      <div className="button-container">
        <Link to="/Registration" className="link-button">
          farmer get started
        </Link>
        <Link to="/login" className="link-button">
          Admin login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
