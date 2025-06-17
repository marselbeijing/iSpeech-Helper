# Интеграция Telegram Stars в iSpeech Helper

Это руководство описывает полную интеграцию платежной системы Telegram Stars в приложение iSpeech Helper.

## 🌟 Что такое Telegram Stars?

Telegram Stars — это внутриигровая валюта Telegram, которая позволяет пользователям покупать цифровые товары и услуги внутри ботов и мини-приложений. Пользователи могут покупать Stars через Apple Pay, Google Pay или другие платежные системы, а затем использовать их для покупок.

## 📋 Требования

1. **Telegram Bot** - создан через @BotFather
2. **Node.js** сервер для обработки платежей
3. **MongoDB** для хранения данных о подписках и платежах
4. **HTTPS** для production (обязательно для webhook)

## 🚀 Установка и настройка

### 1. Настройка бота

1. Создайте бота через @BotFather:
   ```
   /newbot
   ```

2. Получите токен бота и сохраните его

3. Настройте команды бота:
   ```
   /setcommands
   start - Запустить приложение
   paysupport - Поддержка по платежам
   ```

### 2. Установка зависимостей сервера

```bash
cd server
npm install
```

Новые зависимости:
- `node-telegram-bot-api` - для работы с Telegram Bot API
- Обновленные модели для работы с платежами

### 3. Настройка переменных окружения

Создайте файл `.env` в папке `server`:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/ispeech-helper

# Telegram Bot Token (получить у @BotFather)
TELEGRAM_BOT_TOKEN=ваш_токен_бота

# URL для webhook в production
WEBHOOK_URL=https://yourdomain.com

# URL вашего веб-приложения
WEBAPP_URL=https://i-speech-helper-uce4.vercel.app/

# Порт сервера
PORT=5000

# Окружение
NODE_ENV=production
```

### 4. Запуск сервера

```bash
# Для разработки
npm run dev

# Для production
npm start
```

## 🏗️ Архитектура системы

### Компоненты системы:

1. **Frontend (React)**
   - `src/services/payments.js` - основной сервис для работы с платежами
   - `src/pages/Account.js` - страница с покупкой подписок
   - Интеграция с Telegram WebApp SDK

2. **Backend (Node.js + Express)**
   - `server/bot.js` - класс для работы с Telegram Bot API
   - `server/routes/payments.js` - API endpoints для платежей
   - `server/routes/telegram.js` - webhook для Telegram
   - `server/models/Invoice.js` - модель счетов
   - `server/models/Subscription.js` - модель подписок

3. **База данных (MongoDB)**
   - Коллекция `invoices` - счета для оплаты
   - Коллекция `subscriptions` - активные подписки пользователей

## 💳 Процесс оплаты

### Схема работы:

```
1. Пользователь нажимает "Купить подписку"
   ↓
2. Frontend создает запрос на создание инвойса
   ↓
3. Backend создает инвойс в БД и через Bot API
   ↓
4. Frontend получает ссылку на инвойс
   ↓
5. Открывается платежный интерфейс Telegram
   ↓
6. Пользователь покупает Stars и оплачивает
   ↓
7. Telegram отправляет pre_checkout_query
   ↓
8. Backend проверяет и подтверждает платеж
   ↓
9. Telegram отправляет successful_payment
   ↓
10. Backend создает подписку и уведомляет пользователя
```

## 🔧 API Endpoints

### Платежи (`/api/payments`)

- `POST /create-invoice` - создание инвойса
- `POST /pre-checkout` - обработка pre_checkout_query
- `POST /successful-payment` - обработка успешного платежа
- `POST /refund` - возврат средств
- `GET /status/:invoiceId` - статус платежа

### Подписки (`/api/subscriptions`)

- `GET /status/:userId` - статус подписки пользователя
- `POST /create` - создание подписки (устарел)

### Telegram (`/api/telegram`)

- `POST /webhook` - webhook для получения обновлений от Telegram

## 📱 Frontend интеграция

### Основные методы:

```javascript
import { 
  purchaseSubscription, 
  isTelegramStarsSupported,
  SUBSCRIPTION_TYPES 
} from '../services/payments';

