const express = require('express');
const router = express.Router();

// Example in-memory cooldown store (replace with DB in prod)
const userCooldowns = {
  'user123': {
    'clicktoearn-ad1': new Date().toISOString(),
    'watchad-ad2': new Date().toISOString(),
  },
  // add more users here
};

router.get('/user/:userId/cooldowns', (req, res) => {
  const { userId } = req.params;

  // Lookup cooldowns for userId or empty object
  const cooldowns = userCooldowns[userId] || {};

  res.json(cooldowns);
});

module.exports = router;
