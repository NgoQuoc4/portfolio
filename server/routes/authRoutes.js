import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);

export default router;
