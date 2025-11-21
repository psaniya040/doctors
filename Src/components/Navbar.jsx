import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    // 'sticky-top' keeps the nav visible while scrolling
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        
        {/* 1. Logo / Brand Name */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-heart-pulse-fill text-primary me-2"></i>
          <span className="text-primary">Online</span>Clinic
        </Link>

        {/* 2. Mobile Toggler (Hamburger Menu) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 3. Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* Navigation Links (ms-auto pushes them to the right) */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary px-3" : "nav-link px-3"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary px-3" : "nav-link px-3"}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/doctors" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary px-3" : "nav-link px-3"}>
                Find Doctors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary px-3" : "nav-link px-3"}>
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary px-3" : "nav-link px-3"}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* 4. CTA Button */}
          <div className="d-flex ms-lg-3">
            <Link to="/appointment" className="btn btn-primary rounded-pill px-4 shadow-sm">
              Book Appointment
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;