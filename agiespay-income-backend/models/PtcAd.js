// models/PtcAd.js
const mongoose = require('mongoose');

const ptcAdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: {
    type: String,
    required: true,
  },
  reward: {
    type: Number,
    required: true,
    default: 10,
  },
  duration: {
    type: String,
    default: '10s',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('PtcAd', ptcAdSchema);
