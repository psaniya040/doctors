const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
    },
    phone_number: { type: String },
    password: { type: String, required: true, minlength: 6 },
    medical_history: { type: String, default: '' },
    allergies: { type: [String], default: [] },
    medications: { type: [String], default: [] },
    insurance_information: { 
      provider: { type: String }, 
      policy_number: { type: String } 
    },
    uploaded_documents: { type: [String], default: [] }
  },
  { 
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password; // hide password when sending JSON
        return ret;
      }
    }
  }
);

// Hash password before saving
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;