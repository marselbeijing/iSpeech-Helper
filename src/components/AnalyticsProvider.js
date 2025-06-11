import React, { useEffect } from 'react';
import { useInitData, useThemeParams } from '@telegram-apps/sdk-react';
import TelegramAnalytics from '@telegram-apps/analytics';

const SDK_AUTH_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=';

const AnalyticsProvider = ({ children }) => {
  const initData = useInitData();
  const themeParams = useThemeParams();

  useEffect(() => {
    // Инициализируем, только если есть initData
    if (initData) {
      try {
        TelegramAnalytics.init({
          token: SDK_AUTH_TOKEN,
          appName: 'ispeech_helper',
          initData,
          themeParams,
        });
        console.log('Telegram Analytics SDK initialized correctly inside AnalyticsProvider.');
      } catch (error) {
        console.error('Failed to initialize Telegram Analytics SDK:', error);
      }
    }
  }, [initData, themeParams]);

  return <>{children}</>;
};

export default AnalyticsProvider; 