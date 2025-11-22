import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  // State to handle the mobile menu toggle
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    // sticky-top ensures the nav stays visible while scrolling
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-heart-pulse-fill text-primary me-2 fs-3"></i>
          <span className="fw-bold text-primary">Online Doctors</span>
        </Link>

        {/* Mobile Toggle Button (Hamburger) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="navbarContent" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links & Buttons */}
        {/* The logical check `${isNavCollapsed ? 'collapse' : ''}` handles the open/close state */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
          
          {/* Centered Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/find-doctors" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary" : "nav-link"}>
                Find Doctors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary" : "nav-link"}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary" : "nav-link"}>
                About Us
              </NavLink>
            </li>
          </ul>

          {/* Right Side: Auth Buttons */}
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary px-4">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary px-4">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;