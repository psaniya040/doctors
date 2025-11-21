import React from 'react';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  
  const specialties = [
    { name: "General Physician", icon: "bi-clipboard2-pulse", link: "/doctors/general-physician" },
    { name: "Dermatology", icon: "bi-bandaid", link: "/doctors/dermatology" },
    { name: "Cardiology", icon: "bi-heart-pulse", link: "/doctors/cardiology" },
    { name: "Pediatrics", icon: "bi-emoji-smile", link: "/doctors/pediatrics" },
    { name: "Neurology", icon: "bi-activity", link: "/doctors/neurology" },
    { name: "Gastroenterology", icon: "bi-water", link: "/doctors/gastroenterology" },
    { name: "Psychiatry", icon: "bi-brain", link: "/doctors/psychiatry" },
    { name: "Gynecology", icon: "bi-gender-female", link: "/doctors/gynecology" }
  ];

  return (
    <section className="py-5 bg-light" id="specialties">
      <div className="container">
        
        {/* Section Header */}
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h2 className="fw-bold text-primary">Find by Speciality</h2>
            <p className="text-secondary">
              Consult with top doctors across various specialisations.
            </p>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="row justify-content-center">
          {specialties.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
              {/* Link wrapper to make the whole card clickable */}
              <Link to={item.link} className="text-decoration-none">
                <div 
                  className="card h-100 border-0 shadow-sm text-center py-4 hover-shadow transition-all"
                  style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div className="card-body">
                    {/* Icon */}
                    <div className="mb-3">
                      <i className={`bi ${item.icon} text-primary fs-1`}></i>
                    </div>
                    {/* Specialty Name */}
                    <h6 className="card-title text-dark fw-bold">{item.name}</h6>
                    <small className="text-muted">View Doctors</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* View All Button (Optional, if there are more specialties than shown) */}
        <div className="row mt-3">
            <div className="col-12 text-center">
                <button className="btn btn-outline-secondary rounded-pill px-4">
                    View All Specialities
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default SpecialityMenu;