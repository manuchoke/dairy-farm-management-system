const express = require("express");
const router = express.Router();
const FeedManagement = require("../models/FeedManagement"); // Correct import
const { protect } = require('../middleware/authMiddleware');


// @route   GET /api/feed-management
// @desc    Fetch all feeds
router.get("/feed-management", protect, async (req, res) => {
  try {
    const feeds = await FeedManagement.find();
    res.json(feeds);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   POST /api/feed-management
// @desc    Add a new feed
router.post("/feed-management", protect, async (req, res) => {
  try {
    const { name, quantity, unit, cost, datePurchased } = req.body;
    const newFeed = new FeedManagement({ name, quantity, unit, cost, datePurchased });
    await newFeed.save();
    res.status(201).json(newFeed);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   PUT /api/feed-management/:id
// @desc    Update a feed by ID
router.put("/feed-management/:id", protect, async (req, res) => {
  try {
    const { name, quantity, unit, cost, datePurchased } = req.body;
    const feed = await FeedManagement.findById(req.params.id);
    
    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    feed.name = name;
    feed.quantity = quantity;
    feed.unit = unit;
    feed.cost = cost;
    feed.datePurchased = datePurchased;

    const updatedFeed = await feed.save();
    res.json(updatedFeed);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   DELETE /api/feed-management/:id
// @desc    Delete a feed by ID
router.delete("/feed-management/:id", protect, async (req, res) => {
  try {
    const feed = await FeedManagement.findById(req.params.id);
    if (!feed) return res.status(404).json({ message: "Feed not found" });

    await feed.deleteOne();
    res.json({ message: "Feed deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
