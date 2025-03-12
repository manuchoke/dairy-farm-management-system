const Vaccination = require('../models/Vaccination');

// Create a new vaccination record
exports.createVaccination = async (req, res) => {
  try {
    const vaccination = new Vaccination(req.body);
    await vaccination.save();
    res.status(201).json(vaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vaccination records
exports.getVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find();
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vaccination record
exports.updateVaccination = async (req, res) => {
  try {
    const updatedVaccination = await Vaccination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVaccination) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedVaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vaccination record
exports.deleteVaccination = async (req, res) => {
  try {
    const deletedVaccination = await Vaccination.findByIdAndDelete(req.params.id);
    if (!deletedVaccination) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Vaccination deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};