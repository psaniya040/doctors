const router = require('express').Router();


router.post('/', async (req, res) => {
    
    const { name, specialty, qualifications, experience, email } = req.body;

    if (!name || !specialty || !qualifications) {
        return res.status(400).send({ message: 'Name, specialty, and qualifications are required.' });
    }

    try {


        res.status(201).send({ 
            message: 'Doctor profile created successfully.', 
             
        });
    } catch (error) {
        console.error('Doctor Profile Save Error:', error);
        res.status(500).send({ message: 'Failed to save doctor profile.' });
    }
});


router.get('/', async (req, res) => {
    try {
        
        const doctors = [{
            id: 1, name: 'Dr. Smith', specialty: 'Cardiology', qualifications: 'MD, FACC', avg_rating: 4.8
        }]
        
        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch doctor list.' });
    }
});

module.exports = router;