// middleware/verifyCaptcha.js
const axios = require('axios');

module.exports = async function verifyCaptcha(req, res, next) {
  const captchaToken =
    req.headers['x-captcha-token'] || req.body?.captchaToken || null;

  if (!captchaToken) {
    return res.status(400).json({
      error: 'Suspicious behavior detected. Please verify CAPTCHA.',
    });
  }

  try {
    const response = await axios.post(
      'https://captcha.supabase.com/verify', // Assuming Supabase native CAPTCHA
      { token: captchaToken },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data.success) {
      return res.status(403).json({ error: 'Captcha verification failed' });
    }

    console.log('✅ CAPTCHA verified');
    next();
  } catch (err) {
    console.error('🛑 CAPTCHA verification error:', err.message);
    return res
      .status(500)
      .json({ error: 'Internal error during CAPTCHA verification' });
  }
};
