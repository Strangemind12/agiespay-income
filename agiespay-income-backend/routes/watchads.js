// routes/watchads.js
const express = require('express');
const router = express.Router();
const WatchAdClick = require('../models/WatchAdClick');

// 📺 [GET] Public: All video ads
router.get('/watchads', async (req, res) => {
  try {
    const ads = [
      { id: '1', title: 'Play & Earn NFT Game', reward: 40, videoUrl: 'https://youtube.com/embed/fake1' },
      { id: '2', title: 'Crypto Exchange Promo', reward: 30, videoUrl: 'https://youtube.com/embed/fake2' },
      { id: '3', title: 'Airdrop Explained', reward: 25, videoUrl: 'https://youtube.com/embed/fake3' },
    ];

    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch watch ads' });
  }
});

// 🖱️ [POST] Track watch click
router.post('/click-watchad', async (req, res) => {
  const { userId, adId } = req.body;

  try {
    const alreadyWatched = await WatchAdClick.findOne({ userId, adId });
    if (alreadyWatched) {
      return res.status(400).json({ error: 'Ad already watched' });
    }

    await WatchAdClick.create({
      userId,
      adId,
      watchedAt: new Date(),
    });

    res.json({ message: 'Watch ad click recorded ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not record watch click' });
  }
});

module.exports = router;
