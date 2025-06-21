require('dotenv').config();

console.log('🔍 Проверка переменных окружения:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Установлен' : 'НЕ УСТАНОВЛЕН');
console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'Установлен' : 'НЕ УСТАНОВЛЕН');
console.log('WEBAPP_URL:', process.env.WEBAPP_URL);
console.log('WEBHOOK_URL:', process.env.WEBHOOK_URL);

if (process.env.TELEGRAM_BOT_TOKEN) {
  console.log('✅ Токен бота найден, длина:', process.env.TELEGRAM_BOT_TOKEN.length);
  console.log('🔑 Начало токена:', process.env.TELEGRAM_BOT_TOKEN.substring(0, 10) + '...');
} else {
  console.log('❌ TELEGRAM_BOT_TOKEN не найден!');
  console.log('📝 Убедитесь что переменная установлена на Render.com');
}

// Проверяем MongoDB подключение
if (process.env.MONGODB_URI) {
  const mongoose = require('mongoose');
  
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB подключение успешно');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Ошибка подключения MongoDB:', err.message);
    process.exit(1);
  });
} else {
  console.log('❌ MONGODB_URI не установлен');
  process.exit(1);
} 