import express from 'express';
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getUserCart);
router.post('/', authenticateToken, addToCart);
router.put('/', authenticateToken, updateCartItem);
router.delete('/:productId', authenticateToken, removeFromCart);
router.delete('/', authenticateToken, clearCart);

export default router;
