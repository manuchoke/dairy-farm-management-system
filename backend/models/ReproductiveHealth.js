const mongoose = require('mongoose');

const reproductiveHealthSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  breedingDate: { type: Date, required: true },
  pregnancyCheckDate: { type: Date },
  result: { type: String },
  calvingDate: { type: Date },
  postPartumHealthStatus: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReproductiveHealth', reproductiveHealthSchema);