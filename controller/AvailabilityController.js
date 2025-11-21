

const Availability = require('./models/Availability'); 

const isValidTime = (time) => {
    return /^\d{2}:\d{2}$/.test(time);
};

const setDoctorAvailability = async (req, res) => {
    const doctorId = req.user ? req.user.id : '60c72b1f9e4c1a2e34d1f2a3'; 

    try {
        const { schedule } = req.body;

        if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
            return res.status(400).json({ message: 'Schedule must be a non-empty array of slots.' });
        }

        for (const slot of schedule) {
            if (!slot.day || !slot.startTime || !slot.endTime || !isValidTime(slot.startTime) || !isValidTime(slot.endTime)) {
                return res.status(400).json({ message: 'Each schedule slot requires a valid day, startTime, and endTime in HH:MM format.' });
            }
        }

        await Availability.deleteMany({ doctor: doctorId });

        const newSlots = schedule.map(slot => ({
            doctor: doctorId,
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime,
        }));

        const result = await Availability.insertMany(newSlots);

        res.status(201).json({
            success: true,
            message: 'Availability updated successfully.',
            data: result,
        });

    } catch (error) {
        console.error('Error setting doctor availability:', error);
        res.status(500).json({ message: 'Server error while setting availability.' });
    }
};

const getDoctorAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const availability = await Availability.find({ doctor: doctorId })
            .select('day startTime endTime -_id')
            .lean(); 

        if (!availability || availability.length === 0) {
            return res.status(404).json({ message: 'Doctor has no published availability.' });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor availability retrieved.',
            data: availability,
        });

    } catch (error) {
        console.error('Error fetching doctor availability:', error);
        res.status(500).json({ message: 'Server error while fetching availability.' });
    }
};

module.exports = {
    setDoctorAvailability,
    getDoctorAvailability,
};