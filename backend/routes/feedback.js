const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Submit feedback (any logged-in user)
router.post('/submit', auth(), async (req, res) => {
  const { pet_id, rating, comment } = req.body;
  if (!rating || !comment) return res.status(400).json({ error: 'Rating and comment required' });
  try {
    await db.query('INSERT INTO feedback (user_id, pet_id, rating, comment) VALUES (?, ?, ?, ?)', [req.user.id, pet_id, rating, comment]);
    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedback (optionally for a pet)
router.get('/all', auth(), async (req, res) => {
  const { pet_id } = req.query;
  try {
    let feedback;
    if (pet_id) {
      [feedback] = await db.query('SELECT * FROM feedback WHERE pet_id = ?', [pet_id]);
    } else {
      [feedback] = await db.query('SELECT * FROM feedback');
    }
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
