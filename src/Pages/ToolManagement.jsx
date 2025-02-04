// src/Pages/ToolManagement.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ToolManagement.css';

const ToolManagement = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTool, setNewTool] = useState({ name: '', quantity: '', status: 'Available', category: '', description: '' });
  const [editingTool, setEditingTool] = useState(null);

  // Fetch tools from the backend
  useEffect(() => {
    axiosInstance
      .get('/tools/') // Ensure endpoint matches backend
      .then((response) => {
        setTools(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tools:', error);
        setError('Failed to load tools.');
        setLoading(false);
      });
  }, []);

  // Add a new tool
  const handleAddTool = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/tools/', newTool)
      .then((response) => {
        setTools([...tools, response.data]);
        setNewTool({ name: '', quantity: '', status: 'Available', category: '', description: '' });
      })
      .catch((error) => {
        console.error('Error adding tool:', error);
        setError('Failed to add tool.');
      });
  };

  // Update an existing tool
  const handleUpdateTool = (e) => {
    e.preventDefault();
    if (!editingTool) return;

    axiosInstance
      .put(`/tools/${editingTool.id}/`, editingTool) // Endpoint for updating a tool
      .then((response) => {
        setTools(tools.map((tool) => (tool.id === editingTool.id ? response.data : tool)));
        setEditingTool(null);
      })
      .catch((error) => {
        console.error('Error updating tool:', error);
        setError('Failed to update tool.');
      });
  };

  // Delete a tool
  const handleDeleteTool = (id) => {
    axiosInstance
      .delete(`/tools/${id}/`) // Endpoint for deleting a tool
      .then(() => {
        setTools(tools.filter((tool) => tool.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting tool:', error);
        setError('Failed to delete tool.');
      });
  };

  if (loading) {
    return <div className="tool-management-container">Loading tools...</div>;
  }

  if (error) {
    return <div className="tool-management-container">{error}</div>;
  }

  return (
    <div className="tool-management-container">
      <h1>Tool Management</h1>

      {/* Add/Edit Tool Form */}
      <div className="add-tool-form">
        <h2>{editingTool ? 'Edit Tool' : 'Add New Tool'}</h2>
        <form onSubmit={editingTool ? handleUpdateTool : handleAddTool}>
          <div className="form-group">
            <label>Tool Name</label>
            <input
              type="text"
              value={editingTool ? editingTool.name : newTool.name}
              onChange={(e) =>
                editingTool
                  ? setEditingTool({ ...editingTool, name: e.target.value })
                  : setNewTool({ ...newTool, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={editingTool ? editingTool.quantity : newTool.quantity}
              onChange={(e) =>
                editingTool
                  ? setEditingTool({ ...editingTool, quantity: e.target.value })
                  : setNewTool({ ...newTool, quantity: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={editingTool ? editingTool.status : newTool.status}
              onChange={(e) =>
                editingTool
                  ? setEditingTool({ ...editingTool, status: e.target.value })
                  : setNewTool({ ...newTool, status: e.target.value })
              }
            >
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={editingTool ? editingTool.category : newTool.category}
              onChange={(e) =>
                editingTool
                  ? setEditingTool({ ...editingTool, category: e.target.value })
                  : setNewTool({ ...newTool, category: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editingTool ? editingTool.description : newTool.description}
              onChange={(e) =>
                editingTool
                  ? setEditingTool({ ...editingTool, description: e.target.value })
                  : setNewTool({ ...newTool, description: e.target.value })
              }
            />
          </div>
          <button type="submit">{editingTool ? 'Update Tool' : 'Add Tool'}</button>
        </form>
      </div>

      {/* Tool List */}
      <div className="tool-list">
        <h2>Existing Tools</h2>
        <table className="tools-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.id}>
                <td>{tool.id}</td>
                <td>{tool.name}</td>
                <td>{tool.description}</td>
                <td>{tool.quantity}</td>
                <td>{tool.status}</td>
                <td>
                  <button onClick={() => setEditingTool(tool)}>Edit</button>
                  <button onClick={() => handleDeleteTool(tool.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolManagement;
