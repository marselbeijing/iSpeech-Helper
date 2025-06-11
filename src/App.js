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

// Временно отключаем TON Connect для диагностики
// import { TonConnectUIProvider } from '@tonconnect/ui-react';

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
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    console.log('🔗 Сгенерирован Session ID:', uuid);
    return uuid;
  }

  getUserId() {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      const telegramUserId = window.Telegram.WebApp.initDataUnsafe.user.id;
      console.log('👤 Telegram User ID найден:', telegramUserId, typeof telegramUserId);
      return telegramUserId;
    }
    // Для тестирования генерируем фиктивный ID
    if (!this._generatedUserId) {
      this._generatedUserId = Math.floor(Math.random() * 1000000000) + 100000000;
      console.log('👤 Сгенерирован User ID:', this._generatedUserId, typeof this._generatedUserId);
    }
    return this._generatedUserId;
  }

  async sendEvent(eventName, eventData = {}) {
    try {
      // Минимальная структура для диагностики ошибки 500
      const eventPayload = [{
        event_name: eventName,
        user_id: this.userId,
        session_id: this.sessionId,
        app_name: this.appName,
        event_data: {
          platform: 'web',
          locale: 'en',
          ...eventData
        }
      }];

      console.log('📤 Отправляем минимальное событие:', eventName);
      console.log('📋 Структура события:', JSON.stringify(eventPayload, null, 2));

      const response = await fetch('https://tganalytics.xyz/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TGA-Auth-Token': this.token,
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(eventPayload)
      });

      console.log('📡 Статус ответа:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`⚠️ Ошибка отправки события: ${response.status}`, errorText);
        
        // Если ошибка 500, попробуем еще более простую структуру
        if (response.status === 500) {
          console.log('🔧 Пробуем упрощенную структуру...');
          return await this.sendSimpleEvent(eventName);
        }
        return false;
      }

      const result = await response.json();
      console.log('✅ Событие отправлено успешно:', eventName, result);
      return true;

    } catch (error) {
      console.error('❌ Критическая ошибка отправки события:', error);
      return false;
    }
  }

  // Упрощенная отправка события для диагностики
  async sendSimpleEvent(eventName) {
    try {
      const simplePayload = [{
        event_name: eventName,
        user_id: this.userId,
        session_id: this.sessionId,
        app_name: this.appName
      }];

      console.log('🧪 Тестируем минимальную структуру:', JSON.stringify(simplePayload, null, 2));

      const response = await fetch('https://tganalytics.xyz/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TGA-Auth-Token': this.token
        },
        body: JSON.stringify(simplePayload)
      });

      console.log('📡 Упрощенный запрос - статус:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`⚠️ Упрощенный запрос тоже неуспешен: ${response.status}`, errorText);
        return false;
      }

      const result = await response.json();
      console.log('✅ Упрощенное событие успешно:', eventName, result);
      return true;

    } catch (error) {
      console.error('❌ Ошибка упрощенного события:', error);
      return false;
    }
  }

  // События согласно официальной документации
  async appInit() {
    return await this.sendEvent('app-init', {
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

  async init() {
    if (this.isInitialized) {
      console.log('⚠️ TelegramAnalytics уже инициализирован');
      return;
    }

    this.isInitialized = true;
    await this.appInit();
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

    // Инициализация аналитики с задержкой между событиями
    const initAnalytics = async () => {
      try {
        await telegramAnalytics.init();
        // Задержка перед отправкой screen_view
        setTimeout(() => {
          telegramAnalytics.screenView('home');
        }, 2000);
      } catch (error) {
        console.error('❌ Ошибка инициализации аналитики:', error);
      }
    };
    
    initAnalytics();

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