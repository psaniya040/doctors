import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const [relDocs, setRelDocs] = useState([]);

  // Mock Data (In a real app, this would come from Context or an API)
  const doctors = [
    {
      _id: 'doc1',
      name: 'Dr. Richard James',
      image: 'https://via.placeholder.com/150', // Replace with real image
      speciality: 'General Physician',
      available: true
    },
    {
      _id: 'doc2',
      name: 'Dr. Emily Larson',
      image: 'https://via.placeholder.com/150',
      speciality: 'Gynecologist',
      available: true
    },
    {
      _id: 'doc3',
      name: 'Dr. Patrick Morris',
      image: 'https://via.placeholder.com/150',
      speciality: 'Dermatologist',
      available: false
    },
    {
      _id: 'doc4',
      name: 'Dr. Christopher Davis',
      image: 'https://via.placeholder.com/150',
      speciality: 'General Physician',
      available: true
    },
    {
      _id: 'doc5',
      name: 'Dr. Jennifer Garcia',
      image: 'https://via.placeholder.com/150',
      speciality: 'General Physician',
      available: true
    }
  ];

  // Filter logic: Find doctors with same speciality, excluding current doctor
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [speciality, docId]);

  return (
    <div className="container py-5">
      
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Related Doctors</h2>
        <p className="text-secondary">Simply browse through our extensive list of trusted doctors.</p>
      </div>

      {/* Doctors Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {relDocs.length > 0 ? (
          relDocs.slice(0, 5).map((item, index) => (
            <div 
              key={index} 
              onClick={() => { 
                navigate(`/appointment/${item._id}`); 
                window.scrollTo(0, 0); // Scroll to top when switching doctors
              }}
              className="col"
            >
              <div className="card h-100 border-0 shadow-sm cursor-pointer hover-up transition-all" style={{ cursor: 'pointer' }}>
                
                {/* Doctor Image */}
                <div className="bg-light d-flex justify-content-center align-items-end" style={{ height: '220px' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="img-fluid" 
                    style={{ maxHeight: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body p-3">
                  {/* Availability Indicator */}
                  <div className={`d-flex align-items-center gap-2 mb-2 ${item.available ? 'text-success' : 'text-danger'}`}>
                    <div className={`rounded-circle ${item.available ? 'bg-success' : 'bg-danger'}`} style={{ width: '8px', height: '8px' }}></div>
                    <small className="fw-bold">{item.available ? 'Available' : 'Not Available'}</small>
                  </div>

                  <h5 className="card-title fw-bold text-dark mb-1">{item.name}</h5>
                  <p className="card-text text-secondary small">{item.speciality}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No related doctors found for this speciality.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;