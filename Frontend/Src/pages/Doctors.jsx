import React, { useState } from 'react';
import './Doctor.css';

const Doctor = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor profile submitted:', doctorData);
    alert('Doctor profile has been saved successfully!');
    setDoctorData({
      name: '',
      specialty: '',
      email: '',
      phone: '',
      bio: ''
    });
  };

  return (
    <div className="doctor-container">
      <header className="doctor-header">
        <h1>Our Doctors</h1>
        <p>
          Meet our experienced healthcare professionals. Learn more about their specialties and connect with them.
        </p>
      </header>

      <div className="doctor-content-wrapper">
        <section className="doctor-form-section">
          <h2>Add / Update Doctor Profile</h2>
          <form className="doctor-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Doctor Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={doctorData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialty">Specialty</label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={doctorData.specialty}
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
                value={doctorData.email}
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
                value={doctorData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Short Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={doctorData.bio}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Save Profile
            </button>
          </form>
        </section>

        <section className="doctor-info-section">
          <h2>Featured Doctors</h2>
          <div className="info-card">
            <h3>Dr. Sarah Johnson</h3>
            <p>Specialty: Cardiology</p>
            <p>Email: sarah.johnson@onlineclinic.com</p>
            <p>Phone: +1 (555) 987-6543</p>
          </div>
          <div className="info-card">
            <h3>Dr. Michael Lee</h3>
            <p>Specialty: Pediatrics</p>
            <p>Email: michael.lee@onlineclinic.com</p>
            <p>Phone: +1 (555) 222-3344</p>
          </div>
          <div className="info-card emergency-card">
            <h3>Emergency Notice</h3>
            <p>
              <strong>DO NOT</strong> use this page for emergencies. Please call your local emergency services immediately.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Doctor;