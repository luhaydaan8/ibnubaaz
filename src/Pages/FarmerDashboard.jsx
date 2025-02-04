// src/Pages/FarmerDashboard.js

import React from 'react';
import './FarmerDashboard.css';



const FarmerDashboard = () => {
  return (
    <div className="farmer-dashboard">
      <h1>Welcome to Farmer Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Available Tools</h2>
          <p>Check out the tools available for your use.</p>
          <a href='/tools' >
            View Tools</a>
        </div>
        <div className="dashboard-card">
          <h2>Loan Requests</h2>
          <p>Track the status of your loan requests or submit a new one.</p>
          <a href='/loans'>View Loans</a>
        </div>
        <div className="dashboard-card">
          <h2>Maintenance</h2>
          <p>Report or view the maintenance status of tools.</p>
          <a href='/maintenance'>View Maintenance</a>
        </div>
        
        <div className="dashboard-card">
          <h2>Farmer</h2>
          <p>Report or view the maintenance status of tools.</p>
          <a href='/farmer'>View Farmers</a>
        </div>
        
      </div>
    </div>
  );
};

export default FarmerDashboard;
