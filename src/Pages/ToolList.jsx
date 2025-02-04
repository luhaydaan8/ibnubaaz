

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';  
import './ToolList.css';

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      


  useEffect(() => {
    axiosInstance.get('/tools/')
      .then(response => {
        setTools(response.data); 
        setLoading(false);        
      })
      .catch(err => {
        setError('Error fetching data');  // Set error state if something goes wrong
        setLoading(false);  
      });
  }, []);  
  const updateStatus = (id, newStatus) => {
    setTools((prevTools) =>
      prevTools.map((tool) =>
        tool.id === id ? { ...tool, status: newStatus } : tool
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there is an error
  }

  return (
    <div className="tools-container">
      <h1>Tool Inventory</h1>
      <table className="tools-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tool Name</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Condition</th>
            <th>Purchased Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id}>
              <td>{tool.id}</td>
              <td>{tool.name}</td>
              <td>{tool.quantity}</td>
              <td>{tool.tool_type}</td>
              <td>{tool.condition}</td>
              <td>{tool.purchase_date}</td>
              <td className={`status ${tool.status.replace(/\s+/g, '').toLowerCase()}`}>
                {tool.status}
              </td>
              <td>
                {tool.status !== 'Available' && (
                  <button
                    className="action-btn available-btn"
                    onClick={() => updateStatus(tool.id, 'Available')}
                  >
                    Mark as Available
                  </button>
                )}
                {tool.status !== 'Under Maintenance' && (
                  <button
                    className="action-btn maintenance-btn"
                    onClick={() => updateStatus(tool.id, 'Under Maintenance')}
                  >
                    Under Maintenance
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolList;
