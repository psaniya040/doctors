
import React, { useState } from 'react';

const EPrescriptionForm = ({ patientId, doctorName }) => {
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [refills, setRefills] = useState(0);
    const [pharmacy, setPharmacy] = useState('');

    const handlePrescribe = (e) => {
        e.preventDefault();

        if (!medication || !dosage || !pharmacy) {
            alert('Please fill in all required fields: Medication, Dosage, and Pharmacy.');
            return;
        }

        
        const prescriptionData = {
            patientId,
            doctor: doctorName,
            medication,
            dosage,
            refills,
            pharmacy
        };

        
        console.log('Sending prescription data:', prescriptionData);
        alert(`Prescription for ${medication} successfully sent to ${pharmacy}.`);

        
        setMedication('');
        setDosage('');
        setRefills(0);
        setPharmacy('');
    };

    return (
        <div className="card shadow p-4 my-5 prescription-form">
            <h2 className="card-title text-success mb-4">
                <i className="bi bi-file-medical me-2"></i> 
                Electronic Prescription
            </h2>
            <form onSubmit={handlePrescribe}>
                <div className="mb-3">
                    <label htmlFor="medication" className="form-label fw-bold">Medication Name</label>
                    <input type="text" className="form-control" id="medication" value={medication} onChange={(e) => setMedication(e.target.value)} required />
                </div>
                
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="dosage" className="form-label fw-bold">Dosage Instructions</label>
                        <input type="text" className="form-control" id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="refills" className="form-label fw-bold">Refills Allowed</label>
                        <input type="number" className="form-control" id="refills" value={refills} min="0" onChange={(e) => setRefills(parseInt(e.target.value))} />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="pharmacy" className="form-label fw-bold">Pharmacy Preference / Integration</label>
                    <select className="form-select" id="pharmacy" value={pharmacy} onChange={(e) => setPharmacy(e.target.value)} required>
                        <option value="">Select Pharmacy</option>
                        
                        <option value="CVS-Integration">CVS Pharmacy (Integrated)</option>
                        <option value="Walgreens-Integration">Walgreens (Integrated)</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Send Electronic Prescription
                </button>
            </form>
        </div>
    );
};

export default EPrescriptionForm;