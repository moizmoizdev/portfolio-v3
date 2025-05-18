const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Enable credentials (cookies, authorization headers)
}));

// Routes
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
}); 