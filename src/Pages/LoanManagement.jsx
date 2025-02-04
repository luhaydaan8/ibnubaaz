// src/Pages/LoanManagement.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Ensure this is correctly configured
import './LoanManagement.css';

const LoanManagement = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan requests from the backend
  useEffect(() => {
    axiosInstance
      .get('/loans/') // Replace with your actual backend endpoint for loan requests
      .then((response) => {
        setLoanRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching loan requests:', error);
        setError('Failed to load loan requests.');
        setLoading(false);
      });
  }, []);

  // Handle approve/reject actions
  const handleAction = (id, newStatus) => {
    axiosInstance
      .patch(`/loans/${id}/`, { status: newStatus }) // Replace with your actual endpoint for updating loan status
      .then((response) => {
        // Update the loanRequests state with the new status
        setLoanRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        );
      })
      .catch((error) => {
        console.error(`Error updating loan status to ${newStatus}:`, error);
        alert(`Failed to update loan status. Please try again.`);
      });
  };

  if (loading) {
    return <div className="loan-management-container">Loading loan requests...</div>;
  }

  if (error) {
    return <div className="loan-management-container">{error}</div>;
  }

  return (
    <div className="loan-management-container">
      <h1>Loan Management</h1>
      {loanRequests.length > 0 ? (
        <table className="loan-management-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Loan Amount ($)</th>
              <th>Issued Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.customerName}</td>
                <td>{request.amount}</td>
                <td>{new Date(request.issuedDate).toLocaleDateString()}</td>
                <td className={`status ${request.status.toLowerCase()}`}>
                  {request.status}
                </td>
                <td>
                  {request.status === 'Pending' && (
                    <>
                      <button
                        className="action-btn approve-btn"
                        onClick={() => handleAction(request.id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleAction(request.id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loan requests found.</p>
      )}
    </div>
  );
};

export default LoanManagement;
