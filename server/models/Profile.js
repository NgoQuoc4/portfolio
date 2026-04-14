import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  avatar_url: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  about_text_1: { type: String, required: true },
  about_text_2: { type: String },
  skills: { type: [String], default: [] }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
