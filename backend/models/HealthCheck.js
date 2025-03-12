const mongoose = require('mongoose');

const healthCheckSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
  bodyConditionScore: { type: Number, required: true },
  vetNotes: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthCheck', healthCheckSchema);