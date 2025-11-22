import React from 'react';
import { Link } from 'react-router-dom';

const TopDoctors = () => 
  // Sample data simulating the "Doctor Profiles" database requirement (Section 2)
  // In a real app, this would be fetched from the Backend (Node.js/MySQL)
  constdoctors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: "12 years exp",
      rating: 4.9,
      reviews: 120,
      image: "https://via.placeholder.com/150?text=Dr.+Sarah",
      available: true
    },
    {
      id: 2,
      name: "Dr. Michael Ross",
      specialty: "Dermatologist",
      qualification: "MBBS, DDVL",
      experience: "8 years exp",
      rating: 4.7,
      reviews: 95,
      image: "https://via.placeholder.com/150?text=Dr.+Michael",
      available: true
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: "15 years exp",
      rating: 4.8,
      reviews: 210,
      image: "https://via.placeholder.com/150?text=Dr.+Emily",
      available: false // Example of availability status
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "General Physician",
      qualification: "MBBS, MD",
      experience: "20 years exp",
      rating: 4.6,
      reviews: 180,
      image: "https://via.placeholder.com/150?text=Dr.+James",
      available: true
    }
  ];

  return(
  <>
    {/* Section Header */}
    <div className="row mb-5">
      <div className="col-12 text-center">
        <h2 className="fw-bold text-primary">Top Rated Specialists</h2>
        <p className="text-secondary">
          Book appointments with highly qualified doctors and get expert medical advice
        </p>
      </div>
    </div>
  </>
);

        
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="fw-bold text-primary">Top Rated Specialists</h2>
            <p className="text-secondary">
              Book appointments with highly qualified doctors and get expert medical advice.
            </p>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="row">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0 doctor-card">
                
                {/* Doctor Image */}
                <div className="position-relative">
                  <img 
                    src={doctor.image} 
                    className="card-img-top" 
                    alt={doctor.name}
                    style={{ height: '250px', objectFit: 'cover' }} 
                  />
                  
                  {/* Availability Badge (Requirement 2 - Availability) */}
                  <span className={`position-absolute top-0 end-0 m-2 badge ${doctor.available ? 'bg-success' : 'bg-secondary'}`}>
                     {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="card-body text-center">
                    <div className="d-flex justify-content-center align-items-center gap-1 mb-2">
                        <span className="text-warning fw-bold">{doctor.rating}</span>
                        <span className="text-muted small">({doctor.reviews} reviews)</span>
                    </div>
                    
                    <h5 className="card-title fw-bold text-dark">{doctor.name}</h5>
                    <p className="card-text text-primary mb-1">{doctor.specialty}</p>
                    <p className="card-text text-muted small mb-3">{doctor.qualification}</p>
                    
                    {/* Book Appointment Button (Requirement 2 - Scheduling) */}
                    <Link 
                        to={`/appointment/${doctor.id}`} 
                        className={`btn w-100 ${doctor.available ? 'btn-outline-primary' : 'btn-secondary disabled'}`}
                    >
                        {doctor.available ? 'Book Appointment' : 'Fully Booked'}
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
<div className="row mt-4">
  <div className="col-12 text-center">
    <Link to="/doctors" className="btn btn-primary rounded">
      View All Doctors
    </Link>
  </div>
</div>
export default TopDoctors;