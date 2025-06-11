// Этот сервис заменяет библиотеку @telegram-apps/analytics, отправляя события напрямую.

const ANALYTICS_URL = 'https://tganalytics.xyz/events';
const SDK_AUTH_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=';

let anayticsInitData = null;

/**
 * Сохраняет данные инициализации для последующих вызовов.
 * @param {object} initData - Объект initData из Telegram SDK.
 */
export const initAnalytics = (initData) => {
  if (initData) {
    anayticsInitData = initData;
    console.log('Manual analytics service initialized.');
  }
};

/**
 * Отправляет событие в обход официального SDK.
 * @param {string} eventName - Имя события.
 * @param {object} [eventData={}] - Дополнительные данные.
 */
export const trackEvent = async (eventName, eventData = {}) => {
  if (!anayticsInitData) {
    // console.warn('Analytics not initialized, skipping track event.');
    return;
  }

  const payload = {
    name: eventName,
    data: eventData,
    user: anayticsInitData.user,
    // Другие необходимые поля, которые мы видели в документации
    auth_date: anayticsInitData.authDate,
    hash: anayticsInitData.hash,
    query_id: anayticsInitData.queryId,
  };

  try {
    const response = await fetch(ANALYTICS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SDK_AUTH_TOKEN}`,
      },
      body: JSON.stringify([payload]), // API ожидает массив событий
    });

    if (!response.ok) {
      // const errorBody = await response.text();
      // console.error(`Failed to track event "${eventName}". Status: ${response.status}`, errorBody);
    }
  } catch (error) {
    // console.error(`Error tracking event "${eventName}":`, error);
  }
};
