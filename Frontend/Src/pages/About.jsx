import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Our Online Doctors Clinic</h1>
        <p>Your trusted partner in remote healthcare and well-being.</p>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to providing accessible, secure, and high-quality healthcare consultations right from your home. By integrating cutting-edge technology, we ensure seamless communication and continuity of care for all our patients.
        </p>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Secure Teleconsultation</h3>
            <p>
              <span className="highlight">We integrate secure video conferencing capabilities for teleconsultations</span>, 
              <span className="highlight"> ensuring HIPAA-compliant video calls with encryption for patient confidentiality</span>.
            </p>
          </div>
          <div className="feature-card">
            <h3>Comprehensive EHR Management</h3>
            <p>
              <span className="highlight">We maintain your patient records through a built-in Electronic Health Records (EHR) module</span>, 
              <span className="highlight"> ensuring doctors can securely access your medical history, lab reports, and treatment plans</span>.
            </p>
          </div>
          <div className="feature-card">
            <h3>Seamless Prescriptions & Billing</h3>
            <p>
              <span className="highlight">Doctors can electronically prescribe medications</span>. 
              <span className="highlight"> We also support secure payment gateway integration for processing consultation fees and support multiple payment methods</span>.
            </p>
          </div>
          <div className="feature-card">
            <h3>Expert Healthcare Providers</h3>
            <p>
              <span className="highlight">View detailed profiles of our doctors, including specialties, qualifications, and experience</span>. 
              <span className="highlight"> You can also see patient reviews, ratings, and feedback to aid in your selection</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <h2>Ready to Start?</h2>
        <p>Register your account today to connect with our certified healthcare professionals.</p>
        <button onClick={() => window.location.href='/register'}>
          Register Now
        </button>
      </section>
    </div>
  );
};

export default About;