const ReproductiveHealth = require('../models/ReproductiveHealth');

// Create a new reproductive health record
exports.createReproductiveHealth = async (req, res) => {
  try {
    const reproductiveHealth = new ReproductiveHealth(req.body);
    await reproductiveHealth.save();
    res.status(201).json(reproductiveHealth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reproductive health records
exports.getReproductiveHealths = async (req, res) => {
  try {
    const reproductiveHealths = await ReproductiveHealth.find();
    res.json(reproductiveHealths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reproductive health record
exports.updateReproductiveHealth = async (req, res) => {
  try {
    const updatedReproductiveHealth = await ReproductiveHealth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReproductiveHealth) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedReproductiveHealth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a reproductive health record
exports.deleteReproductiveHealth = async (req, res) => {
  try {
    const deletedReproductiveHealth = await ReproductiveHealth.findByIdAndDelete(req.params.id);
    if (!deletedReproductiveHealth) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Reproductive Health deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};