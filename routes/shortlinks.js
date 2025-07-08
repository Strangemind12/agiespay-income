// routes/shortlinks.js
const express = require('express');
const router = express.Router();
const ShortlinkClick = require('../models/ShortlinkClick');

// 📄 [GET] All shortlink ads (public)
router.get('/shortlinks', async (req, res) => {
  try {
    const links = [
      { id: 1, title: 'ShrinkEarn', reward: 25, url: 'https://shrinke.me/xyz123' },
      { id: 2, title: 'Exe.io Link', reward: 20, url: 'https://exe.io/abc456' },
      { id: 3, title: 'Adfly Promo', reward: 15, url: 'https://adf.ly/654321' },
    ];

    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch shortlinks' });
  }
});

// 🖱️ [POST] Track click by user
router.post('/click-shortlink', async (req, res) => {
  const { userId, linkId } = req.body;

  try {
    const alreadyClicked = await ShortlinkClick.findOne({ userId, linkId });
    if (alreadyClicked) {
      return res.status(400).json({ error: 'Link already clicked' });
    }

    await ShortlinkClick.create({
      userId,
      linkId,
      clickedAt: new Date(),
    });

    res.json({ message: 'Shortlink click recorded ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not record click' });
  }
});

module.exports = router;
