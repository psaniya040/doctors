import React, { useState } from 'react';

function PatientRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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
                setMessage(data.message || 'Registration successful!');
                setFormData({ name: '', email: '', phone: '', password: '' }); // reset form
            } else {
                setMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Patient Registration</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Phone Number:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
}

export default PatientRegistration;