import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { useNavigate } from 'react-router-dom';


const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    role: "",
    password: "",
    
    
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const validFormats = ["image/jpeg", "image/png", "image/jpg"];
  //     if (validFormats.includes(file.type)) {
  //       setFormData({ ...formData, image: file });
  //       setErrorMessage(""); // Clear error message for valid format
  //     } else {
  //       setErrorMessage("Invalid image format. Only JPG, JPEG, or PNG allowed.");
  //       setFormData({ ...formData, image: null });
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Check if reg_no exists
      const checkResponse = await axios.post(
        "http://localhost:8000/api/check_reg_no/",
        { reg_no: formData.reg_no }
      );

      if (checkResponse.data.exists) {
        setErrorMessage("Student with this registration number already exists.");
        return;
      }

      // Prepare form data for submission
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });

      // Submit form data to the server
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Student/",
        submissionData
      );

      if (response.status === 201) {
        setSuccessMessage("Student registered successfully!");
        setFormData({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    role: "",
    password: "",
        });
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Farmer Registration Form</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            {/* Student Name */}
            <div className="col-md-4 mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="student_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

    
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="email" className="form-label">
              Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="col-md-4 mb-3">
              <label htmlFor="phone_number" className="form-label">
                Phone Number
              </label>
              <input
                type="number"        
                className="form-control"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                maxLength={10}         
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="course_name" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
           

            {/* Gender */}
            <div className="col-md-4 mb-3">
              <label htmlFor="gender" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="owner">Owner</option>
                <option value="worker">Worker</option>
              </select>
            </div>

            {/* Password */}
            <div className="col-md-4 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
           


          </div>

          {/* Error and Success Messages */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>

  );
};

export default StudentRegistrationForm;

   
               


               
                
                  
    







