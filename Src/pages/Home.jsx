import React from 'react';
import './Help.css'; 

const Help = () => {
  return (
    <div className="help-container">
      <header className="help-header">
        <h1>Need Help? Find Support Here.</h1>
        <p>
          Quickly find answers to common questions about appointments, teleconsultations, billing, and more.
        </p>
      </header>

      <section className="faq-section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className="faq-grid">
          {}
          <div className="faq-card">
            <h3>How do I book an appointment?</h3>
            <p>
              You can use our calendar-based system to view doctors' availability and schedule appointments directly from their profile. [span_1](start_span)You will receive appointment reminders and notifications via email or SMS.[span_1](end_span)
            </p>
            <button onClick={() => window.location.href='/appointments'}>Go to Scheduling</button>
          </div>

          {}
          <div className="faq-card">
            <h3>How does the video consultation work?</h3>
            <p>
              We integrate secure video conferencing for teleconsultations. The calls are HIPAA-compliant and use encryption for patient confidentiality. [span_3](start_span)You can also use real-time chat messaging for text-based communication.[span_3](end_span)
            </p>
            <button onClick={() => window.location.href='/dashboard'}>Start a Chat</button>
          </div>

          {}
          <div className="faq-card">
            <h3>What payment methods are supported?</h3>
            <p>
              We integrate secure payment gateways (e.g., Stripe, PayPal) and support multiple payment methods, including credit/debit cards and digital wallets. [span_6](start_span)[span_7](start_span)We also provide support for insurance verification and reimbursement claims.[span_6](end_span)[span_7](end_span)
            </p>
            <button onClick={() => window.location.href='/billing'}>Manage Billing</button>
          </div>

          {}
          <div className="faq-card">
            <h3>How are my medical records handled?</h3>
            <p>
              We use an EHR system compliant with medical data standards (e.g., HL7) to maintain patient records. [span_10](start_span)[span_11](start_span)Doctors can electronically prescribe medications, which can be seamlessly delivered via pharmacy integration.[span_10](end_span)[span_11](end_span)
            </p>
            <button onClick={() => window.location.href='/records'}>View My Records</button>
          </div>
        </div>
      </section>

      <hr />

      {}
      <section className="contact-support-section">
        <h2>Still Can't Find an Answer?</h2>
        <p>
          For technical issues, please contact our support team directly. [span_12](start_span)For security concerns, please refer to our Data Protection policies.[span_12](end_span)
        </p>
        <div className="contact-options">
            <button className="contact-button primary" onClick={() => window.location.href='/contact'}>
              Contact Customer Support
            </button>
            <button className="contact-button secondary" onClick={() => window.location.href='/security'}>
              View Security & Privacy Policy
            </button>
        </div>
      </section>
    </div>
  );
};

export default Help;