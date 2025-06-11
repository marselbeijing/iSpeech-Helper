import telegramAnalytics from '@telegram-apps/analytics';

// The SDK is now initialized in App.js, so we don't need the complex promise logic here.
// This service becomes a simple wrapper around the SDK's track method.

/**
 * Tracks a custom event.
 * Assumes that `init` has already been called in the main App component.
 * @param {string} eventName - The name of the event.
 * @param {object} [eventData={}] - Additional event data.
 */
export const trackEvent = (eventName, eventData = {}) => {
  try {
    // The `track` function might not exist if the SDK failed to initialize
    // (e.g., outside the Telegram environment).
    if (telegramAnalytics && typeof telegramAnalytics.track === 'function') {
      telegramAnalytics.track(eventName, eventData);
    }
  } catch (error) {
    // Log errors silently without crashing the app.
    // Initialization errors are handled in App.js.
    console.error(`Failed to track event "${eventName}":`, error);
  }
};
