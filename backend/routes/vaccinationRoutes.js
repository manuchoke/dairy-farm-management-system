const express = require('express');
const router = express.Router();
const {
  createVaccination,
  getVaccinations,
  updateVaccination,
  deleteVaccination,
} = require('../controllers/vaccinationController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, createVaccination); // Create a new vaccination record
router.get('/', protect, getVaccinations); // Get all vaccination records
router.put('/:id', protect, updateVaccination); // Update a vaccination record
router.delete('/:id', protect, deleteVaccination); // Delete a vaccination record

module.exports = router;