const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Missing required fields.' });
    }

    try {

const newUserId = Math.floor(Math.random() * 1000) + 1; 

        res.status(201).send({ 
            message: 'Patient registered successfully.', 
            userId: newUserId 
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).send({ message: 'Failed to register patient.' });
    }
});