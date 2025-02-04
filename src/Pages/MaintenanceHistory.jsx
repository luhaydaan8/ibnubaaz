// src/Pages/MaintenanceHistory.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './MaintenanceHistory.css';

const MaintenanceHistory = () => {
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch maintenance history from the backend
    axiosInstance
      .get('/maintenance-history/') // Backend endpoint for fetching maintenance history
      .then((response) => {
        setMaintenanceHistory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching maintenance history:', error);
        setError('Failed to load maintenance history.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="maintenance-history-container">Loading maintenance history...</div>;
  }

  if (error) {
    return <div className="maintenance-history-container">{error}</div>;
  }

  return (
    <div className="maintenance-history-container">
      <h1>Maintenance History</h1>
      {maintenanceHistory.length > 0 ? (
        <table className="maintenance-history-table">
          <thead>
            <tr>
              <th>Tool Name</th>
              <th>Maintenance Date</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceHistory.map((record) => (
              <tr key={record.id}>
                <td>{record.tool_name}</td>
                <td>{new Date(record.maintenance_date).toLocaleDateString()}</td>
                <td>{record.status}</td>
                <td>{record.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No maintenance records found.</p>
      )}
    </div>
  );
};

export default MaintenanceHistory;
