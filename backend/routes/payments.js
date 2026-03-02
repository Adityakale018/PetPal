const express = require('express');
const router = express.Router();
const razorpayInstance = require('../config/razorpay');

// Create Razorpay order
router.post('/create-order', async (req, res) => {
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

const crypto = require('crypto');
const db = require('../config/db');

// Verify Razorpay payment
router.post('/verify', async (req, res) => {
  const { order_id, payment_id, signature, purpose, ref_id } = req.body;
  try {
    // Signature verification
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + '|' + payment_id)
      .digest('hex');
    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    // Optionally update DB based on purpose (adoption, daycare, donation)
    if (purpose === 'adoption' && ref_id) {
      await db.query('UPDATE adoptions SET status = ? WHERE id = ?', ['completed', ref_id]);
    } else if (purpose === 'daycare' && ref_id) {
      await db.query('UPDATE care_schedules SET status = ? WHERE id = ?', ['completed', ref_id]);
    } // Add more as needed
    res.json({ message: 'Payment verified and updated' });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
});

module.exports = router;
