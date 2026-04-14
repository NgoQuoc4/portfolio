import express from 'express';
import { createMessage, getMessages, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(protect, getMessages);

router.route('/:id')
  .delete(protect, deleteMessage);

export default router;
