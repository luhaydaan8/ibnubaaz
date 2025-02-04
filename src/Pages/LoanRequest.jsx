// src/Pages/LoanRequest.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Ensure axiosInstance is configured with your base URL
import './LoanRequest.css';

const LoanRequest = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan requests from the backend
  useEffect(() => {
    axiosInstance
      .get('/loans/')
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

  // Handle status updates
  const handleAction = (id, action) => {
    axiosInstance
      .patch(`/loans/${id}/`, { status: action })
      .then((response) => {
        // Update the local state with the new status
        setLoanRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: response.data.status } : request
          )
        );
      })
      .catch((error) => {
        console.error(`Error updating loan request status for ID ${id}:`, error);
        alert('Failed to update loan request status.');
      });
  };

  if (loading) {
    return <div className="loan-request-container">Loading loan requests...</div>;
  }

  if (error) {
    return <div className="loan-request-container">{error}</div>;
  }

  return (
    <div className="loan-request-container">
      <h1>Loan Requests</h1>
      {loanRequests.length > 0 ? (
        <table className="loan-table">
          <thead>
            <tr>
              <th>#</th>
              <th>tool</th>
              <th>Farmer ($)</th>
              <th>Loan_date</th>
              <th>return_date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.tool}</td> {/* Adjust field names if necessary */}
                <td>{request.farmer}</td>
                <td>{request.loan_date}</td>
                <td>{request.return_date}</td>
                <td className={`status ${request.status.toLowerCase()}`}>
                  {request.status}
                </td>
                <td>
                  {request.status === 'Pending' && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleAction(request.id, 'active')}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleAction(request.id, 'returned')}
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

export default LoanRequest;
