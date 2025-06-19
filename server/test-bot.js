const TelegramBot = require('node-telegram-bot-api');

// Тестируем бота с вашим токеном
const token = process.env.TELEGRAM_BOT_TOKEN || '7913992071:AAH-x6QOaW8rnhRWK1wJZxkZnhIzFcgJ6ek';

console.log('🤖 Инициализация тестового бота...');
console.log('Токен:', token ? 'Найден' : 'НЕ НАЙДЕН');

const bot = new TelegramBot(token, { polling: true });

console.log('✅ Бот инициализирован, ожидаем команды...');

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('📨 Получена команда /start от:', msg.from);
  
  await bot.sendMessage(chatId, '🎉 Тестовый бот работает!\n\nДоступные команды:\n/buy_monthly - Месячная подписка\n/buy_quarterly - Квартальная подписка\n/buy_yearly - Годовая подписка');
});

// Обработчики команд покупки
bot.onText(/\/buy_monthly/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('💳 Получена команда /buy_monthly от:', msg.from);
  
  await bot.sendMessage(chatId, '💫 Месячная подписка Premium\n\n💰 Стоимость: 299 ⭐ Stars\n📅 Срок: 30 дней\n\n🚀 Команда получена и обработана!');
});

bot.onText(/\/buy_quarterly/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('💳 Получена команда /buy_quarterly от:', msg.from);
  
  await bot.sendMessage(chatId, '💫 Квартальная подписка Premium\n\n💰 Стоимость: 699 ⭐ Stars\n📅 Срок: 90 дней\n\n🚀 Команда получена и обработана!');
});

bot.onText(/\/buy_yearly/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('💳 Получена команда /buy_yearly от:', msg.from);
  
  await bot.sendMessage(chatId, '💫 Годовая подписка Premium\n\n💰 Стоимость: 1999 ⭐ Stars\n📅 Срок: 365 дней\n\n🚀 Команда получена и обработана!');
});

// Обработчик ошибок
bot.on('error', (error) => {
  console.error('❌ Ошибка бота:', error);
});

// Обработчик polling_error
bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});

console.log('🔄 Бот запущен и ожидает команды...');
console.log('📱 Протестируйте в Telegram: @iSpeechHelper_bot');
console.log('⌨️  Команды: /start, /buy_monthly, /buy_quarterly, /buy_yearly');
console.log('🛑 Для остановки нажмите Ctrl+C'); 