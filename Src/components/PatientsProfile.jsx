
import React, { useState } from 'react';

const PatientProfile = () => {
    
    const [profileData, setProfileData] = useState({
        name: 'Nahid Afrin',
        insuranceProvider: '',
        medicalHistory: '', 
        allergies: '',
        medications: '',
    });

    
    const [documents, setDocuments] = useState([]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleDocumentUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocuments([...documents, ...files.map(f => f.name)]);
        console.log(`Document upload attempted for files: ${files.map(f => f.name).join(', ')}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Patient profile updated successfully!'); 
        alert('Profile saved!');
    };

    return (
        <div className="container my-5">
            <h2 className="text-primary mb-4">Patient Profile & Medical History</h2>
            <form onSubmit={handleSubmit}>
                
                {}
                <div className="card shadow-sm p-4 mb-4">
                    <h3 className="h5 text-info">Personal and Insurance Information</h3>
                    <p className="text-muted">Update personal details and insurance information[span_2](end_span).</p>
                    {}
                    <div className="mb-3">
                        <label htmlFor="insuranceProvider" className="form-label">Insurance Provider</label>
                        <input
                            type="text"
                            className="form-control"
                            id="insuranceProvider"
                            name="insuranceProvider"
                            value={profileData.insuranceProvider}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {}
                <div className="card shadow-sm p-4 mb-4">
                    <h3 className="h5 text-danger">Medical History (Required for Consultations)</h3>
                    <p className="text-muted">Complete your profile with medical history, allergies, and medications[span_3](end_span).</p>
                    <div className="mb-3">
                        <label htmlFor="medicalHistory" className="form-label">Medical History / Past Conditions</label>
                        <textarea
                            className="form-control"
                            id="medicalHistory"
                            name="medicalHistory"
                            rows="3"
                            value={profileData.medicalHistory}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="allergies" className="form-label">Allergies</label>
                        <input type="text" className="form-control" id="allergies" name="allergies" value={profileData.allergies} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="medications" className="form-label">Current Medications</label>
                        <input type="text" className="form-control" id="medications" name="medications" value={profileData.medications} onChange={handleChange} />
                    </div>
                </div>
                
                {}
                <div className="card shadow-sm p-4 mb-4">
                    <h3 className="h5 text-secondary">Document Management</h3>
                       <p className="text-muted">Upload documents (e.g., ID, insurance card)[span_4](end_span).</p>
                    <div className="mb-3">
                        <label htmlFor="documentUpload" className="form-label">Upload Documents</label>
                        <input
                            type="file"
                            className="form-control"
                            id="documentUpload"
                            multiple
                            onChange={handleDocumentUpload}
                        />
                    </div>
                    {documents.length > 0 && (
                        <div className="mt-2">
                            <p>Uploaded Files: {documents.join(', ')}</p>
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100">
                    Save Profile Updates
                </button>
            </form>
        </div>
    );
};

export default PatientProfile;