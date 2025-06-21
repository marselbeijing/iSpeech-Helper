require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

console.log('Запуск тестирования бота...');
console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'Есть' : 'Отсутствует');

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN не найден в переменных окружения');
  process.exit(1);
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

console.log('✅ Бот инициализирован');

// Тест getMe
bot.getMe().then((botInfo) => {
  console.log('✅ Информация о боте:', botInfo);
}).catch((error) => {
  console.error('❌ Ошибка получения информации о боте:', error);
});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log('📨 Получена команда /start от пользователя:', msg.from.id);
  
  bot.sendMessage(chatId, '✅ Бот работает! Тестовое сообщение.', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: '🚀 Открыть приложение',
          web_app: { url: 'https://i-speech-helper-uce4.vercel.app/' }
        }],
        [{
          text: '💫 Тест кнопки',
          callback_data: 'test_button'
        }]
      ]
    }
  });
});

// Обработка callback query
bot.on('callback_query', (query) => {
  console.log('🔘 Получен callback query:', query.data);
  bot.answerCallbackQuery(query.id);
  
  if (query.data === 'test_button') {
    bot.sendMessage(query.message.chat.id, '✅ Кнопка работает!');
  }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});

console.log('🔄 Бот запущен и ожидает сообщения...');
console.log('📱 Протестируйте в Telegram: @iSpeechHelper_bot');
console.log('⌨️  Команды: /start');
console.log('🛑 Для остановки нажмите Ctrl+C'); 