// routes/admin-watch.js
const express = require('express');
const router = express.Router();
const WatchAd = require('../models/WatchAd');

// 🔧 [POST] Add new video ad
router.post('/watch-ad', async (req, res) => {
  const { title, videoUrl, reward, duration } = req.body;

  if (!title || !videoUrl || !reward || !duration) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newAd = await WatchAd.create({
      title,
      videoUrl,
      reward,
      duration,
    });

    res.json({ message: 'Watch ad added successfully', ad: newAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add ad' });
  }
});

// 🗑️ [DELETE] Remove video ad by ID
router.delete('/watch-ad/:id', async (req, res) => {
  try {
    await WatchAd.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ad deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete ad' });
  }
});

// 📜 [GET] All video ads
router.get('/watch-ads', async (req, res) => {
  try {
    const ads = await WatchAd.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch watch ads' });
  }
});

module.exports = router;
