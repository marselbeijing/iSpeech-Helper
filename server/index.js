require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const TelegramStarsBot = require('./bot');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ispeech-helper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Инициализация Telegram бота
let telegramBot = null;
if (process.env.TELEGRAM_BOT_TOKEN) {
  telegramBot = new TelegramStarsBot(process.env.TELEGRAM_BOT_TOKEN);
  app.set('telegramBot', telegramBot);
  
  // Устанавливаем webhook в production
  if (process.env.NODE_ENV === 'production' && process.env.WEBHOOK_URL) {
    telegramBot.setWebhook(process.env.WEBHOOK_URL);
  }
} else {
  console.warn('TELEGRAM_BOT_TOKEN не установлен. Telegram функции недоступны.');
}

// Routes
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/telegram', require('./routes/telegram'));

// Базовый route
app.get('/', (req, res) => {
  res.json({ 
    message: 'iSpeech Helper Backend API',
    version: '1.0.0',
    telegram_bot_enabled: !!telegramBot
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Telegram бот: ${telegramBot ? '✅ Активен' : '❌ Неактивен'}`);
}); 