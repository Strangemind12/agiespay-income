// models/WatchView.js
const mongoose = require('mongoose');

const watchViewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  adId: {
    type: String,
    required: true,
  },
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WatchView', watchViewSchema);
