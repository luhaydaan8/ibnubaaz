// src/Pages/FarmerProfile.js

import React, { useState } from 'react';
import './FarmerProfile.css';

const FarmerProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+123456789',
    address: '123 Farm Lane, Countryville',
    bio: 'Passionate farmer with over 10 years of experience in agriculture.',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
  };

  return (
    <div className="farmer-profile">
      <h1>Farmer Profile</h1>
      <div className="profile-container">
        <div className="profile-field">
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.phone}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Address:</label>
          {editMode ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.address}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Bio:</label>
          {editMode ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profile.bio}</span>
          )}
        </div>
        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setFormData(profile);
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
