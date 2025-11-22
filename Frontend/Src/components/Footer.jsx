import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          
          {/* Column 1: Brand & About */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold text-primary mb-3">Online Doctors Clinic</h5>
            <p className="small text-secondary">
              Bridging the gap between patients and healthcare providers. 
              Experience secure video consultations, digital prescriptions, and 
              comprehensive health record management.
            </p>
            {/* Social Media Links */}
            <div className="d-flex gap-3 mt-3">
              <a href="/" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
              <a href="/" className="text-light fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="/" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="/" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          {/* Column 2: For Patients */}
          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">For Patients</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/find-doctors" className="text-decoration-none text-secondary">
                  Find a Doctor
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-secondary">
                  Login / Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/appointments" className="text-decoration-none text-secondary">
                  Book Appointment
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none text-secondary">
                  Health Records
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Doctors (Added for completeness) */}
          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">For Doctors</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/doctor/register" className="text-decoration-none text-secondary">
                  Join as Specialist
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/doctor/login" className="text-decoration-none text-secondary">
                  Doctor Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i> 
                123 Health Valley, Medical District
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                support@doctorsclinic.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Line & Copyright */}
        <hr className="border-secondary my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-secondary mb-0">
              &copy; {new Date().getFullYear()} Online Doctors Clinic. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/privacy" className="small text-secondary text-decoration-none me-3">Privacy Policy</Link>
            <Link to="/terms" className="small text-secondary text-decoration-none">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;