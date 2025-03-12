const Medication = require('../models/Medication');

// Create a new medication record
exports.createMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all medication records
exports.getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a medication record
exports.updateMedication = async (req, res) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMedication) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedMedication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a medication record
exports.deleteMedication = async (req, res) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete(req.params.id);
    if (!deletedMedication) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Medication deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};