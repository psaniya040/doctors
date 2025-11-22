import React, { useState } from 'react';
import './MyProfile.css';

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    alert('Your profile has been updated successfully!');
    // Reset form if needed
    // setProfileData({ fullName: '', email: '', phone: '', age: '', gender: '', address: '' });
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>
          Manage your personal information to keep your account up to date and ensure smooth communication with our healthcare team.
        </p>
      </header>

      <div className="profile-content-wrapper">
        <section className="profile-form-section">
          <h2>Update Your Information</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={profileData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Save Profile
            </button>
          </form>
        </section>

        <section className="profile-info-section">
          <h2>Profile Overview</h2>
          <div className="info-card">
            <h3>Account Security</h3>
            <p>Keep your email and phone number updated to receive important notifications securely.</p>
          </div>
          <div className="info-card">
            <h3>Medical Records</h3>
            <p>Your profile information helps us maintain accurate medical records for better care.</p>
          </div>
          <div className="info-card emergency-card">
            <h3>Emergency Notice</h3>
            <p>
              <strong>DO NOT</strong> rely on profile updates for urgent medical needs. Please contact emergency services immediately if required.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;