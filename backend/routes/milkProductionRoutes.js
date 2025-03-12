const express = require("express");
const router = express.Router();
const {
  addMilkProduction,
  getMilkRecordsByDate,
  getAllMilkRecords,
  getMilkProductionData,
  updateMilkProduction,
  deleteMilkProduction
} = require("../controllers/milkProductionController");
const MilkProduction = require("../models/MilkProduction");
const { protect } = require('../middleware/authMiddleware');
// Add a new milk production record
router.post("/", protect, addMilkProduction);

// Get milk production records by date
router.get("/by-date", protect, getMilkRecordsByDate);

// Get all milk production records
router.get("/all", protect, getAllMilkRecords);

// Get milk production data (optional route)
router.get("/data", protect, getMilkProductionData);

// Update route for editing a record
router.put("/:id", protect, updateMilkProduction);

// Delete route for removing a record
router.delete("/:id", protect, deleteMilkProduction);

module.exports = router;