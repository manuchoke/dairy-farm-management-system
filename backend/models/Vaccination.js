const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  date: { type: Date, required: true },
  vaccine: { type: String, required: true },
  dosage: { type: String, required: true },
  nextDueDate: { type: Date, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);