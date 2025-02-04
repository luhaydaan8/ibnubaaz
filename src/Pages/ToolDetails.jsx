// src/Pages/ToolDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './ToolDetails.css';

const ToolDetails = () => {
  const { id } = useParams(); // Get the tool ID from the URL
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the tool details from the backend
    axiosInstance
      .get(`/toolss/${id}`) // Use the correct endpoint for fetching tool details
      .then((response) => {
        setTool(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tool details:', error);
        setError('Failed to load tool details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="tool-details-container">Loading tool details...</div>;
  }

  if (error) {
    return <div className="tool-details-container">{error}</div>;
  }

  return (
    <div className="tool-details-container">
      <h1>Tool Details</h1>
      {tool ? (
        <div className="tool-details-card">
          <h2>{tool.name}</h2>
          <p>
            <strong>Tool ID:</strong> {tool.id}
          </p>
          <p>
            <strong>Quantity:</strong> {tool.quantity}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`status ${tool.status.replace(/\s+/g, '').toLowerCase()}`}>{tool.status}</span>
          </p>
          <p>
            <strong>Category:</strong> {tool.category || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {tool.description || 'No description available.'}
          </p>
          <p>
            <strong>Last Maintenance:</strong>{' '}
            {tool.last_maintenance ? new Date(tool.last_maintenance).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      ) : (
        <p>No tool details found.</p>
      )}
    </div>
  );
};

export default ToolDetails;
