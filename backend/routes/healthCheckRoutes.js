const express = require('express');
const router = express.Router();
const {
  createHealthCheck,
  getHealthChecks,
  updateHealthCheck,
  deleteHealthCheck,
} = require('../controllers/healthCheckController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createHealthCheck); // Create a new health check record
router.get('/', protect, getHealthChecks); // Get all health check records
router.put('/:id', protect, updateHealthCheck); // Update a health check record
router.delete('/:id', protect, deleteHealthCheck); // Delete a health check record

module.exports = router;