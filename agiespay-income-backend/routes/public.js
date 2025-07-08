// routes/public.js
const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');

// 🌐 [GET] Get specific content (about, support, legal, community)
router.get('/site-content/:type', async (req, res) => {
  const { type } = req.params;

  if (!['about', 'support', 'legal', 'community'].includes(type)) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  try {
    const content = await SiteContent.findOne({ type });
    if (!content) return res.status(404).json({ message: `${type} content not found.` });

    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching content' });
  }
});

module.exports = router;
