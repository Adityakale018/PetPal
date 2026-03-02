const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Register a daycare (Daycare Owner only)
router.post('/register', auth(['daycare_owner']), async (req, res) => {
  const { name, address, contact } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'Name and address required' });
  try {
    await db.query('INSERT INTO care_schedules (pet_id, schedule_date, activity, notes, status) VALUES (NULL, NULL, ?, ?, "scheduled")', [name, address]);
    res.json({ message: 'Daycare registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book daycare slot (Adopter only)
router.post('/book', auth(['adopter']), async (req, res) => {
  const { pet_id, schedule_date, activity, notes } = req.body;
  if (!pet_id || !schedule_date) return res.status(400).json({ error: 'Pet ID and date required' });
  try {
    await db.query('INSERT INTO care_schedules (pet_id, schedule_date, activity, notes, status) VALUES (?, ?, ?, ?, "scheduled")', [pet_id, schedule_date, activity, notes]);
    res.json({ message: 'Daycare slot booked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings for the logged-in adopter
router.get('/my-bookings', auth(['adopter']), async (req, res) => {
  try {
    const [bookings] = await db.query('SELECT * FROM care_schedules WHERE pet_id IN (SELECT id FROM pets WHERE owner_id = ?)', [req.user.id]);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
