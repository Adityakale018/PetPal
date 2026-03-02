const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Get medical records for a pet
router.get('/:petId', auth(), async (req, res) => {
  try {
    const [records] = await db.query('SELECT * FROM pet_medical_records WHERE pet_id = ?', [req.params.petId]);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a medical record (only for veterinarians or daycare owners)
router.post('/add', auth(['veterinarian', 'daycare_owner']), async (req, res) => {
  const { pet_id, record_date, description, veterinarian_id } = req.body;
  if (!pet_id || !record_date || !description || !veterinarian_id) return res.status(400).json({ error: 'All fields required' });
  try {
    await db.query('INSERT INTO pet_medical_records (pet_id, record_date, description, veterinarian_id) VALUES (?, ?, ?, ?)', [pet_id, record_date, description, veterinarian_id]);
    res.json({ message: 'Medical record added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
