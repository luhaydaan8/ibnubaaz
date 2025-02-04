// src/Pages/AdminDashboard.js

import React from 'react';
import './AdminDashboard.css'; // Import the external CSS file

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      
      <main className="dashboard-main">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Select a section from the sidebar to manage the application.</p>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Loan Requests</h3>
            <p>Manage customer loan requests efficiently.</p>
            <a href="/loans" className="card-link">View Details</a>
          </div>
          <div className="card">
            <h3>Tools</h3>
            <p>Track and manage tools inventory.</p>
            <a href="/tools" className="card-link">View Details</a>
          </div>
          <div className="card">
            <h3>Maintenance</h3>
            <p>Oversee maintenance tasks and schedules.</p>
            <a href="/maintenance" className="card-link">View Details</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
