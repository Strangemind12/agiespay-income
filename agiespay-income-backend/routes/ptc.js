const express = require('express');
const router = express.Router();
const detectSuspiciousUser = require('../middleware/detectSuspiciousUser');
const verifyCaptcha = require('../middleware/verifyCaptcha');

const ads = [
  { id: 1, title: "Crypto Faucet Site", reward: 20, duration: "10s", url: "https://example.com" },
  { id: 2, title: "Airdrop Token Project", reward: 15, duration: "8s", url: "https://example.com" },
  { id: 3, title: "Investment Promo", reward: 25, duration: "12s", url: "https://example.com" },
  { id: 4, title: "Online Survey Portal", reward: 10, duration: "6s", url: "https://example.com" },
];

// --------------------------------------------
// 🧠 PTC Ads - Publicly fetchable
// --------------------------------------------
router.get('/ptc-ads', (req, res) => {
  res.json(ads);
});

// --------------------------------------------
// 📡 Track Clicks (basic logging or analytics)
// --------------------------------------------
router.post('/click-track', (req, res) => {
  const { userId, adId, clickedAt } = req.body;

  if (!userId || !adId) {
    return res.status(400).json({ error: 'Missing userId or adId' });
  }

  console.log(`✅ Click recorded: user ${userId} clicked ad ${adId} at ${clickedAt}`);
  // Optional: Save to Supabase or MongoDB here

  res.json({ message: 'Click recorded successfully' });
});

// --------------------------------------------
// 💥 Claim Click Reward — now guarded
// --------------------------------------------
router.post('/ptc/claim-click', detectSuspiciousUser, async (req, res, next) => {
  // 🚨 If suspicious, validate CAPTCHA before proceeding
  if (req.suspicious) {
    return verifyCaptcha(req, res, next);
  }
  next();
}, async (req, res) => {
  const { userId, adId } = req.body;

  if (!userId || !adId) {
    return res.status(400).json({ error: 'Missing userId or adId' });
  }

  // TODO: Check cooldowns, prevent farming, award tokens etc.
  // await awardReward(userId, adId);

  console.log(`🎯 Reward granted to user ${userId} for ad ${adId}`);
  res.json({ message: 'Click reward granted.' });
});

module.exports = router;
