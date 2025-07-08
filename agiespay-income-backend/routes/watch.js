// routes/watch.js
const express = require('express');
const router = express.Router();
const WatchAd = require('../models/WatchAd');
const WatchView = require('../models/WatchView');

// 🎬 [GET] Fetch all video ads
router.get('/watch-ads', async (req, res) => {
  try {
    const ads = await WatchAd.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch video ads' });
  }
});

// 👁️ [POST] Track view
router.post('/track-watch', async (req, res) => {
  const { userId, adId } = req.body;

  try {
    const alreadyWatched = await WatchView.findOne({ userId, adId });
    if (alreadyWatched) {
      return res.status(400).json({ error: 'Ad already watched' });
    }

    await WatchView.create({ userId, adId });
    res.json({ message: '🎉 Watch recorded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not track watch' });
  }
});

module.exports = router;
