
import React, { useState, useEffect } from 'react';

const sampleDoctorAvailability = {
    '2025-12-15': ['09:00', '10:00', '11:00', '14:00', '15:00'],
    '2025-12-16': ['09:30', '10:30', '11:30'],
    '2025-12-17': ['13:00', '14:00', '15:00', '16:00'],
    
};

const AppointmentScheduler = ({ doctorId, doctorName }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);


    useEffect(() => {
        if (selectedDate) {
        
            const slots = sampleDoctorAvailability[selectedDate] || [];
            setAvailableSlots(slots);
            setSelectedTime(null); 
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate, doctorId]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setIsConfirmed(false);
    };

    const handleBookAppointment = () => {
        if (selectedDate && selectedTime) {
            setIsConfirmed(true);
            
            console.log(`Appointment booked for Dr. ${doctorName} on ${selectedDate} at ${selectedTime}.`);
        } else {
            alert('Please select a date and time slot.');
        }
    };

    return (
        <div className="card shadow p-4 appointment-scheduler">
            <h2 className="card-title text-center text-primary mb-4">
                <i className="bi bi-calendar-check me-2"></i> 
                Schedule Appointment with Dr. {doctorName}
            </h2>
            
            {!isConfirmed ? (
                <>
                    {}
                    <div className="mb-4">
                        <label htmlFor="appointment-date" className="form-label fw-bold">1. Select a Date</label>
                        <input
                            type="date"
                            id="appointment-date"
                            className="form-control"
                            min={new Date().toISOString().split('T')[0]} 
                            onChange={handleDateChange}
                        />
                    </div>

                    {}
                    {selectedDate && (
                        <div className="mb-4">
                            <label className="form-label fw-bold">2. Choose an Available Slot</label>
                            <div className="d-flex flex-wrap gap-2">
                                {availableSlots.length > 0 ? (
                                    availableSlots.map(slot => (
                                        <button
                                            key={slot}
                                            className={`btn ${selectedTime === slot ? 'btn-success' : 'btn-outline-primary'}`}
                                            onClick={() => setSelectedTime(slot)}
                                        >
                                            {slot}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-muted">No slots available for {selectedDate}.</p>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {}
                    <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={handleBookAppointment}
                        disabled={!selectedDate || !selectedTime}
                    >
                        Book Appointment
                    </button>
                </>
            ) : (
                <div className="alert alert-success text-center" role="alert">
                    <h4 className="alert-heading">Appointment Confirmed!</h4>
                    <p>Your consultation with Dr. {doctorName} is scheduled for 
                    **{selectedDate} at {selectedTime}**.</p>
                    <hr />
                    [span_1](start_span)<p className="mb-0">A reminder will be sent to you via email/SMS[span_1](end_span).</p>
                </div>
            )}
        </div>
    );
};

export default AppointmentScheduler;