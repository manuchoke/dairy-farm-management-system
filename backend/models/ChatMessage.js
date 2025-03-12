const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [{
    id: Number,
    text: String,
    sender: {
      type: String,
      enum: ['user', 'ai']
    },
    timestamp: String
  }],
  lastInteraction: {
    type: Date,
    default: Date.now
  }
});

// Update lastInteraction timestamp before saving
chatMessageSchema.pre('save', function(next) {
  this.lastInteraction = new Date();
  next();
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema); 