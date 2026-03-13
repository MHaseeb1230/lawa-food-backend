import pool from '../config/database.js';

// Get user cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.uid;

    const result = await pool.query(
      `SELECT c.*, p.name, p.price, p.image, p.description, p.stock 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching cart' 
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { productId, quantity } = req.body;

    // Check if product exists
    const productResult = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND is_available = true',
      [productId]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found or unavailable' 
      });
    }

    // Check if item already in cart
    const existingItem = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      const result = await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, userId, productId]
      );

      return res.json({
        success: true,
        message: 'Cart updated successfully',
        data: result.rows[0]
      });
    }

    // Add new item to cart
    const result = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding to cart' 
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await pool.query(
        'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
        [userId, productId]
      );

      return res.json({
        success: true,
        message: 'Item removed from cart'
      });
    }

    const result = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, userId, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating cart' 
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { productId } = req.params;

    const result = await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error removing from cart' 
    });
  }
};

// Clear user cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.uid;

    await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error clearing cart' 
    });
  }
};
