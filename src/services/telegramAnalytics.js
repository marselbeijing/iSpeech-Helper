const API_URL = 'https://tganalytics.xyz/events';
const TOKEN = 'b3a58e2a-d242-4368-a0d7-5421293a525f';
const APP_NAME = 'iSpeech Helper';

let userInitData = null;

/**
 * Initializes the analytics service with user's initData.
 * This should be called once when the app starts.
 * @param {object} initData - The initData object from Telegram WebApp.
 */
export const initAnalytics = (initData) => {
  if (!initData || !initData.user) {
    console.warn('Analytics: initData is missing or invalid. Tracking will be disabled.');
    return;
  }
  userInitData = initData;
  console.log('Analytics Service Initialized');
  
  // Track the initial app open event
  trackEvent('app_opened', {});
};

/**
 * Tracks a custom event by sending a POST request to the analytics API.
 * @param {string} eventName - The name of the event to track.
 * @param {object} eventData - An object with additional data for the event.
 */
export const trackEvent = async (eventName, eventData) => {
  if (!userInitData) {
    // Silently fail if analytics is not initialized
    return;
  }

  const body = {
    initData: userInitData,
    eventData: {
      name: eventName,
      ...eventData,
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'X-App-Name': APP_NAME,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Analytics API request failed with status ${response.status}`);
    }
    
    console.log(`Event "${eventName}" tracked successfully.`);

  } catch (error) {
    console.error(`Failed to track event "${eventName}":`, error);
  }
}; 