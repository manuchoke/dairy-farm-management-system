const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  date: { type: Date, required: true },
  typeOfTest: { type: String, required: true },
  results: { type: String, required: true },
  followUpActions: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LabTest', labTestSchema);