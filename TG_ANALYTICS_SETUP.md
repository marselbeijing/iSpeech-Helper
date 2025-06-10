# 🚨 Текущий статус: ОТКЛЮЧЕНО

TG Analytics временно отключен из-за несовместимости API и ошибок 400.

## 🔧 Текущий статус

### ✅ **Что работает**:
- Скрипт TG Analytics загружается: `https://tganalytics.xyz/index.js`
- Инициализация проходит успешно
- События отправляются на сервер

### ❌ **Проблема**:
- Ошибка 400 при отправке событий на `https://tganalytics.xyz/events`
- Возможно используется тестовый или неправильный токен

## 🛠️ Как получить правильный токен

### Шаг 1: Обратитесь к боту @DataChief_bot

1. Откройте Telegram
2. Найдите бота `@DataChief_bot`
3. Отправьте команду `/start`

### Шаг 2: Предоставьте информацию о приложении

Боту потребуется следующая информация:

- **Bot URL**: `https://t.me/iSpeechHelper_bot`
- **Domain**: `https://i-speech-helper-uce4.vercel.app`
- **App Name**: `ispeech_helper_analytics`

### Шаг 3: Получите настоящий токен

Бот выдаст вам токен в формате, который нужно будет использовать в коде.

### Шаг 4: Замените токен в коде

В файле `src/App.js` найдите строку:

```javascript
token: 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyX2FuYWx5dGljcyIsImFwcF91cmwiOiJodHRwczovL3QubWUvaVNwZWVjaEhlbHBlcl9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwIn0=',
```

И замените на полученный от @DataChief_bot токен.

## 🔍 Диагностика

### Проверить работу TG Analytics:

1. Откройте консоль браузера в вашем приложении
2. Выполните код из файла `debug-errors.js`:

```javascript
// Вставьте содержимое debug-errors.js в консоль
```

### Ожидаемые сообщения:

- `✅ TG Analytics: Браузерный скрипт загружен`
- `✅ TG Analytics: Успешно инициализирован`

### Проблемные сообщения:

- `❌ Ошибка 400` - неправильный токен
- `❌ Ошибка 403` - неправильный домен

## 📝 Альтернативные варианты

Если @DataChief_bot недоступен, можно рассмотреть:

1. **Telemetree.io** - альтернативная аналитика для Telegram Mini Apps
2. **Google Analytics** - классическая веб-аналитика
3. **Mixpanel** - продвинутая аналитика событий

## 🚀 После получения токена

1. Замените токен в коде
2. Пересоберите приложение: `npm run build`
3. Зафиксируйте изменения: `git commit -m "fix: обновлен токен TG Analytics"`
4. Загрузите на GitHub: `git push origin main`
5. Проверьте работу аналитики в консоли

## 📊 Текущая конфигурация

```javascript
window.telegramAnalytics.init({
  token: 'НОВЫЙ_ТОКЕН_ОТ_DATACHIEF_BOT',
  appName: 'ispeech_helper_analytics'
});
```

## 🎯 Цель

После правильной настройки TG Analytics будет отслеживать:
- Запуски приложения
- Взаимодействия пользователей
- События TON Connect
- Использование функций приложения

## ❌ Обнаруженные проблемы:

1. **API несовместимость**: `window.telegramAnalytics.track()` не является функцией
2. **400 ошибка**: Сервер `tganalytics.xyz/events` возвращает Bad Request
3. **Неправильный формат токена**: Возможно требуется другой формат

## ✅ Временное решение:

В `public/index.html` установлено:
```javascript
const shouldLoadAnalytics = false; // Отключено
```

## 🔧 Для повторного включения:

1. **Исправить API** - найти правильные методы TG Analytics
2. **Проверить токен** - возможно нужен другой формат
3. **Изменить флаг** в `public/index.html`:
   ```javascript
   const shouldLoadAnalytics = true;
   ```

## 📋 Использованные данные:

- **App Name**: `ispeech_helper_analytics`
- **Token**: `eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyX2FuYWx5dGljcyIsImFwcF91cmwiOiJodHRwczovL3QubWUvaVNwZWVjaEhlbHBlcl9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwIn0=!j9+Ln94Vror//YszMapC2bBcM7JNJ3tyOVLFnAUI7xg=`
- **Domain**: `https://i-speech-helper-uce4.vercel.app`

## 📞 Контакт модератора:

Обратитесь к модератору Telegram Mini Apps для уточнения правильного API TG Analytics. 