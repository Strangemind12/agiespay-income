const cooldowns = {}; // You could move this to Redis or DB later

module.exports = function detectSuspiciousUser(req, res, next) {
  const userId = req.user?.id || req.body?.userId;
  const ip = req.ip;

  const key = `${userId || ip}`;
  const now = Date.now();

  // ⏱ Cooldown pattern: store recent actions in ms
  if (!cooldowns[key]) cooldowns[key] = [];
  cooldowns[key].push(now);

  // Only keep last 10 actions
  cooldowns[key] = cooldowns[key].slice(-10);

  // 📈 Analyze: too many actions in 10 sec = suspicious
  const recent = cooldowns[key].filter(ts => now - ts < 10000);
  
  if (recent.length >= 5) {
    // 👀 TOO FAST: suspicious!
    req.suspicious = true;
  }

  next();
};
