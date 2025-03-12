const HealthCheck = require('../models/HealthCheck');

// Create a new health check record
exports.createHealthCheck = async (req, res) => {
  try {
    const healthCheck = new HealthCheck(req.body);
    await healthCheck.save();
    res.status(201).json(healthCheck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all health check records
exports.getHealthChecks = async (req, res) => {
  try {
    const healthChecks = await HealthCheck.find();
    res.json(healthChecks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a health check record
exports.updateHealthCheck = async (req, res) => {
  try {
    const updatedHealthCheck = await HealthCheck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHealthCheck) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedHealthCheck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a health check record
exports.deleteHealthCheck = async (req, res) => {
  try {
    const deletedHealthCheck = await HealthCheck.findByIdAndDelete(req.params.id);
    if (!deletedHealthCheck) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Health Check deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};