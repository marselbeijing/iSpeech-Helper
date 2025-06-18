import telegramAnalytics from '@telegram-apps/analytics';

class TelegramAnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.eventQueue = [];
    this.init();
  }

  init() {
    try {
      const analyticsToken = process.env.REACT_APP_TG_ANALYTICS_TOKEN;
      if (analyticsToken && analyticsToken !== 'undefined') {
        telegramAnalytics.init({
          token: analyticsToken,
          appName: 'ispeechhelper',
        });
        this.isInitialized = true;
        console.log('Telegram Analytics инициализирована');
        
        // Обрабатываем очередь событий
        this.processEventQueue();
      }
    } catch (error) {
      console.warn('Ошибка инициализации Telegram Analytics:', error);
    }
  }

  processEventQueue() {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      this.sendEvent(event.name, event.parameters);
    }
  }

  sendEvent(eventName, parameters = {}) {
    if (!this.isInitialized) {
      // Добавляем в очередь если не инициализирована
      this.eventQueue.push({ name: eventName, parameters });
      return;
    }

    try {
      // Отправляем через Telegram Analytics
      if (telegramAnalytics && telegramAnalytics.track) {
        telegramAnalytics.track(eventName, {
          ...parameters,
          timestamp: Date.now(),
          user_agent: navigator.userAgent,
          platform: this.getPlatform(),
        });
      }

      // Также отправляем через WebApp API если доступно
      if (window.Telegram?.WebApp?.sendData) {
        window.Telegram.WebApp.sendData(JSON.stringify({
          event: eventName,
          parameters,
          timestamp: Date.now()
        }));
      }

      console.log(`Analytics event: ${eventName}`, parameters);
    } catch (error) {
      console.warn('Ошибка отправки события аналитики:', error);
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

  // Отслеживание запуска приложения
  trackAppStart() {
    this.sendEvent('app_start', {
      platform: this.getPlatform(),
      user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
      language_code: window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'ru',
    });
  }

  // Отслеживание навигации между страницами
  trackPageView(pageName, additionalData = {}) {
    this.sendEvent('page_view', {
      page_name: pageName,
      ...additionalData,
    });
  }

  // Отслеживание использования функций
  trackFeatureUsage(featureName, action, additionalData = {}) {
    this.sendEvent('feature_usage', {
      feature_name: featureName,
      action: action,
      ...additionalData,
    });
  }

  // Отслеживание упражнений
  trackExerciseStart(exerciseType, settings = {}) {
    this.sendEvent('exercise_start', {
      exercise_type: exerciseType,
      settings: settings,
    });
  }

  trackExerciseComplete(exerciseType, duration, results = {}) {
    this.sendEvent('exercise_complete', {
      exercise_type: exerciseType,
      duration_seconds: duration,
      results: results,
    });
  }

  // Отслеживание настроек
  trackSettingsChange(settingName, oldValue, newValue) {
    this.sendEvent('settings_change', {
      setting_name: settingName,
      old_value: oldValue,
      new_value: newValue,
    });
  }

  // Отслеживание ошибок
  trackError(errorType, errorMessage, context = {}) {
    this.sendEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      context: context,
    });
  }

  // Отслеживание действий с подпиской
  trackSubscriptionAction(action, planType = null, additionalData = {}) {
    this.sendEvent('subscription_action', {
      action: action, // 'view', 'purchase_attempt', 'purchase_success', 'purchase_failed'
      plan_type: planType,
      ...additionalData,
    });
  }

  // Отслеживание социальных действий
  trackSocialAction(action, platform = null, additionalData = {}) {
    this.sendEvent('social_action', {
      action: action, // 'share', 'invite', 'rate'
      platform: platform,
      ...additionalData,
    });
  }

  // Отслеживание достижений
  trackAchievement(achievementId, achievementName) {
    this.sendEvent('achievement_unlocked', {
      achievement_id: achievementId,
      achievement_name: achievementName,
    });
  }

  // Отслеживание времени в приложении
  trackSessionTime(sessionDuration) {
    this.sendEvent('session_end', {
      session_duration_seconds: sessionDuration,
    });
  }

  // Отслеживание взаимодействий с UI
  trackUIInteraction(elementType, elementName, action, additionalData = {}) {
    this.sendEvent('ui_interaction', {
      element_type: elementType, // 'button', 'slider', 'switch', 'tab'
      element_name: elementName,
      action: action, // 'click', 'change', 'swipe'
      ...additionalData,
    });
  }

  // Отслеживание прогресса
  trackProgress(progressType, currentValue, maxValue, additionalData = {}) {
    this.sendEvent('progress_update', {
      progress_type: progressType,
      current_value: currentValue,
      max_value: maxValue,
      percentage: Math.round((currentValue / maxValue) * 100),
      ...additionalData,
    });
  }

  // Отслеживание пользовательских событий
  trackCustomEvent(eventName, customData = {}) {
    this.sendEvent(`custom_${eventName}`, customData);
  }
}

// Создаем единственный экземпляр сервиса
const analyticsService = new TelegramAnalyticsService();

// Автоматически отслеживаем запуск приложения
window.addEventListener('load', () => {
  analyticsService.trackAppStart();
});

// Отслеживаем время сессии
let sessionStartTime = Date.now();
window.addEventListener('beforeunload', () => {
  const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000);
  analyticsService.trackSessionTime(sessionDuration);
});

// Отслеживаем ошибки JavaScript
window.addEventListener('error', (event) => {
  analyticsService.trackError('javascript_error', event.message, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Отслеживаем необработанные promise rejection
window.addEventListener('unhandledrejection', (event) => {
  analyticsService.trackError('unhandled_promise_rejection', event.reason?.message || 'Unknown promise rejection', {
    reason: event.reason,
  });
});

export default analyticsService; 