// Расширенная диагностика ошибок TG Analytics
// Вставьте этот код в консоль браузера для диагностики

console.log('🔍 === ДИАГНОСТИКА ОШИБОК TG ANALYTICS ===');

// 1. Проверяем сетевые запросы в консоли
console.log('📡 Мониторинг сетевых запросов...');

// Перехватываем fetch запросы
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log('🌐 Fetch запрос:', args[0]);
  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      console.error(`❌ Ошибка fetch ${response.status}:`, args[0]);
    } else {
      console.log(`✅ Успешный fetch ${response.status}:`, args[0]);
    }
    return response;
  } catch (error) {
    console.error('❌ Ошибка сети:', error, 'URL:', args[0]);
    throw error;
  }
};

// 2. Проверяем загруженные скрипты
const scripts = document.querySelectorAll('script[src]');
console.log('📜 Найдено скриптов:', scripts.length);

scripts.forEach((script, index) => {
  console.log(`Script ${index + 1}:`, script.src);
  
  script.addEventListener('load', () => {
    console.log(`✅ Скрипт загружен: ${script.src}`);
  });
  
  script.addEventListener('error', (e) => {
    console.error(`❌ Ошибка загрузки скрипта: ${script.src}`, e);
  });
});

// 3. Проверяем специфично TG Analytics
const analyticsScript = document.querySelector('script[src*="tganalytics.xyz"]');
if (analyticsScript) {
  console.log('📊 TG Analytics скрипт найден:', analyticsScript.src);
} else {
  console.warn('⚠️ TG Analytics скрипт не найден в DOM');
}

// 4. Проверяем ошибки в консоли
const originalError = console.error;
console.error = function(...args) {
  if (args[0] && args[0].toString().includes('400')) {
    console.log('🔍 Обнаружена ошибка 400. Детали:', ...args);
  }
  originalError.apply(console, args);
};

// 5. Проверяем Telegram WebApp
if (window.Telegram?.WebApp) {
  console.log('✅ Telegram WebApp доступен');
  console.log('📱 initData:', window.Telegram.WebApp.initData ? 'Есть' : 'Нет');
  console.log('🌐 Platform:', window.Telegram.WebApp.platform);
  console.log('📝 Version:', window.Telegram.WebApp.version);
} else {
  console.warn('⚠️ Telegram WebApp недоступен');
}

// 6. Проверяем TG Analytics объект
setTimeout(() => {
  if (window.telegramAnalytics) {
    console.log('✅ telegramAnalytics загружен:', typeof window.telegramAnalytics);
  } else {
    console.warn('⚠️ telegramAnalytics не загружен после 2 секунд');
  }
}, 2000);

console.log('🔍 === ДИАГНОСТИКА ЗАВЕРШЕНА ===');
console.log('💡 Инструкция: Откройте вкладку Network в DevTools для просмотра всех запросов'); 