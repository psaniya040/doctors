import React, { useState } from 'react';

function PatientRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (formData.password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Patient Registration</h2>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="phone">Phone Number:</label>
            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} />

            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />

            <button type="submit" disabled={loading}>Register</button>
            <p>{message}</p>
        </form>
    );
}

export default PatientRegistration;