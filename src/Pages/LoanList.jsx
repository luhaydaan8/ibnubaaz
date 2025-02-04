// src/Pages/LoanList.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Ensure this is configured correctly
import './LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan data from the backend
  useEffect(() => {
    axiosInstance
      .get('/loans/') // Replace with your actual endpoint for fetching loans
      .then((response) => {
        setLoans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching loan list:', error);
        setError('Failed to load loan list.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loan-list-container">Loading loan records...</div>;
  }

  if (error) {
    return <div className="loan-list-container">{error}</div>;
  }

  return (
    <div className="loan-list-container">
      <h1>Loan List</h1>
      {loans.length > 0 ? (
        <table className="loan-list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Loan Amount ($)</th>
              <th>Issued Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.customer_name}</td> {/* Adjust field names as per your backend */}
                <td>{loan.amount}</td>
                <td>{new Date(loan.issued_date).toLocaleDateString()}</td>
                <td className={`status ${loan.status.toLowerCase()}`}>
                  {loan.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loan records found.</p>
      )}
    </div>
  );
};

export default LoanList;
