const LabTest = require('../models/LabTest');

// Create a new lab test
exports.createLabTest = async (req, res) => {
  try {
    const labTest = new LabTest(req.body);
    await labTest.save();
    res.status(201).json(labTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all lab tests
exports.getLabTests = async (req, res) => {
  try {
    const labTests = await LabTest.find();
    res.json(labTests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a lab test
exports.updateLabTest = async (req, res) => {
  try {
    const updatedLabTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLabTest) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedLabTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a lab test
exports.deleteLabTest = async (req, res) => {
  try {
    const deletedLabTest = await LabTest.findByIdAndDelete(req.params.id);
    if (!deletedLabTest) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Lab Test deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};