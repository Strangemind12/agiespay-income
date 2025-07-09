const fetch = require('node-fetch');
const SUPABASE_SECRET = process.env.SUPABASE_CAPTCHA_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers['x-captcha-token'] || req.body.captchaToken;
  if (!token) return res.status(400).json({ error: 'Captcha token missing' });

  try {
    const response = await fetch('https://auth.supabase.io/v1/captcha/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: SUPABASE_SECRET,
        token: token,
      }),
    });

    const result = await response.json();
    if (result.success) {
      next(); // ✅ Human verified
    } else {
      res.status(403).json({ error: 'Captcha failed or invalid' });
    }
  } catch (err) {
    console.error('Captcha verify error:', err);
    res.status(500).json({ error: 'Captcha server error' });
  }
};
