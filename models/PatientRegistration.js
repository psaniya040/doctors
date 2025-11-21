import React, { useState } from 'react';

function PatientRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Registering...');
        try {
            const response = await fetch('/api/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg || 'Registration successful!');
                
            } else {
                setMessage(data.msg || 'Registration failed.');
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
        }
    };
 return (
        <form onSubmit={handleSubmit}>
            <h2>Patient Registration</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
}

export default PatientRegistration;