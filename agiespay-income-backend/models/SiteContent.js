// models/SiteContent.js
const mongoose = require('mongoose');

const SiteContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['about', 'support', 'legal', 'community'],
    required: true,
    unique: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // can store title, links, body, etc.
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', SiteContentSchema);
