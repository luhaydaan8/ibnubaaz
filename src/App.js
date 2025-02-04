// src/Pages/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Pages
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import FarmerDashboard from './Pages/FarmerDashboard';
import LoanRequest from './Pages/LoanRequest';
import ToolList from './Pages/ToolList';
import MaintenanceManagement from './Pages/MaintenanceManagement';
import Navbar from './Pages/Navbar';
import Signup from './Pages/Signup';
import FarmerProfile from './Pages/FarmerProfilePage'; // Import FarmerProfile
// import ErrorPage from './Pages/404ErrorPage';
import ToolDetails from './Pages/ToolDetails';
import FarmerManagement from './Pages/FarmerManagement';
// import registrationPage from './Pages/registrationPage';
import Registration from "./Pages/Registration";
// import 
// Inside <Routes>:


const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      {/* <LoginPage /> */}
      <Routes>
      <Route path="/tools/:id" element={<ToolDetails />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer-profile" element={<FarmerProfile />} />
        <Route path="/loans" element={<LoanRequest />} />
        <Route path="/tools" element={<ToolList />} />
        <Route path="/maintenance" element={<MaintenanceManagement />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/farmer" element={<FarmerManagement />} />
        <Route path="/Registration" element={<Registration/>} />


        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
