const router = require('express').Router();

router.get('/availability', async (req, res) => {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
        return res.status(400).send({ message: 'Doctor ID and Date are required.' });
    }

    try {
        const openSlots = [
            '10:00 AM',
            '11:00 AM',
            '02:00 PM',
            '03:00 PM'
        ];

        res.status(200).send({ date, doctorId, openSlots });
    } catch (error) {
        console.error('Fetch Availability Error:', error);
        res.status(500).send({ message: 'Failed to fetch doctor availability.' });
    }
});

router.post('/book', async (req, res) => {
    const { doctorId, patientId, date, timeSlot } = req.body;
    
    if (!doctorId || !patientId || !date || !timeSlot) {
        return res.status(400).send({ message: 'Missing booking details.' });
    }
try {
        const consultationLink = https//secure.video.clinic/call/${Math.random().toString(36).substring(2, 10)};

        res.status(201).send({ 
            message: 'Appointment successfully scheduled.', 
            appointmentDetails: { date, timeSlot, doctorId, link: consultationLink }
        });

    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).send({ message: 'Failed to schedule appointment. Slot may be taken.' });
    }
});

module.exports = router;