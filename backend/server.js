const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load env vars from the backend/.env file
dotenv.config();

const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const petRoutes = require('./routes/pets');
const adoptionRoutes = require('./routes/adoptions');
const daycareRoutes = require('./routes/daycare');
const medicalRoutes = require('./routes/medical');
const feedbackRoutes = require('./routes/feedback');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/daycare', daycareRoutes);
app.use('/api/medical', medicalRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Pet Adoption & Care Management API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
