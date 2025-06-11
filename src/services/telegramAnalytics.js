import TelegramAnalytics from '@telegram-apps/analytics';

// The SDK is now initialized in App.js, so we don't need the complex promise logic here.
// This service becomes a simple wrapper around the SDK's track method.

/**
 * Отслеживает кастомное событие.
 * Assumes that `init` has already been called in the main App component.
 * @param {string} eventName - The name of the event.
 * @param {object} [eventData={}] - Дополнительные данные события.
 */
export const trackEvent = (eventName, eventData = {}) => {
  try {
    // Метод track может отсутствовать, если SDK не удалось инициализировать
    // (например, вне окружения Telegram).
    if (TelegramAnalytics && typeof TelegramAnalytics.track === 'function') {
      TelegramAnalytics.track(eventName, eventData);
    }
  } catch (error) {
    // Тихо логируем ошибки, не прерывая работу приложения.
    // Initialization errors are handled in App.js.
    console.error(`Failed to track event "${eventName}":`, error);
  }
};
