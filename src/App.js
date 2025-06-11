import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';
import WebApp from '@twa-dev/sdk';
import './i18n';
import { useTranslation } from 'react-i18next';

// Components
import Root from './components/Root';
import Home from './pages/Home';
import Functions from './pages/Functions';
import Account from './pages/Account';
import Progress from './pages/Progress';
import Assistant from './pages/Assistant';
import SmoothReader from './components/SmoothReader';

// Аналитика Telegram - правильная реализация
class TelegramAnalytics {
  constructor() {
    this.token = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=';
    this.appName = 'ispeech_helper';
    this.sessionId = this.generateUUID();
    this.userId = this.getUserId();
    this.isInitialized = false;
    
    console.log('🚀 TelegramAnalytics создан');
    console.log('📊 App Name:', this.appName);
    console.log('👤 User ID:', this.userId);
    console.log('🔗 Session ID:', this.sessionId);
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getUserId() {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      return window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    // Для тестирования генерируем фиктивный ID
    if (!this._generatedUserId) {
      this._generatedUserId = Math.floor(Math.random() * 1000000000) + 100000000;
    }
    return this._generatedUserId;
  }

  async sendEvent(eventName, eventData = {}) {
    const eventPayload = [{
      event_name: eventName,
      user_id: this.userId,
      session_id: this.sessionId,
      app_name: this.appName,
      event_data: eventData,
      platform: 'web',
      client_timestamp: Date.now().toString(),
      locale: navigator.language || 'en',
      url_referer: window.location.href
    }];

    console.log('📤 Отправляем событие:', eventName);
    console.log('📋 Полная структура:', JSON.stringify(eventPayload, null, 2));

    try {
      const response = await fetch('https://tganalytics.xyz/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TGA-Auth-Token': this.token,
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(eventPayload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Событие отправлено успешно:', eventName, result);
        return true;
      } else {
        const errorText = await response.text();
        console.warn('⚠️ Ошибка отправки события:', response.status, errorText);
        return false;
      }
    } catch (error) {
      console.error('❌ Сетевая ошибка при отправке события:', error);
      return false;
    }
  }

  // События согласно официальной документации
  appInit() {
    this.sendEvent('app-init', {
      is_premium: window.Telegram?.WebApp?.initDataUnsafe?.user?.is_premium || false,
      start_param: window.Telegram?.WebApp?.initDataUnsafe?.start_param || null
    });
  }

  appHide() {
    this.sendEvent('app-hide');
  }

  customEvent(eventName, customData = {}) {
    this.sendEvent('custom-event', {
      event_name: eventName,
      custom_data: customData
    });
  }

  screenView(screenName) {
    this.customEvent('screen_view', {
      screen_name: screenName,
      timestamp: Date.now()
    });
  }

  buttonClick(buttonName, screenName = null) {
    this.customEvent('button_click', {
      button_name: buttonName,
      ...(screenName && { screen_name: screenName })
    });
  }

  init() {
    if (this.isInitialized) {
      console.log('⚠️ TelegramAnalytics уже инициализирован');
      return;
    }

    this.isInitialized = true;
    this.appInit();
    console.log('🎯 TelegramAnalytics успешно инициализирован');
  }
}

// Создаем глобальный экземпляр аналитики
const telegramAnalytics = new TelegramAnalytics();

// Создаем глобальные функции для удобства
window.TelegramAnalytics = telegramAnalytics;
window.testAnalytics = () => {
  telegramAnalytics.customEvent('manual_test', {
    test_type: 'browser_test',
    timestamp: Date.now(),
    user_agent: navigator.userAgent.substring(0, 100)
  });
};

window.checkAnalytics = async () => {
  console.log('🔍 Проверяем состояние аналитики:');
  console.log('- User ID:', telegramAnalytics.userId);
  console.log('- Session ID:', telegramAnalytics.sessionId);
  console.log('- App Name:', telegramAnalytics.appName);
  console.log('- Инициализирован:', telegramAnalytics.isInitialized);
  console.log('- Telegram WebApp доступен:', !!window.Telegram?.WebApp);
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    console.log('- Telegram User:', window.Telegram.WebApp.initDataUnsafe.user);
  }
};

function App() {
  const [mode, setMode] = useState('light');
  const { i18n } = useTranslation();

  // ... остальной код остается без изменений
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: 'functions', element: <Functions /> },
        { path: 'account', element: <Account /> },
        { path: 'progress', element: <Progress /> },
        { path: 'assistant', element: <Assistant /> },
        { path: 'smooth-reader', element: <SmoothReader /> }
      ]
    }
  ]);

  useEffect(() => {
    const storedSettings = getUserSettings();
    setMode(storedSettings.mode);
    i18n.changeLanguage(storedSettings.language);

    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      WebApp.ready();
      WebApp.expand();
      
      // Получаем цветовую схему из Telegram
      const colorScheme = WebApp.colorScheme;
      if (colorScheme) {
        setMode(colorScheme);
      }
    }

    // Инициализация аналитики
    telegramAnalytics.init();
    telegramAnalytics.screenView('home');

    console.log('🚀 Telegram Analytics готов к работе');
    console.log('🔧 Доступные функции:');
    console.log('- testAnalytics() - отправить тестовое событие');
    console.log('- checkAnalytics() - проверить состояние аналитики');
    console.log('- window.TelegramAnalytics - объект аналитики');

    // Отслеживание закрытия приложения
    const handleBeforeUnload = () => {
      telegramAnalytics.appHide();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [i18n]);

  const theme = createTheme({
    ...baseTheme,
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? telegramColors.dark.primary : telegramColors.light.primary,
        light: mode === 'dark' ? telegramColors.dark.secondary : telegramColors.light.secondary,
      },
      background: {
        default: mode === 'dark' ? telegramColors.dark.background : telegramColors.light.background,
        paper: mode === 'dark' ? telegramColors.dark.paper : telegramColors.light.paper,
      },
      text: {
        primary: mode === 'dark' ? telegramColors.dark.text : telegramColors.light.text,
        secondary: mode === 'dark' ? telegramColors.dark.textSecondary : telegramColors.light.textSecondary,
      },
      divider: mode === 'dark' ? telegramColors.dark.divider : telegramColors.light.divider,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;