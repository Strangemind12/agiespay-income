// models/Withdrawal.js
const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  method: { type: String, required: true }, // FaucetPay, Bybit, etc.
  walletUID: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  requestedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  reviewedBy: { type: String }, // Admin email or ID
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
