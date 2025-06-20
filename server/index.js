require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://i-speech-helper-uce4.vercel.app',
    'http://localhost:3000', // для локальной разработки
    'http://localhost:3001'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

// Middleware
app.use(cors(corsOptions));

// Дополнительные CORS заголовки для Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ispeech-helper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Telegram Bot initialization
let telegramBot = null;
if (process.env.TELEGRAM_BOT_TOKEN) {
  try {
    // Импорт и инициализация бота с обработчиками
    const TelegramStarsBot = require('./bot');
    telegramBot = new TelegramStarsBot(process.env.TELEGRAM_BOT_TOKEN);
    app.set('telegramBot', telegramBot);
    console.log('Telegram Stars bot initialized successfully');
  } catch (error) {
    console.error('Error initializing Telegram bot:', error);
  }
} else {
  console.warn('TELEGRAM_BOT_TOKEN not found, bot functionality disabled');
}

// Routes
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api', require('./routes/payments'));
app.use('/api/telegram', require('./routes/telegram'));
app.use('/api/referral', require('./routes/referral'));
app.use('/api/trial', require('./routes/trial'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    botStatus: telegramBot ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 