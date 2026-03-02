const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Request adoption (Adopter only)
router.post('/request', auth(['adopter']), async (req, res) => {
  const { pet_id } = req.body;
  if (!pet_id) return res.status(400).json({ error: 'Pet ID required' });
  try {
    // Check if already requested
    const [existing] = await db.query('SELECT * FROM adoption_requests WHERE pet_id = ? AND adopter_id = ? AND status = "pending"', [pet_id, req.user.id]);
    if (existing.length) return res.status(409).json({ error: 'Already requested' });
    await db.query('INSERT INTO adoption_requests (pet_id, adopter_id) VALUES (?, ?)', [pet_id, req.user.id]);
    res.json({ message: 'Adoption request sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get adoption status for user
router.get('/status', auth(['adopter']), async (req, res) => {
  try {
    const [requests] = await db.query('SELECT * FROM adoption_requests WHERE adopter_id = ?', [req.user.id]);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
