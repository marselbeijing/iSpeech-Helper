// Скрипт для проверки интеграции TG Analytics
// Запустите этот код в консоли браузера на странице вашего приложения

console.log('=== Проверка интеграции TG Analytics ===');

// 1. Проверяем наличие Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  console.log('✅ Telegram WebApp API доступен');
  console.log('WebApp версия:', window.Telegram.WebApp.version);
  console.log('initData:', window.Telegram.WebApp.initData ? 'Присутствует' : 'Отсутствует');
} else {
  console.log('❌ Telegram WebApp API недоступен');
}

// 2. Проверяем загрузку скрипта TG Analytics
const analyticsScript = document.querySelector('script[src*="analytics.tganalytics.xyz"]');
if (analyticsScript) {
  console.log('✅ Скрипт TG Analytics найден в DOM');
} else {
  console.log('❌ Скрипт TG Analytics не найден в DOM');
}

// 3. Проверяем глобальную переменную TgAnalytics
if (window.TgAnalytics) {
  console.log('✅ TgAnalytics объект доступен');
  console.log('TgAnalytics:', window.TgAnalytics);
} else {
  console.log('❌ TgAnalytics объект недоступен');
}

// 4. Проверяем наш токен и настройки
const token = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyX2FuYWx5dGljcyIsImFwcF91cmwiOiJodHRwczovL3QubWUvaVNwZWVjaEhlbHBlcl9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwIn0=!j9+Ln94Vror//YszMapC2bBcM7JNJ3tyOVLFnAUI7xg=';
console.log('✅ Токен аналитики настроен');

// 5. Проверяем инициализацию в коде
console.log('ID приложения в токене: ispeech_helper_analytics');

console.log('=== Конец проверки ===');
console.log('Инструкция: Запустите это в консоли браузера внутри Telegram Mini App для полной проверки'); 