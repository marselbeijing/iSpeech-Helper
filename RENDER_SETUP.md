# Настройка переменных окружения на Render.com

## Проблема
Telegram бот не отвечает на команды `/start` и кнопки не работают.

## Причина
На Render.com не установлены необходимые переменные окружения для работы бота.

## Решение

### 1. Зайдите в панель управления Render.com
- Перейдите на https://dashboard.render.com
- Найдите ваш сервис `ispeech-backend`

### 2. Откройте настройки Environment Variables
- В левом меню нажмите "Environment"
- Или перейдите в раздел "Settings" → "Environment Variables"

### 3. Добавьте следующие переменные:

#### TELEGRAM_BOT_TOKEN
```
Key: TELEGRAM_BOT_TOKEN
Value: 8114886238:AAGbJL6Wsxc1g8QOyHKwfLVRBLrREUVZza0
```

#### MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://marselbeijing:Atlant19850124@cluster0.0se81fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

#### WEBAPP_URL
```
Key: WEBAPP_URL
Value: https://i-speech-helper-uce4.vercel.app
```

#### NODE_ENV
```
Key: NODE_ENV
Value: production
```

### 4. Сохраните изменения
- Нажмите "Save Changes"
- Render.com автоматически перезапустит ваш сервис

### 5. Проверьте работу
После перезапуска (займет 2-3 минуты):

1. **Проверьте health check:**
   ```bash
   curl https://ispeech-backend.onrender.com/health
   ```
   Должен вернуть JSON с `"botStatus": "connected"`

2. **Проверьте статус бота:**
   ```bash
   curl https://ispeech-backend.onrender.com/bot-status
   ```
   Должен вернуть информацию о боте

3. **Протестируйте бота в Telegram:**
   - Откройте https://t.me/iSpeechHelper_bot
   - Отправьте команду `/start`
   - Проверьте работу кнопок

## Дополнительная диагностика

### Если бот все еще не работает:

1. **Проверьте логи на Render.com:**
   - В панели управления перейдите в "Logs"
   - Ищите ошибки связанные с Telegram или MongoDB

2. **Проверьте статус переменных:**
   ```bash
   curl https://ispeech-backend.onrender.com/health
   ```
   Должно показать:
   ```json
   {
     "status": "OK",
     "botStatus": "connected",
     "hasToken": true,
     "mongoConnected": true
   }
   ```

3. **Если нужно перезапустить сервис принудительно:**
   - В панели Render.com нажмите "Manual Deploy"
   - Выберите "Clear build cache & deploy"

## Важно
- Никогда не публикуйте токен бота в открытых репозиториях
- Переменные окружения на Render.com защищены и не видны в логах
- После изменения переменных сервис автоматически перезапускается 