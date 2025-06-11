import TelegramAnalytics from '@telegram-apps/analytics';

/**
 * Сервис для работы с Telegram Analytics
 * Документация: https://docs.tganalytics.xyz/
 */
class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.sessionId = this.generateSessionId();
  }

  /**
   * Генерация UUID для session_id
   */
  generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Получение данных пользователя из Telegram WebApp
   */
  getUserData() {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      return {
        user_id: user.id,
        is_premium: user.is_premium || false,
        platform: this.getPlatform(),
        locale: user.language_code || 'en',
        start_param: window.Telegram.WebApp.initDataUnsafe.start_param || '',
      };
    }
    return {
      user_id: Date.now(), // Fallback для разработки
      is_premium: false,
      platform: this.getPlatform(),
      locale: 'ru',
      start_param: '',
    };
  }

  /**
   * Определение платформы
   */
  getPlatform() {
    if (window.Telegram?.WebApp?.platform) {
      return window.Telegram.WebApp.platform;
    }
    return 'web';
  }

  /**
   * Отправка события в аналитику
   */
  async trackEvent(eventName, customData = {}) {
    try {
      const userData = this.getUserData();
      const eventData = {
        event_name: eventName,
        session_id: this.sessionId,
        app_name: 'ispeech_helper',
        client_timestamp: Date.now().toString(),
        url_referer: window.location.href,
        ...userData,
        ...customData
      };

      // Используем SDK для отправки события
      await TelegramAnalytics.track(eventName, eventData);
      console.log('Analytics event tracked:', eventName, eventData);
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }

  // Основные события приложения
  async trackAppInit() {
    await this.trackEvent('app-init');
  }

  async trackAppOpen() {
    await this.trackEvent('app-open');
  }

  async trackPageView(pageName) {
    await this.trackEvent('page-view', {
      custom_data: { page: pageName }
    });
  }

  async trackFeatureUsed(featureName) {
    await this.trackEvent('feature-used', {
      custom_data: { feature: featureName }
    });
  }

  async trackExerciseStarted(exerciseType) {
    await this.trackEvent('exercise-started', {
      custom_data: { exercise_type: exerciseType }
    });
  }

  async trackExerciseCompleted(exerciseType, duration) {
    await this.trackEvent('exercise-completed', {
      custom_data: { 
        exercise_type: exerciseType,
        duration_seconds: duration
      }
    });
  }

  async trackSettingsChanged(settingName, value) {
    await this.trackEvent('settings-changed', {
      custom_data: { 
        setting: settingName,
        value: value
      }
    });
  }

  async trackUserAction(action, details = {}) {
    await this.trackEvent('user-action', {
      custom_data: { 
        action: action,
        ...details
      }
    });
  }

  // TON Connect события (если потребуется в будущем)
  async trackConnectionStarted() {
    await this.trackEvent('connection-started', {
      custom_data: {
        ton_connect_sdk_lib: '3.0.3',
        ton_connect_ui_lib: '2.0.5'
      }
    });
  }

  async trackConnectionSuccess(walletAddress, walletType) {
    await this.trackEvent('connection-success', {
      is_success: true,
      wallet_address: walletAddress,
      wallet_type: walletType,
      custom_data: {
        ton_connect_sdk_lib: '3.0.3',
        ton_connect_ui_lib: '2.0.5'
      }
    });
  }

  async trackConnectionError(errorMessage, errorCode = null) {
    await this.trackEvent('connection-error', {
      is_success: false,
      error_message: errorMessage,
      error_code: errorCode,
      custom_data: {
        ton_connect_sdk_lib: '3.0.3',
        ton_connect_ui_lib: '2.0.5'
      }
    });
  }
}

// Создаем экземпляр сервиса
const analyticsService = new AnalyticsService();

export default analyticsService; 