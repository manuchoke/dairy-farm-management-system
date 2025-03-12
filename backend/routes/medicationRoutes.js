const express = require('express');
const router = express.Router();
const {
  createMedication,
  getMedications,
  updateMedication,
  deleteMedication,
} = require('../controllers/medicationController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, createMedication); // Create a new medication record
router.get('/', protect, getMedications); // Get all medication records
router.put('/:id', protect, updateMedication); // Update a medication record
router.delete('/:id', protect, deleteMedication); // Delete a medication record

module.exports = router;