# iSpeech Helper Server

## 🚀 Быстрый запуск

### Запуск сервера
```bash
# Безопасный запуск с автоматической остановкой предыдущих процессов
./start.sh

# Или обычный запуск
node index.js
```

### Проверка статуса
```bash
# Полная проверка статуса сервера
./check-status.sh

# Быстрая проверка health endpoint
curl http://localhost:5000/health
```

### Остановка сервера
```bash
# Остановка всех процессов node index.js
pkill -f "node index.js"

# Принудительная остановка
pkill -9 -f "node index.js"
```

## �� API Endpoints

- `GET /health` - Проверка статуса сервера
- `POST /api/subscriptions/*` - Управление подписками
- `POST /api/payments/*` - Обработка платежей
- `POST /api/telegram/*` - Telegram webhook
- `GET /api/referral/*` - Реферальная система
- `GET /api/trial/*` - Пробный период

## 🔐 Переменные окружения

Создайте файл `.env` с:
```env
MONGODB_URI=mongodb://localhost:27017/ispeech-helper
TELEGRAM_BOT_TOKEN=your_bot_token_here
PORT=5000
```

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET /api/trial/check-access/:userId` - Проверка доступа

### Health Check
- `GET /health` - Проверка работоспособности сервера

## 🌐 API Endpoints

### Trial API
- `GET /api/trial/status/:userId?lang=ru` - Статус пробного периода
- `POST /api/trial/welcome-seen/:userId` - Отметка о просмотре приветствия
- `GET