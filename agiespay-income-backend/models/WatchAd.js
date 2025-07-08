// models/WatchAd.js
const mongoose = require('mongoose');

const watchAdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  reward: {
    type: Number,
    default: 10,
  },
  duration: {
    type: Number, // in seconds
    default: 15,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('WatchAd', watchAdSchema);
