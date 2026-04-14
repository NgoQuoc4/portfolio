import Profile from '../models/Profile.js';

// @desc    Lấy thông tin profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile) {
      res.json(profile);
    } else {
      res.json(null); // Không có dữ liệu thì trả về null
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy profile' });
  }
};

// @desc    Cập nhật hoặc tạo profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, title, avatar_url, location, email, phone, about_text_1, about_text_2, skills } = req.body;

    let profile = await Profile.findOne();

    if (profile) {
      // Cập nhật
      profile.name = name || profile.name;
      profile.title = title || profile.title;
      profile.avatar_url = avatar_url || profile.avatar_url;
      profile.location = location || profile.location;
      profile.email = email || profile.email;
      profile.phone = phone || profile.phone;
      profile.about_text_1 = about_text_1 || profile.about_text_1;
      profile.about_text_2 = about_text_2 !== undefined ? about_text_2 : profile.about_text_2;
      profile.skills = skills || profile.skills;

      const updatedProfile = await profile.save();
      return res.json(updatedProfile);
    } else {
      // Tạo mới nếu chưa có
      const newProfile = await Profile.create({
        name,
        title,
        avatar_url,
        location,
        email,
        phone,
        about_text_1,
        about_text_2,
        skills
      });
      return res.status(201).json(newProfile);
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật profile', error: error.message });
  }
};
