
import React from 'react';
import { FaCalendarAlt, FaStar, FaUserMd } from 'react-icons/fa';


const DoctorCard = ({ doctor, onBook }) => {
    const isAvailable = doctor.availableSlots > 0;
    const statusClass = isAvailable ? 'text-success' : 'text-danger';
    const statusText = isAvailable ? 'Available Today' : 'Booked Today';

    return (
        <div className="card doctor-card border-0 shadow-sm mb-4">
            <div className="card-body d-flex flex-column flex-md-row align-items-center">
                
                {}
                <div className="d-flex flex-column align-items-center me-md-4 mb-3 mb-md-0">
                    <img 
                        src={doctor.imageUrl || `https://ui-avatars.com/api/?name=${doctor.name}&background=0D83DD&color=fff&size=128`} 
                        alt={`Dr. ${doctor.name}`} 
                        className="rounded-circle" 
                        style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                    />
                    <small className={`mt-2 fw-bold ${statusClass}`}>
                        <FaUserMd className="me-1" /> {statusText}
                    </small>
                </div>

                {}
                <div className="flex-grow-1 text-center text-md-start">
                    <h5 className="mb-1 text-primary">Dr. {doctor.name}</h5>
                    <p className="mb-1 text-muted small">{doctor.specialty} | {doctor.experience} Years Experience</p>
                    <div className="d-flex justify-content-center justify-content-md-start align-items-center mb-2">
                        <FaStar className="text-warning me-1" />
                        <span className="fw-bold me-2">{doctor.rating.toFixed(1)}</span>
                        <span className="text-muted small">({doctor.reviewCount} Reviews)</span>
                    </div>
                </div>

                {}
                <div className="ms-md-auto mt-3 mt-md-0 d-grid gap-2">
                    <button 
                        className={`btn ${isAvailable ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onBook(doctor.id)}
                        disabled={!isAvailable}
                    >
                        <FaCalendarAlt className="me-1" /> 
                        {isAvailable ? 'View Slots & Book' : 'Not Available'}
                    </button>
                    <small className="text-center text-muted">
                        ${doctor.fee.toFixed(2)} Consultation
                    </small>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;

