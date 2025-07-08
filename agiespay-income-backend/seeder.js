// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SiteContent = require('./models/SiteContent');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const defaultContent = [
  {
    type: 'about',
    content: 'Welcome to Agiespay Income — your one-stop destination for earning crypto by completing simple tasks. 🚀'
  },
  {
    type: 'support',
    content: 'For support, contact us via email at support@agiespay.income or join our Telegram community.'
  },
  {
    type: 'legal',
    content: 'Agiespay Income is a reward-based platform. Use at your own risk. Read our terms carefully before participation.'
  },
  {
    type: 'community',
    content: 'Respect everyone. No spam. No self-promotion. Violators will be banned. ✅'
  }
];

const seedContent = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔌 Connected to MongoDB');

    for (const item of defaultContent) {
      const exists = await SiteContent.findOne({ type: item.type });
      if (!exists) {
        await SiteContent.create(item);
        console.log(`✅ Seeded: ${item.type}`);
      } else {
        console.log(`⏭ Skipped (already exists): ${item.type}`);
      }
    }

    console.log('🌱 Content seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedContent();
