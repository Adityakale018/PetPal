const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Get all pets (with optional filters)
router.get('/', async (req, res) => {
  try {
    const [pets] = await db.query('SELECT * FROM pets WHERE status = "available"');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pet by id
router.get('/:id', async (req, res) => {
  try {
    const [pet] = await db.query('SELECT * FROM pets WHERE id = ?', [req.params.id]);
    if (!pet.length) return res.status(404).json({ error: 'Pet not found' });
    res.json(pet[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a pet (Donor or Daycare Owner only)
router.post('/add', auth(['donor', 'daycare_owner']), async (req, res) => {
  const { name, age, breed, category_id, description, image_url } = req.body;
  if (!name || !category_id) return res.status(400).json({ error: 'Name and category are required' });
  try {
    await db.query(
      'INSERT INTO pets (name, age, breed, category_id, owner_id, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, age, breed, category_id, req.user.id, description, image_url]
    );
    res.json({ message: 'Pet added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
