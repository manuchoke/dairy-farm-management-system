const express = require('express');
const router = express.Router();
const { 
  processQuestion,
  getUserChatHistory
} = require('../controllers/dairyChatController');
const { protect } = require('../middleware/authMiddleware');

// Process a question
router.post('/dairy-chat/question', protect, processQuestion);

// Get user's chat history
router.get('/dairy-chat/history', protect,  getUserChatHistory);

module.exports = router; 