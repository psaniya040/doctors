import React from 'react';
import { Link } from 'react-router-dom';


const Banner = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Column: Text and Call to Actions */}
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold text-primary mb-3">
              Expert Healthcare, <br />
              <span className="text-dark">Anytime, Anywhere.</span>
            </h1>
            
            <p className="lead text-secondary mb-4">
              Connect with certified specialists via secure video calls, 
              manage your electronic health records, and get e-prescriptions 
              instantly.
            </p>
            
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-start">
              {/* Primary CTA */}
              <Link to="/find-doctors" className="btn btn-primary btn-lg px-4 gap-3">
                Find a Doctor
              </Link>
              
              {/* Secondary CTA */}
              <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">
                Register as Patient
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="row mt-5">
              <div className="col-md-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-camera-video-fill text-primary me-2 fs-4"></i>
                  <span className="fw-bold">Video Consult</span>
                </div>
                <small className="text-muted">Secure & HIPAA compliant</small>
              </div>
              
              <div className="col-md-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-file-medical-fill text-primary me-2 fs-4"></i>
                  <span className="fw-bold">Digital EHR</span>
                </div>
                <small className="text-muted">Access history anytime</small>
              </div>

              {/* COMPLETED: Third Feature Column */}
              <div className="col-md-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-receipt text-primary me-2 fs-4"></i>
                  <span className="fw-bold">E-Prescriptions</span>
                </div>
                <small className="text-muted">Instant pharmacy delivery</small>
              </div>
            </div>
          </div>
          
          {/* ADDED: Right Column (Hero Image) to balance the layout */}
          <div className="col-lg-6 mt-5 mt-lg-0 text-center">
             <div className="position-relative">
                {/* Replace src with your actual image asset */}
                <img 
                  src="https://via.placeholder.com/600x500?text=Doctor+Consultation" 
                  alt="Telemedicine Consultation" 
                  className="img-fluid rounded-3 shadow-lg"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;