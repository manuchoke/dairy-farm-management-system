const express = require('express');
const router = express.Router();
const {
  createLabTest,
  getLabTests,
  updateLabTest,
  deleteLabTest,
} = require('../controllers/labTestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createLabTest); // Create a new lab test
router.get('/', protect, getLabTests); // Get all lab tests
router.put('/:id', protect, updateLabTest); // Update a lab test
router.delete('/:id', protect, deleteLabTest); // Delete a lab test

module.exports = router;