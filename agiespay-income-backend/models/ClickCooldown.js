const mongoose = require('mongoose');

const clickCooldownSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  adId: { type: String, required: true },
  adType: { type: String, required: true, enum: ['clicktoearn', 'watchad', 'shortlink'] },
  lastClickedAt: { type: Date, default: null },
});

clickCooldownSchema.index({ userId: 1, adId: 1, adType: 1 }, { unique: true });

module.exports = mongoose.model('ClickCooldown', clickCooldownSchema);
