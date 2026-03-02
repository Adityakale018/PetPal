const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load env vars
dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
const petRoutes = require('./routes/pets');
app.use('/api/pets', petRoutes);
const adoptionRoutes = require('./routes/adoptions');
app.use('/api/adoptions', adoptionRoutes);
const daycareRoutes = require('./routes/daycare');
app.use('/api/daycare', daycareRoutes);
const medicalRoutes = require('./routes/medical');
app.use('/api/medical', medicalRoutes);
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Pet Adoption & Care Management API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
