const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ['FaucetPay', 'Bybit', 'Bitget'],
    required: true,
  },
  walletUID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
