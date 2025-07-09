// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const helmet = require('helmet');
const compression = require('compression');
const rateLimiter = require('./middleware/rateLimiter');
const path = require('path');

dotenv.config();
const app = express();

app.use(helmet());               // 🔐 Secure HTTP headers
app.use(cors());                 // 🌐 Cross-Origin Resource Sharing
app.use(express.json());         // Parse JSON bodies
app.use(compression());          // Compress responses for speed
app.use(rateLimiter);            // 🛡️ Global rate limiting

// If behind proxy/load balancer, trust it for HTTPS detection
app.enable('trust proxy');

// Redirect HTTP → HTTPS
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

connectDB();

// Route imports
const walletRoutes = require('./routes/wallet');
const ptcRoutes = require('./routes/ptc');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');
const clickTrackRoutes = require('./routes/clickTrack');    // <-- NEW
const cooldownRoutes = require('./routes/cooldowns');       // <-- NEW

// Routes with middleware where needed
app.use('/api', walletRoutes);
app.use('/api', ptcRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api', clickTrackRoutes);
app.use('/api', cooldownRoutes);

// Serve React build files statically from frontend/dist
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// For any route NOT handled by your API routes, send back index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
