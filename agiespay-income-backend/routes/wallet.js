// routes/wallet.js
const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');

// 📌 [GET] Get wallet balance
router.get('/user/:userId/balance', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // TODO: Replace with real DB logic or Supabase fetch
    const balance = 1500; // Temporary static value

    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

// 💸 [POST] Submit a withdrawal request
router.post('/withdraw-request', async (req, res) => {
  try {
    const { userId, method, walletUID, amount } = req.body;

    if (!userId || !method || !walletUID || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRequest = new Withdrawal({
      userId,
      method,
      walletUID,
      amount,
      status: 'pending',
      requestedAt: new Date(),
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
