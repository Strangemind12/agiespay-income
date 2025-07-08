// models/PtcClick.js
const mongoose = require('mongoose');

const ptcClickSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  adId: {
    type: String,
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PtcClick', ptcClickSchema);
