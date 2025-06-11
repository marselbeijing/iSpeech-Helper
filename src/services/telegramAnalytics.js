import TelegramAnalytics from '@telegram-apps/analytics';

// Конфигурация для TG Analytics
const ANALYTICS_CONFIG = {
  token: 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=',
  appName: 'ispeech_helper',
  appUrl: 'https://t.me/iSpeechHelper_bot'
};

class TelegramAnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.eventQueue = [];
  }

  // Инициализация аналитики
  async init() {
    try {
      // Проверяем доступность Telegram WebApp
      if (!window.Telegram?.WebApp) {
        console.warn('Telegram WebApp не доступен');
        return false;
      }

      // Проверяем наличие initData
      if (!window.Telegram.WebApp.initData) {
        console.warn('Telegram WebApp initData недоступен');
        return false;
      }

      // Инициализируем SDK
      TelegramAnalytics.init(ANALYTICS_CONFIG);
      
      this.isInitialized = true;
      console.log('✅ Telegram Analytics инициализирован успешно');
      
      // Обрабатываем очередь событий
      this.flushEventQueue();
      
      // Отправляем событие инициализации
      this.trackEvent('app_initialized');
      
      return true;
    } catch (error) {
      console.error('❌ Ошибка инициализации Telegram Analytics:', error);
      return false;
    }
  }

  // Отслеживание события
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized) {
      // Добавляем в очередь, если не инициализировано
      this.eventQueue.push({ eventName, parameters, timestamp: Date.now() });
      console.log(`📥 Событие "${eventName}" добавлено в очередь`);
      return;
    }

    try {
      // Отправляем событие
      TelegramAnalytics.track(eventName, {
        ...parameters,
        timestamp: Date.now(),
        app_version: '1.0.0'
      });
      
      console.log(`📊 Отправлено событие: ${eventName}`, parameters);
    } catch (error) {
      console.error(`❌ Ошибка отправки события "${eventName}":`, error);
    }
  }

  // Обработка очереди событий
  flushEventQueue() {
    if (this.eventQueue.length === 0) return;
    
    console.log(`📤 Обработка ${this.eventQueue.length} событий из очереди`);
    
    const events = [...this.eventQueue];
    this.eventQueue = [];
    
    events.forEach(({ eventName, parameters }) => {
      this.trackEvent(eventName, parameters);
    });
  }

  // Предустановленные события для iSpeech Helper
  
  // Запуск приложения
  trackAppLaunch() {
    this.trackEvent('app_launch', {
      source: 'telegram_webapp'
    });
  }

  // Использование функции
  trackFunctionUsage(functionName, duration = null) {
    this.trackEvent('function_used', {
      function_name: functionName,
      duration: duration
    });
  }

  // Завершение упражнения
  trackExerciseCompleted(exerciseType, duration, score = null) {
    this.trackEvent('exercise_completed', {
      exercise_type: exerciseType,
      duration_seconds: duration,
      score: score
    });
  }

  // Навигация между страницами
  trackPageView(pageName, timeSpent = null) {
    this.trackEvent('page_view', {
      page_name: pageName,
      time_spent: timeSpent
    });
  }

  // Изменение настроек
  trackSettingsChange(settingName, newValue) {
    this.trackEvent('settings_changed', {
      setting_name: settingName,
      new_value: newValue
    });
  }

  // Ошибки
  trackError(errorType, errorMessage) {
    this.trackEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage
    });
  }

  // Достижения
  trackAchievement(achievementName) {
    this.trackEvent('achievement_unlocked', {
      achievement_name: achievementName
    });
  }

  // Сессия пользователя
  trackSessionStart() {
    this.trackEvent('session_start');
  }

  trackSessionEnd(duration) {
    this.trackEvent('session_end', {
      session_duration: duration
    });
  }

  // Проверка статуса инициализации
  isReady() {
    return this.isInitialized;
  }

  // Получение информации о пользователе
  getUserInfo() {
    if (!window.Telegram?.WebApp?.initDataUnsafe?.user) {
      return null;
    }
    
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      language_code: user.language_code
    };
  }
}

// Создаем единственный экземпляр
const telegramAnalyticsService = new TelegramAnalyticsService();

export default telegramAnalyticsService; 