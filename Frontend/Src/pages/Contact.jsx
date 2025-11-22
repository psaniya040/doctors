import React, { useState } from 'react';
import './Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Our Support Team</h1>
        <p>
          We are here to help with your inquiries, technical support, or feedback regarding your online clinic experience.
        </p>
      </header>

      <div className="contact-content-wrapper">
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit Inquiry
            </button>
          </form>
        </section>

        <section className="contact-info-section">
          <h2>Other Ways to Connect</h2>
          <div className="info-card">
            <h3>General Inquiries</h3>
            <p>Email: support@onlineclinic.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div className="info-card">
            <h3>Live Chat Support</h3>
            <p>
              For text-based communication between patients and healthcare providers, please log in to your dashboard and use the integrated chat messaging feature[span_0](end_span).
            </p>
          </div>
          <div className="info-card emergency-card">
            <h3> Emergency Notice</h3>
            <p>
              **DO NOT** use this form for medical emergencies. If you have an emergency, please call your local emergency services immediately.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;