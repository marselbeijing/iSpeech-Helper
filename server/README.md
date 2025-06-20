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

## �� Решение проблем

### Ошибка "EADDRINUSE: address already in use"
```bash
# Проверить какой процесс занимает порт
lsof -i :5000

# Остановить процесс
kill -9 <PID>

# Или использовать наш скрипт
./start.sh
```

### Ошибки подключения к Telegram API
- Ошибки типа `EFATAL`, `ENOTFOUND`, `ETIMEDOUT` - нормальные сетевые ошибки
- Бот автоматически переподключается
- Проверьте интернет-соединение

### Проверка логов
```bash
# Запуск с подробными логами
DEBUG=* node index.js

# Только важные сообщения
node index.js 2>&1 | grep -v "polling_error"
```

## 📊 Мониторинг

### Health Check
- **URL**: `http://localhost:5000/health`
- **Ответ**: 
  ```json
  {
    "status": "OK",
    "timestamp": "2025-01-20T11:32:20.522Z",
    "botStatus": "connected"
  }
  ```

### Статус процессов
```bash
# Проверка запущенных процессов
ps aux | grep "node index.js"

# Проверка занятых портов
netstat -tlnp | grep :5000
```

## 🌐 API Endpoints

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
