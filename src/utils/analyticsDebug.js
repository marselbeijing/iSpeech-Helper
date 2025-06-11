import telegramAnalyticsService from '../services/telegramAnalytics';

/**
 * Утилиты для отладки и проверки Telegram Analytics
 */
export class AnalyticsDebugger {
  
  // Проверка статуса инициализации
  static checkInitialization() {
    const isReady = telegramAnalyticsService.isReady();
    const userInfo = telegramAnalyticsService.getUserInfo();
    
    console.group('🔍 Telegram Analytics Debug Info');
    console.log('✅ Инициализирован:', isReady);
    console.log('👤 Информация о пользователе:', userInfo);
    console.log('🌐 Telegram WebApp доступен:', !!window.Telegram?.WebApp);
    console.log('📱 InitData доступен:', !!window.Telegram?.WebApp?.initData);
    console.log('🔗 Текущий URL:', window.location.href);
    console.groupEnd();
    
    return {
      isReady,
      userInfo,
      hasWebApp: !!window.Telegram?.WebApp,
      hasInitData: !!window.Telegram?.WebApp?.initData,
      currentUrl: window.location.href
    };
  }

  // Отправка тестового события
  static sendTestEvent() {
    const testData = {
      timestamp: Date.now(),
      test_id: Math.random().toString(36).substr(2, 9),
      browser: navigator.userAgent,
      screen_size: `${window.screen.width}x${window.screen.height}`
    };
    
    telegramAnalyticsService.trackEvent('debug_test_event', testData);
    
    console.log('🧪 Отправлено тестовое событие:', testData);
    return testData;
  }

  // Отправка полного набора тестовых событий
  static sendTestSuite() {
    console.log('🎯 Запуск тестового набора событий...');
    
    // Тест основных событий
    telegramAnalyticsService.trackAppLaunch();
    telegramAnalyticsService.trackPageView('debug_page');
    telegramAnalyticsService.trackFunctionUsage('debug_function', 5);
    telegramAnalyticsService.trackExerciseCompleted('debug_exercise', 30, 95);
    telegramAnalyticsService.trackSettingsChange('debug_setting', 'test_value');
    telegramAnalyticsService.trackAchievement('debug_achievement');
    
    // Тестовое кастомное событие
    this.sendTestEvent();
    
    console.log('✅ Тестовый набор событий отправлен');
  }

  // Проверка сетевых запросов в DevTools
  static checkNetworkRequests() {
    console.log('🌐 Для проверки сетевых запросов:');
    console.log('1. Откройте DevTools (F12)');
    console.log('2. Перейдите на вкладку Network');
    console.log('3. Фильтруйте по "tganalytics.xyz"');
    console.log('4. Отправьте тестовое событие');
    
    this.sendTestEvent();
  }

  // Получение всей отладочной информации
  static getFullDebugInfo() {
    const initInfo = this.checkInitialization();
    
    const debugInfo = {
      ...initInfo,
      telegram_version: window.Telegram?.WebApp?.version || 'unknown',
      platform: window.Telegram?.WebApp?.platform || 'unknown',
      color_scheme: window.Telegram?.WebApp?.colorScheme || 'unknown',
      viewport_height: window.Telegram?.WebApp?.viewportHeight || window.innerHeight,
      is_expanded: window.Telegram?.WebApp?.isExpanded || false,
      theme_params: window.Telegram?.WebApp?.themeParams || {},
      start_param: window.Telegram?.WebApp?.initDataUnsafe?.start_param || null,
      local_storage_available: typeof Storage !== 'undefined',
      analytics_token_present: !!telegramAnalyticsService.isReady()
    };
    
    console.table(debugInfo);
    return debugInfo;
  }
}

// Экспортируем для использования в console
window.AnalyticsDebugger = AnalyticsDebugger;

export default AnalyticsDebugger; 