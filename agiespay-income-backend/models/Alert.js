// backend/models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true }, // e.g. 'unusual_activity', 'ban_attempt'
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Alert', alertSchema);
