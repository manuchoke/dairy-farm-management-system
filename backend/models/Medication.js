const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  date: { type: Date, required: true },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  method: { type: String, required: true },
  administeredBy: { type: String, required: true },
  notes: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medication', medicationSchema);