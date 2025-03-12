const express = require('express');
const router = express.Router();
const {
  createReproductiveHealth,
  getReproductiveHealths,
  updateReproductiveHealth,
  deleteReproductiveHealth,
} = require('../controllers/reproductiveHealthController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, createReproductiveHealth); // Create a new reproductive health record
router.get('/', protect, getReproductiveHealths); // Get all reproductive health records
router.put('/:id', protect, updateReproductiveHealth); // Update a reproductive health record
router.delete('/:id', protect, deleteReproductiveHealth); // Delete a reproductive health record

module.exports = router;