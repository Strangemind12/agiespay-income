const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');
const SiteContent = require('../models/SiteContent');
const User = require('../models/User');
const Alert = require('../models/Alert');
const authAdmin = require('../middleware/authAdmin'); // Middleware that validates Supabase user as admin

// Protect all admin routes
router.use(authAdmin);

// ---------------------------------
// Withdrawal Management
// ---------------------------------
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

// ---------------------------------
// Static Site Content Management
// ---------------------------------
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

// ---------------------------------
// User Management (Ban, Unban, Block, Unblock, Delete)
// ---------------------------------

router.post('/ban/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isBanned: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Alert.create({ userId: user._id, type: 'ban', message: `User banned by admin ${req.user.email}` });

    res.json({ message: `User ${user.email} banned.` });
  } catch (err) {
    console.error('Ban error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/unban/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isBanned: false }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: `User ${user.email} unbanned.` });
  } catch (err) {
    console.error('Unban error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/block/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isBlocked: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Alert.create({ userId: user._id, type: 'block', message: `User blocked by admin ${req.user.email}` });

    res.json({ message: `User ${user.email} blocked.` });
  } catch (err) {
    console.error('Block error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/unblock/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isBlocked: false }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: `User ${user.email} unblocked.` });
  } catch (err) {
    console.error('Unblock error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Alert.create({ userId: user._id, type: 'delete', message: `User deleted by admin ${req.user.email}` });

    res.json({ message: `User ${user.email} deleted.` });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------------------------
// Alert Management for Admin Review
// ---------------------------------

router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    console.error('Alerts fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/alerts/:alertId/resolve', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.alertId, { resolved: true }, { new: true });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });

    res.json({ message: 'Alert marked as resolved.' });
  } catch (err) {
    console.error('Alert resolve error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
