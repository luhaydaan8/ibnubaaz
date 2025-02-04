// src/Pages/LoanDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './LoanDetail.css';

const LoanDetail = () => {
  const { id } = useParams(); // Get loan ID from the URL
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch loan details from the backend
    axiosInstance
      .get(`/loans/${id}/`) // Adjust the endpoint to your API structure
      .then((response) => {
        setLoan(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching loan details:', error);
        setError('Failed to load loan details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loan-detail-container">Loading loan details...</div>;
  }

  if (error) {
    return <div className="loan-detail-container">{error}</div>;
  }

  return (
    <div className="loan-detail-container">
      <h1>Loan Details</h1>
      {loan ? (
        <div className="loan-detail-card">
          <h2>Loan ID: {loan.id}</h2>
          <p>
            <strong>Borrower Name:</strong> {loan.borrower_name}
          </p>
          <p>
            <strong>Amount:</strong> ${loan.amount}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`status ${
                loan.status.replace(/\s+/g, '').toLowerCase()
              }`}
            >
              {loan.status}
            </span>
          </p>
          <p>
            <strong>Interest Rate:</strong> {loan.interest_rate}%
          </p>
          <p>
            <strong>Duration:</strong> {loan.duration} months
          </p>
          <p>
            <strong>Disbursed On:</strong> {loan.disbursed_date || 'N/A'}
          </p>
          <p>
            <strong>Repayment Date:</strong> {loan.repayment_date || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {loan.description || 'No description provided.'}
          </p>
        </div>
      ) : (
        <p>No loan details found.</p>
      )}
    </div>
  );
};

export default LoanDetail;
