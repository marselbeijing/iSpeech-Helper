// Скрипт для отладки Telegram Analytics
console.log('🔧 Analytics Debug: Скрипт загружен');

// Функция для проверки состояния аналитики
window.checkAnalytics = function() {
  console.log('🔍 Проверяем состояние Telegram Analytics...');
  
  const results = {
    timestamp: new Date().toISOString(),
    environment: {
      isTelegramWebApp: !!window.Telegram?.WebApp,
      webAppVersion: window.Telegram?.WebApp?.version,
      platform: window.Telegram?.WebApp?.platform,
      userId: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
    },
    analytics: {
      packageInstalled: false,
      sdkInitialized: false,
      trackMethodAvailable: false,
      tokenPresent: false,
    },
    errors: []
  };

  try {
    // Проверяем пакет @telegram-apps/analytics
    if (typeof window.telegramAnalytics !== 'undefined') {
      results.analytics.packageInstalled = true;
      results.analytics.trackMethodAvailable = typeof window.telegramAnalytics.track === 'function';
    }

    // Проверяем переменные окружения (если доступны)
    // В production это может не работать
    
    console.log('📊 Результаты проверки:', results);
    return results;
    
  } catch (error) {
    console.error('❌ Ошибка при проверке:', error);
    results.errors.push(error.message);
    return results;
  }
};

// Функция для отправки тестового события
window.sendTestEvent = function() {
  console.log('🧪 Отправляем тестовое событие...');
  
  try {
    // Пробуем через WebApp API
    if (window.Telegram?.WebApp?.sendData) {
      const testData = {
        event: 'debug_test',
        timestamp: Date.now(),
        test_parameter: 'debug_value'
      };
      
      window.Telegram.WebApp.sendData(JSON.stringify(testData));
      console.log('✅ Тестовое событие отправлено через WebApp.sendData');
      return { success: true, method: 'WebApp.sendData', data: testData };
    } else {
      console.warn('⚠️ WebApp.sendData недоступен');
      return { success: false, error: 'WebApp.sendData недоступен' };
    }
    
  } catch (error) {
    console.error('❌ Ошибка отправки тестового события:', error);
    return { success: false, error: error.message };
  }
};

// Функция для проверки токена (безопасно)
window.checkToken = function() {
  console.log('🔑 Проверяем наличие токена аналитики...');
  
  // Проверяем в localStorage (если токен там сохранен)
  const localStorageKeys = Object.keys(localStorage);
  const analyticsKeys = localStorageKeys.filter(key => 
    key.toLowerCase().includes('analytics') || 
    key.toLowerCase().includes('telegram')
  );
  
  console.log('🔍 Найденные ключи в localStorage:', analyticsKeys);
  
  // Проверяем глобальные переменные
  const hasAnalyticsGlobals = typeof window.telegramAnalytics !== 'undefined';
  
  return {
    localStorageKeys: analyticsKeys,
    hasAnalyticsGlobals: hasAnalyticsGlobals,
    webAppAvailable: !!window.Telegram?.WebApp
  };
};

// Функция для полной диагностики
window.fullAnalyticsCheck = function() {
  console.log('🔬 Запускаем полную диагностику Analytics...');
  
  const environment = window.checkAnalytics();
  const tokenInfo = window.checkToken();
  const testResult = window.sendTestEvent();
  
  const fullReport = {
    environment,
    tokenInfo,
    testResult,
    recommendations: []
  };
  
  // Добавляем рекомендации
  if (!environment.environment.isTelegramWebApp) {
    fullReport.recommendations.push('Приложение должно быть открыто в Telegram WebApp');
  }
  
  if (!environment.analytics.packageInstalled) {
    fullReport.recommendations.push('Проверьте установку пакета @telegram-apps/analytics');
  }
  
  if (!testResult.success) {
    fullReport.recommendations.push('Проблемы с отправкой событий - проверьте настройки WebApp');
  }
  
  console.log('📋 Полный отчет диагностики:', fullReport);
  return fullReport;
};

console.log('✅ Analytics Debug готов! Доступные команды:');
console.log('  - window.checkAnalytics() - проверка состояния');
console.log('  - window.sendTestEvent() - отправка тестового события');
console.log('  - window.checkToken() - проверка токена');
console.log('  - window.fullAnalyticsCheck() - полная диагностика');

// === Глобальные функции отладки Telegram Analytics ===

const ANALYTICS_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hoZWxwZXIiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL2lTcGVlY2hIZWxwZXJfYm90L2lzcGVlY2giLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwLyJ9!B5PY86VQG7rW63+lZ9B1t642VCbXoDEdKO/UH9tQHCU=';

window.debugAnalytics = function() {
  console.log('🔍 Debug Analytics: Проверяем состояние...');
  console.log('Token из константы:', ANALYTICS_TOKEN ? 'НАЙДЕН' : 'НЕ НАЙДЕН');
  console.log('Token length:', ANALYTICS_TOKEN.length);
  console.log('Telegram WebApp:', !!window.Telegram?.WebApp);
  console.log('telegramAnalytics:', typeof window.telegramAnalytics);
  console.log('analyticsService:', typeof window.analyticsService);
  return {
    token: ANALYTICS_TOKEN,
    tokenLength: ANALYTICS_TOKEN.length,
    webApp: !!window.Telegram?.WebApp,
    telegramAnalytics: typeof window.telegramAnalytics,
    analyticsService: typeof window.analyticsService
  };
};

window.initAnalyticsWithToken = function() {
  console.log('🔧 Инициализируем аналитику с фиксированным токеном...');
  try {
    if (window.telegramAnalytics && typeof window.telegramAnalytics.init === 'function') {
      window.telegramAnalytics.init({
        token: ANALYTICS_TOKEN,
        appName: 'ispeechhelper',
      });
      console.log('✅ Аналитика инициализирована с фиксированным токеном');
      return { success: true, message: 'Аналитика инициализирована' };
    } else {
      console.log('❌ telegramAnalytics недоступен');
      return { success: false, message: 'telegramAnalytics недоступен' };
    }
  } catch (error) {
    console.error('❌ Ошибка инициализации:', error);
    return { success: false, error: error.message };
  }
};

window.testAnalyticsEvent = function() {
  console.log('🧪 Отправляем тестовое событие...');
  if (window.analyticsService && typeof window.analyticsService.trackFeatureUsage === 'function') {
    window.analyticsService.trackFeatureUsage('debug_test', 'manual_test');
    return 'Тестовое событие отправлено';
  } else {
    return 'analyticsService не найден или trackFeatureUsage не функция';
  }
};

window.testTelegramAnalytics = function() {
  if (window.analyticsService && typeof window.analyticsService.testAnalytics === 'function') {
    return window.analyticsService.testAnalytics();
  } else {
    return 'analyticsService не найден или testAnalytics не функция';
  }
};

console.log('✅ analytics-debug.js: Глобальные функции отладки добавлены: window.debugAnalytics(), window.initAnalyticsWithToken(), window.testAnalyticsEvent(), window.testTelegramAnalytics()'); 