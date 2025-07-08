// agiespay-income-backend/routes/ptc.js
const express = require('express');
const router = express.Router();

const ads = [
  { id: 1, title: "Crypto Faucet Site", reward: 20, duration: "10s", url: "https://example.com" },
  { id: 2, title: "Airdrop Token Project", reward: 15, duration: "8s", url: "https://example.com" },
  { id: 3, title: "Investment Promo", reward: 25, duration: "12s", url: "https://example.com" },
  { id: 4, title: "Online Survey Portal", reward: 10, duration: "6s", url: "https://example.com" },
];

// GET /api/ptc-ads
router.get('/ptc-ads', (req, res) => {
  res.json(ads);
});

// POST /api/click-track
router.post('/click-track', (req, res) => {
  const { userId, adId, clickedAt } = req.body;

  if (!userId || !adId) {
    return res.status(400).json({ error: 'Missing userId or adId' });
  }

  console.log(`✅ Click recorded: user ${userId} clicked ad ${adId} at ${clickedAt}`);
  // Here you could store it in a DB or Supabase

  res.json({ message: 'Click recorded successfully' });
});

module.exports = router;
