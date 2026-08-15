import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  const username = process.argv[2] || process.env.ADMIN_USERNAME || 'admin';
  const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'admin123';

  if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is missing in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');

    let user = await User.findOne({ username });
    if (user) {
      user.password = password;
      await user.save();
      console.log(`✓ Admin user "${username}" updated with new password.`);
    } else {
      user = new User({ username, password });
      await user.save();
      console.log(`✓ Admin user "${username}" created successfully.`);
    }

    console.log(`Login credentials -> Username: ${username} | Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin:', error);
    process.exit(1);
  }
};

seedAdmin();
