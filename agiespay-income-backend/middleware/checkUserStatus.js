// backend/middleware/checkUserStatus.js
const User = require('../models/User');

module.exports = async function checkUserStatus(req, res, next) {
  try {
    const supabaseUserId = req.user?.id; // from authSupabase middleware

    if (!supabaseUserId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findOne({ supabaseId: supabaseUserId }); // make sure your User schema stores supabaseId

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isBanned) {
      return res.status(403).json({ message: 'Access denied: User is banned.' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Access denied: User is blocked.' });
    }

    req.userData = user; // attach Mongo user data for downstream handlers
    next();
  } catch (err) {
    console.error('checkUserStatus error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
