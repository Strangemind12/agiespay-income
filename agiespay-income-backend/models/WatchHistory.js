// models/WatchHistory.js
const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WatchAd',
    required: true,
  },
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WatchHistory', watchHistorySchema);
