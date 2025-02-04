// src/Pages/404ErrorPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './404ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
