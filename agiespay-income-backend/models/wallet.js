// routes/wallet.js
const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');

// 📌 [GET] Get wallet balance
router.get('/user/:userId/balance', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // TODO: Replace this with real wallet logic (e.g., DB lookup or calculation)
    const balance = 1500; // Dummy static balance

    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

// 💸 [POST] Submit a withdrawal request
router.post('/withdraw-request', async (req, res) => {
  try {
    const { userId, method, walletUID, amount } = req.body;

    const newRequest = new Withdrawal({
      userId,
      method,
      walletUID,
      amount,
      status: 'pending',
    });

    await newRequest.save();
    res.json({ message: 'Withdrawal request submitted.' });
  } catch (error) {
    res.status(500).json({ error: 'Withdrawal request failed' });
  }
});

// 📜 [GET] Get user withdrawal history
router.get('/user/:userId/withdrawals', async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ userId: req.params.userId }).sort({ requestedAt: -1 });
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
