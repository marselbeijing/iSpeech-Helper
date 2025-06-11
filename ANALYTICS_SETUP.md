# 📊 Telegram Analytics Integration Guide

## 🎯 Конфигурация

### Данные вашего приложения:
- **Analytics Identifier:** `ispeech_helper`
- **Telegram URL:** `https://t.me/iSpeechHelper_bot`
- **Application Domain:** `https://i-speech-helper-uce4.vercel.app`
- **SDK Auth Token:** `eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=`

## ✅ Что реализовано

### 1. **Основной сервис аналитики** (`src/services/telegramAnalytics.js`)
- Инициализация SDK с правильными токенами
- Очередь событий для отправки до инициализации
- Автоматическое отслеживание ошибок
- Предустановленные методы для iSpeech Helper

### 2. **Интеграция в приложение** (`src/App.js`)
- Автоматическая инициализация при запуске
- Отслеживание сессий пользователя
- Глобальная обработка ошибок
- Отслеживание изменений темы

### 3. **Навигационная аналитика** (`src/components/Root.js`)
- Автоматическое отслеживание переходов между страницами
- Измерение времени, проведенного на каждой странице

### 4. **Хук для компонентов** (`src/hooks/useAnalytics.js`)
- Удобный интерфейс для использования в компонентах
- Типизированные методы отслеживания

### 5. **Утилиты отладки** (`src/utils/analyticsDebug.js`)
- Проверка статуса инициализации
- Отправка тестовых событий
- Диагностическая информация

## 🔧 Отслеживаемые события

### Системные события:
- `app_launch` - Запуск приложения
- `session_start` - Начало сессии
- `session_end` - Окончание сессии
- `page_view` - Просмотр страницы
- `error_occurred` - Ошибка приложения

### События приложения:
- `function_used` - Использование функции
- `exercise_completed` - Завершение упражнения
- `settings_changed` - Изменение настроек
- `achievement_unlocked` - Получение достижения

## 🧪 Как проверить работу

### 1. **В браузере (DevTools):**
```javascript
// Откройте консоль разработчика и выполните:
AnalyticsDebugger.checkInitialization()
AnalyticsDebugger.sendTestEvent()
AnalyticsDebugger.getFullDebugInfo()
```

### 2. **Проверка сетевых запросов:**
1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Отфильтруйте по `tganalytics.xyz`
4. Обновите приложение или выполните действие
5. Вы должны увидеть HTTP запросы к серверу аналитики

### 3. **В Telegram Web:**
1. Перейдите на https://web.telegram.org
2. Откройте DevTools
3. Запустите ваш бот
4. Фильтруйте Network по `tganalytics.xyz`

### 4. **Проверка через @DataChief_bot:**
После интеграции бот должен показывать время последнего события вместо "no records"

## 📱 Поддерживаемые платформы

- ✅ Telegram Desktop App
- ✅ Telegram Web (web.telegram.org)
- ✅ Telegram Mobile App
- ✅ Локальная разработка (ограниченно)

## 🔍 Устранение неполадок

### Проблема: "Analytics не инициализирован"
**Решение:**
- Проверьте наличие `window.Telegram.WebApp`
- Убедитесь, что приложение запущено в Telegram
- Проверьте правильность токена

### Проблема: "События не отправляются"
**Решение:**
- Откройте Network в DevTools
- Проверьте блокировку CORS
- Убедитесь в наличии `initData`

### Проблема: "Нет записей в @DataChief_bot"
**Решение:**
- Подождите 5-10 минут
- Проверьте правильность домена
- Убедитесь, что токен соответствует приложению

## 🚀 Дополнительные возможности

### Кастомные события:
```javascript
import telegramAnalyticsService from './services/telegramAnalytics';

// Отправка кастомного события
telegramAnalyticsService.trackEvent('custom_event_name', {
  parameter1: 'value1',
  parameter2: 123,
  parameter3: true
});
```

### Использование хука:
```javascript
import { useAnalytics } from './hooks/useAnalytics';

const MyComponent = () => {
  const { trackFunction, trackExercise } = useAnalytics();
  
  const handleButtonClick = () => {
    trackFunction('button_clicked');
  };
};
```

## 📊 Ожидаемые результаты

После успешной интеграции вы должны увидеть:

1. **В консоли браузера:**
   - `✅ Telegram Analytics инициализирован успешно`
   - `📊 Отправлено событие: app_launch`
   - `📍 Переход на страницу: home`

2. **В Network DevTools:**
   - Запросы к `tganalytics.xyz/api/events`
   - Status 200 для успешных отправок

3. **В @DataChief_bot:**
   - Изменение "Last record" с "no records" на время последнего события

## 🔄 Автоматическая отправка

События отправляются автоматически в фоновом режиме. SDK самостоятельно управляет:
- Буферизацией событий
- Повторными попытками при ошибках
- Оптимизацией сетевых запросов

---

**✨ Интеграция завершена! Ваше приложение теперь отправляет аналитику в Telegram Analytics.** 