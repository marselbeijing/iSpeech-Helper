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

// Удаляю ручной middleware с res.header('Access-Control-Allow-Origin', ...) для избежания конфликтов
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  if (req.url.includes('/api/trial')) {
    console.log('🎯 Trial API request detected:', req.method, req.url, 'params:', req.params);
  }
  next();
});

// MongoDB connection
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI не установлена!');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB подключена успешно'))
.catch(err => {
  console.error('❌ Ошибка подключения к MongoDB:', err);
  process.exit(1);
});

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
app.use('/api/admin', require('./routes/admin'));

// Health check endpoint
app.get('/health', (req, res) => {
  const botConnected = telegramBot && telegramBot.bot;
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    botStatus: botConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV,
    mongoConnected: mongoose.connection.readyState === 1,
    hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
    webappUrl: process.env.WEBAPP_URL
  });
});

// Bot status endpoint
app.get('/bot-status', async (req, res) => {
  if (!telegramBot || !telegramBot.bot) {
    return res.status(503).json({ 
      error: 'Bot not initialized',
      hasToken: !!process.env.TELEGRAM_BOT_TOKEN
    });
  }
  
  try {
    const botInfo = await telegramBot.bot.getMe();
    res.json({
      status: 'connected',
      botInfo: {
        username: botInfo.username,
        firstName: botInfo.first_name,
        canJoinGroups: botInfo.can_join_groups,
        canReadAllGroupMessages: botInfo.can_read_all_group_messages,
        supportsInlineQueries: botInfo.supports_inline_queries
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get bot info',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Запускаем сервер (кроме Vercel, который использует serverless функции)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Available routes:');
    console.log('- GET /health');
    console.log('- GET /api/trial/status/:userId');
    console.log('- POST /api/trial/welcome-seen/:userId');
    console.log('- GET /api/trial/check-access/:userId');
  });
}

// Экспорт для Vercel и других serverless платформ
module.exports = app; 