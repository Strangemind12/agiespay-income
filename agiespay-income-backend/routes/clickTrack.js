const express = require('express');
const router = express.Router();
const ClickCooldown = require('../models/ClickCooldown');

const COOLDOWN_MS = 10 * 1000; // 10 seconds cooldown

router.post('/click-track', async (req, res) => {
  const { userId, adId, adType } = req.body;
  const now = new Date();

  try {
    const cooldown = await ClickCooldown.findOne({ userId, adId, adType });

    if (cooldown && now - cooldown.lastClickedAt < COOLDOWN_MS) {
      return res.status(429).json({ error: `Please wait before clicking this ${adType} again.` });
    }

    if (cooldown) {
      cooldown.lastClickedAt = now;
      await cooldown.save();
    } else {
      await ClickCooldown.create({ userId, adId, adType, lastClickedAt: now });
    }

    // TODO: add your reward logic here

    res.json({ message: `Click on ${adType} registered, reward granted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register click' });
  }
});

module.exports = router;
