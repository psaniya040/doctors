const express = require('express');
const router = express.Router();

// Import Patient model and middleware
const Patient = require('../models/Patient'); 
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   PUT /api/patient/profile
 * @desc    Update logged-in patient's profile
 * @access  Private (Patient only)
 */
router.put('/profile', protect, async (req, res) => {
  const updates = req.body;

  try {
    const patient = await Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    // Update only allowed fields
    patient.medical_history = updates.medical_history || patient.medical_history;
    patient.allergies = updates.allergies || patient.allergies;
    patient.insurance_information = updates.insurance_information || patient.insurance_information;

    await patient.save();

    res.json({ msg: 'Profile updated successfully', patient });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error during profile update');
  }
});

module.exports = router;