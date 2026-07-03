const express = require('express');
const router = express.Router();
const razorpayInstance = require('../config/razorpay');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const db = require('../config/db');

// Create Razorpay order (requires user authentication)
router.post('/create-order', auth(), async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// Verify Razorpay payment (requires user authentication)
router.post('/verify', auth(), async (req, res) => {
  const { order_id, payment_id, signature, purpose, ref_id } = req.body;
  try {
    // Signature verification
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + '|' + payment_id)
      .digest('hex');
      
    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature verification failed' });
    }

    // Fetch order details from Razorpay to get the actual amount securely
    const orderDetails = await razorpayInstance.orders.fetch(order_id);
    const amountInRupees = orderDetails.amount / 100;

    // Log the transaction in the database
    await db.query(
      'INSERT INTO payments (user_id, amount, currency, order_id, payment_id, status, purpose, ref_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, amountInRupees, 'INR', order_id, payment_id, 'completed', purpose || 'donation', ref_id]
    );

    // Optionally update DB based on purpose (adoption, daycare, donation)
    if (purpose === 'adoption' && ref_id) {
      await db.query('UPDATE adoptions SET status = ? WHERE id = ?', ['completed', ref_id]);
    } else if (purpose === 'daycare' && ref_id) {
      await db.query('UPDATE care_schedules SET status = ? WHERE id = ?', ['completed', ref_id]);
    }

    res.json({ message: 'Payment verified, logged, and updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
});

module.exports = router;
