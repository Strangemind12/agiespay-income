const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');
const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');

// POST /withdraw-request with logging
router.post('/withdraw-request', [
  body('userId').notEmpty(),
  body('method').isIn(['FaucetPay', 'Bybit', 'Bitget']),
  body('walletUID').isLength({ min: 3 }),
  body('amount').isNumeric(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, method, walletUID, amount } = req.body;

    await Withdrawal.create({
      userId,
      method,
      walletUID,
      amount,
      status: 'pending',
    });

    logger.info(`Withdrawal request from ${userId} for ${amount} via ${method}`);
    res.json({ message: 'Withdrawal request submitted.' });

  } catch (err) {
    logger.error(`Withdrawal DB error: ${err.message}`);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
