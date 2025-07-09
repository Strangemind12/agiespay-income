// backend/middleware/checkUserStatus.js
const User = require('../models/User');

module.exports = async function checkUserStatus(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id; // adjust based on your auth middleware
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isBanned) {
      return res.status(403).json({ message: 'Access denied: User is banned.' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Access denied: User is blocked.' });
    }

    next();
  } catch (err) {
    console.error('checkUserStatus error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
