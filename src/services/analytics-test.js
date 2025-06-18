import telegramAnalytics from '@telegram-apps/analytics';

class TelegramAnalyticsTest {
  constructor() {
    this.isInitialized = false;
    this.eventQueue = [];
    console.log('🔍 Analytics Test: Конструктор создан');
    this.init();
  }

  init() {
    console.log('🔍 Analytics Test: Начинаем инициализацию...');
    
    try {
      const analyticsToken = process.env.REACT_APP_TG_ANALYTICS_TOKEN;
      console.log('🔍 Analytics Test: Токен найден:', analyticsToken ? 'ДА' : 'НЕТ');
      console.log('🔍 Analytics Test: Длина токена:', analyticsToken?.length || 0);
      
      if (analyticsToken && analyticsToken !== 'undefined') {
        console.log('🔍 Analytics Test: Инициализируем Telegram Analytics...');
        
        telegramAnalytics.init({
          token: analyticsToken,
          appName: 'ispeechhelper',
        });
        
        this.isInitialized = true;
        console.log('✅ Analytics Test: Telegram Analytics успешно инициализирована!');
        
        // Проверяем доступные методы
        console.log('🔍 Analytics Test: Доступные методы telegramAnalytics:', Object.keys(telegramAnalytics));
        console.log('🔍 Analytics Test: Метод track доступен:', typeof telegramAnalytics.track === 'function');
        
        // Обрабатываем очередь событий
        this.processEventQueue();
      } else {
        console.warn('⚠️ Analytics Test: Токен не найден или пустой');
      }
    } catch (error) {
      console.error('❌ Analytics Test: Ошибка инициализации:', error);
    }
  }

  processEventQueue() {
    console.log('🔍 Analytics Test: Обрабатываем очередь событий, размер:', this.eventQueue.length);
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      this.sendEvent(event.name, event.parameters);
    }
  }

  sendEvent(eventName, parameters = {}) {
    console.log('🔍 Analytics Test: Отправляем событие:', eventName, parameters);
    
    if (!this.isInitialized) {
      console.log('⏳ Analytics Test: SDK не инициализирован, добавляем в очередь');
      this.eventQueue.push({ name: eventName, parameters });
      return;
    }

    try {
      const eventData = {
        ...parameters,
        timestamp: Date.now(),
        user_agent: navigator.userAgent,
        platform: this.getPlatform(),
      };

      // Отправляем через Telegram Analytics
      if (telegramAnalytics && telegramAnalytics.track) {
        console.log('📤 Analytics Test: Отправляем через telegramAnalytics.track');
        telegramAnalytics.track(eventName, eventData);
        console.log('✅ Analytics Test: Событие отправлено через SDK');
      } else {
        console.warn('⚠️ Analytics Test: telegramAnalytics.track недоступен');
      }

      // Также отправляем через WebApp API если доступно
      if (window.Telegram?.WebApp?.sendData) {
        console.log('📤 Analytics Test: Отправляем через WebApp.sendData');
        window.Telegram.WebApp.sendData(JSON.stringify({
          event: eventName,
          parameters: eventData,
          timestamp: Date.now()
        }));
        console.log('✅ Analytics Test: Событие отправлено через WebApp API');
      } else {
        console.log('ℹ️ Analytics Test: WebApp.sendData недоступен');
      }

    } catch (error) {
      console.error('❌ Analytics Test: Ошибка отправки события:', error);
    }
  }

  getPlatform() {
    if (window.Telegram?.WebApp?.platform) {
      return window.Telegram.WebApp.platform;
    }
    
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) return 'android';
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios';
    if (userAgent.includes('mac')) return 'macos';
    if (userAgent.includes('windows')) return 'windows';
    return 'web';
  }

  // Тестовые методы
  trackAppStart() {
    console.log('🚀 Analytics Test: trackAppStart вызван');
    this.sendEvent('app_start', {
      platform: this.getPlatform(),
      user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
      language_code: window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'ru',
    });
  }

  trackPageView(pageName, additionalData = {}) {
    console.log('📄 Analytics Test: trackPageView вызван', pageName);
    this.sendEvent('page_view', {
      page_name: pageName,
      ...additionalData,
    });
  }

  trackUIInteraction(elementType, elementName, action, additionalData = {}) {
    console.log('👆 Analytics Test: trackUIInteraction вызван', elementType, elementName, action);
    this.sendEvent('ui_interaction', {
      element_type: elementType,
      element_name: elementName,
      action: action,
      ...additionalData,
    });
  }

  trackExerciseStart(exerciseType, settings = {}) {
    console.log('🏃 Analytics Test: trackExerciseStart вызван', exerciseType);
    this.sendEvent('exercise_start', {
      exercise_type: exerciseType,
      settings: settings,
    });
  }

  trackExerciseComplete(exerciseType, duration, results = {}) {
    console.log('✅ Analytics Test: trackExerciseComplete вызван', exerciseType);
    this.sendEvent('exercise_complete', {
      exercise_type: exerciseType,
      duration_seconds: duration,
      results: results,
    });
  }

  trackSettingsChange(settingName, oldValue, newValue) {
    console.log('⚙️ Analytics Test: trackSettingsChange вызван', settingName);
    this.sendEvent('settings_change', {
      setting_name: settingName,
      old_value: oldValue,
      new_value: newValue,
    });
  }

  trackFeatureUsage(featureName, action, additionalData = {}) {
    console.log('🎯 Analytics Test: trackFeatureUsage вызван', featureName, action);
    this.sendEvent('feature_usage', {
      feature_name: featureName,
      action: action,
      ...additionalData,
    });
  }

  trackSubscriptionAction(action, planType = null, additionalData = {}) {
    console.log('💳 Analytics Test: trackSubscriptionAction вызван', action, planType);
    this.sendEvent('subscription_action', {
      action: action,
      plan_type: planType,
      ...additionalData,
    });
  }

  // Метод для ручного тестирования
  testAnalytics() {
    console.log('🧪 Analytics Test: Запускаем тестирование...');
    
    // Проверяем состояние
    console.log('🔍 Состояние SDK:');
    console.log('  - isInitialized:', this.isInitialized);
    console.log('  - eventQueue length:', this.eventQueue.length);
    console.log('  - telegramAnalytics доступен:', !!telegramAnalytics);
    console.log('  - telegramAnalytics.track доступен:', typeof telegramAnalytics?.track === 'function');
    console.log('  - WebApp доступен:', !!window.Telegram?.WebApp);
    console.log('  - WebApp.sendData доступен:', typeof window.Telegram?.WebApp?.sendData === 'function');
    
    // Отправляем тестовое событие
    this.sendEvent('test_event', {
      test_parameter: 'test_value',
      timestamp: Date.now(),
    });
    
    return {
      isInitialized: this.isInitialized,
      queueLength: this.eventQueue.length,
      sdkAvailable: !!telegramAnalytics,
      trackMethodAvailable: typeof telegramAnalytics?.track === 'function',
      webAppAvailable: !!window.Telegram?.WebApp,
      sendDataAvailable: typeof window.Telegram?.WebApp?.sendData === 'function',
    };
  }
}

// Создаем единственный экземпляр сервиса
const analyticsTestService = new TelegramAnalyticsTest();

// Добавляем глобальный метод для тестирования
window.testTelegramAnalytics = () => {
  return analyticsTestService.testAnalytics();
};

console.log('🔍 Analytics Test: Сервис создан и доступен как window.testTelegramAnalytics()');

export default analyticsTestService; 