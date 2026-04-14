import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProfile)
  .put(protect, updateProfile); // Yêu cầu xác thực mới được update

export default router;
