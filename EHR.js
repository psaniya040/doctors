
const mongoose = require('mongoose');

const ehrRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'EHR must be linked to a patient.']
  },
  recordedByDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'EHR entry must be attributed to a doctor.']
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  },
  recordType: {
    type: String,
    enum: ['History', 'Lab Report', 'Diagnosis', 'Treatment Plan', 'Progress Note'],
    required: [true, 'Type of EHR record is required.']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    required: [true, 'Record content details are required.']
  },
  documentUrls: {
    type: [String],
    default: [],
    validate: {
      validator: function(urls) {
        return urls.every(url => /^https?:\/\/.+/.test(url));
      },
      message: 'All document URLs must be valid.'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'finalized', 'amended'],
    default: 'finalized'
  },
  hl7_compliance_id: {
    type: String,
    default: null,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Indexes
ehrRecordSchema.index({ patient: 1, recordType: 1, createdAt: -1 });
ehrRecordSchema.index({ recordedByDoctor: 1 });
ehrRecordSchema.index({ appointment: 1 });

module.exports = mongoose.model('EHRRecord', ehrRecordSchema);