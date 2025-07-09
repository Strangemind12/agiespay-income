const express = require('express');
const router = express.Router();
const ClickCooldown = require('../models/ClickCooldown');

router.get('/user/:userId/cooldowns', async (req, res) => {
  try {
    const cooldowns = await ClickCooldown.find({ userId: req.params.userId });
    const result = {};
    cooldowns.forEach(c => {
      result[`${c.adType}-${c.adId}`] = c.lastClickedAt;
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cooldowns' });
  }
});

module.exports = router;
