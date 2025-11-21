const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String },
    password: { type: String, required: true },
    medical_history: { type: String, default: '' },
    allergies: { type: [String], default: [] },
    medications: { type: [String], default: [] },
    insurance_information: { 
        provider: String, 
        policy_number: String 
    },
    uploaded_documents: { type: [String], default: [] }
}, 
{ 
    timestamps: true 
});

patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;