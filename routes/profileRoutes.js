import express from 'express';
import {
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/profileController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);
router.post('/change-password', authenticateToken, changePassword);

export default router;
