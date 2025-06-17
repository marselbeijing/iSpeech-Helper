require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ispeech-helper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Routes
app.use('/api/subscriptions', require('./routes/subscriptions'));

// Error handling middleware
app.use((err, req, res, next) => {
  process.stderr.write(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); 