// Проверка поддержки
const isSupported = isTelegramStarsSupported();

// Покупка подписки
const result = await purchaseSubscription('MONTHLY');
if (result.success) {
  // Подписка активирована
}
```

### Типы подписок:

```javascript
SUBSCRIPTION_TYPES = {
  MONTHLY: {
    stars: 299,
    duration: 30, // дней
  },
  QUARTERLY: {
    stars: 799,
    duration: 90, // дней
  },
  YEARLY: {
    stars: 1999,
    duration: 365, // дней
  }
}
```

## 🔒 Безопасность

### Обязательные проверки:

1. **Pre-checkout validation**:
   - Проверка существования инвойса
   - Проверка суммы платежа
   - Проверка срока действия инвойса
   - Проверка пользователя

2. **Webhook security**:
   - Проверка подписи Telegram (рекомендуется)
   - Валидация данных платежа
   - Предотвращение дублирования платежей

3. **Database security**:
   - Уникальные индексы для предотвращения дублей
   - Проверка статусов перед обновлением

## 📊 Мониторинг и логирование

Система логирует все важные события:

```javascript
// Примеры логов
console.log('Pre-checkout query received:', { userId, amount, payload });
console.log('Payment successful:', { userId, subscriptionType, expiresAt });
console.log('Subscription created:', { userId, type, expiresAt });
```

## 🛠️ Тестирование

### Тестовые платежи:

1. Используйте тестовые Stars (можно купить за $1)
2. Тестируйте все сценарии:
   - Успешная оплата
   - Отмена оплаты
   - Ошибка оплаты
   - Возврат средств

### Команды для тестирования:

```bash
# Проверка статуса бота
curl https://api.telegram.org/bot<TOKEN>/getMe

# Проверка webhook
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo
```

## 🔄 Возврат средств

Система поддерживает возврат Stars:

```javascript
// Backend
await bot.refundStarPayment(userId, telegramPaymentChargeId);

// Frontend
const result = await refundPayment(subscriptionId);
```

## 📈 Аналитика

Доступные метрики:
- Количество созданных инвойсов
- Конверсия платежей
- Популярные типы подписок
- Возвраты и их причины

## 🚨 Troubleshooting

### Частые проблемы:

1. **"Telegram Stars не поддерживается"**
   - Проверьте версию Telegram WebApp
   - Убедитесь, что приложение запущено в Telegram

2. **"Инвойс не найден"**
   - Проверьте подключение к БД
   - Проверьте правильность payload

3. **"Webhook не работает"**
   - Убедитесь в наличии HTTPS
   - Проверьте правильность URL webhook

4. **"Платеж не проходит"**
   - Проверьте токен бота
   - Убедитесь в правильности суммы (в Stars)

## 📝 Требования для production

### Обязательные команды бота:

- `/paysupport` - поддержка по платежам
- `/terms` - условия использования (рекомендуется)

### Обязательные функции:

- Обработка споров и возвратов
- Поддержка пользователей 24/7
- Логирование всех транзакций
- Резервное копирование данных

## 📚 Полезные ссылки

- [Telegram Bot API - Payments](https://core.telegram.org/bots/api#payments)
- [Telegram Stars Documentation](https://core.telegram.org/bots/payments-stars)
- [Telegram WebApp SDK](https://core.telegram.org/bots/webapps)

## 🎯 Следующие шаги

1. Настройте мониторинг и алерты
2. Добавьте аналитику платежей
3. Реализуйте автоматические уведомления
4. Настройте резервное копирование
5. Добавьте A/B тестирование цен

---

**Важно**: Перед запуском в production обязательно протестируйте все сценарии и убедитесь в соответствии требованиям Telegram для платежных ботов. 