// routes/admin.js
const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');
const SiteContent = require('../models/SiteContent');

// 🔁 [POST] Update withdrawal status (approve/reject)
router.post('/withdrawal/status', async (req, res) => {
  const { withdrawalId, status, adminId } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) return res.status(404).json({ message: 'Withdrawal not found' });

    withdrawal.status = status;
    withdrawal.reviewedAt = new Date();
    withdrawal.reviewedBy = adminId;
    await withdrawal.save();

    res.json({ message: `Withdrawal marked as ${status}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update withdrawal status' });
  }
});

// ✍️ [POST] Update static site content
router.post('/site-content', async (req, res) => {
  const { type, content } = req.body;

  if (!['about', 'support', 'legal', 'community'].includes(type)) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  try {
    const existing = await SiteContent.findOne({ type });

    if (existing) {
      existing.content = content;
      await existing.save();
    } else {
      await SiteContent.create({ type, content });
    }

    res.json({ message: `${type} content updated.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

module.exports = router;
