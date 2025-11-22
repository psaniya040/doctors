import React, { useState } from 'react';
import './MyAppointments.css';

const MyAppointments = () => {
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    email: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', appointmentData);
    alert('Your appointment has been scheduled successfully!');
    setAppointmentData({
      patientName: '',
      email: '',
      date: '',
      time: '',
      reason: ''
    });
  };

  return (
    <div className="appointments-container">
      <header className="appointments-header">
        <h1>My Appointments</h1>
        <p>
          Schedule, manage, and review your upcoming appointments with our healthcare providers.
        </p>
      </header>

      <div className="appointments-content-wrapper">
        <section className="appointments-form-section">
          <h2>Book a New Appointment</h2>
          <form className="appointments-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="patientName">Full Name</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={appointmentData.patientName}
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
                value={appointmentData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Appointment Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={appointmentData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Appointment Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={appointmentData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason for Visit</label>
              <textarea
                id="reason"
                name="reason"
                rows="4"
                value={appointmentData.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Book Appointment
            </button>
          </form>
        </section>

        <section className="appointments-info-section">
          <h2>Manage Your Appointments</h2>
          <div className="info-card">
            <h3>Upcoming Visits</h3>
            <p>View and track all your scheduled appointments in your patient dashboard.</p>
          </div>
          <div className="info-card">
            <h3>Reschedule or Cancel</h3>
            <p>
              Need to make changes? Log in to your account to reschedule or cancel an appointment.
            </p>
          </div>
          <div className="info-card emergency-card">
            <h3>Emergency Notice</h3>
            <p>
              <strong>DO NOT</strong> use this form for emergencies. Please call your local emergency services immediately.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyAppointments;