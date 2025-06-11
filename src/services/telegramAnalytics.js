import telegramAnalytics from '@telegram-apps/analytics';

const SDK_AUTH_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=';

let isInitialized = false;

/**
 * Инициализирует Telegram Analytics SDK.
 * Безопасно выполняет инициализацию только один раз.
 */
export const initTelegramAnalytics = () => {
  if (isInitialized || !window.Telegram?.WebApp?.initData) {
    return;
  }

  try {
    telegramAnalytics.init(SDK_AUTH_TOKEN);
    isInitialized = true;
    console.log('Telegram Analytics SDK initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Telegram Analytics SDK:', error);
  }
};

/**
 * Отслеживает кастомное событие.
 * @param {string} eventName - Название события.
 * @param {object} [eventData={}] - Дополнительные данные события.
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (!isInitialized) {
    // Вы можете добавить здесь логику для обработки событий,
    // которые произошли до инициализации, если это необходимо.
    return;
  }

  try {
    telegramAnalytics.track(eventName, eventData);
  } catch (error) {
    console.error(`Failed to track event "${eventName}":`, error);
  }
}; 