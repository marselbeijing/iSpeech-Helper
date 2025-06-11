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
import DAFMAF from './components/DAFMAF';
import BreathingExercises from './components/BreathingExercises';
import TongueTwisters from './components/TongueTwisters';
import MetronomeReader from './components/MetronomeReader';
import EmotionsTrainer from './components/EmotionsTrainer';

// Создаем собственный модуль аналитики
window.TelegramAnalytics = {
  token: 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=',
  appName: 'ispeech_helper',
  
  // Генерируем UUID для сессии
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // Получаем или создаем session_id
  getSessionId() {
    if (!this.sessionId) {
      this.sessionId = this.generateUUID();
    }
    return this.sessionId;
  },

  // Получаем user_id из Telegram WebApp или генерируем
  getUserId() {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      return window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    // Генерируем фиктивный user_id для тестирования
    if (!this.userId) {
      this.userId = Math.floor(Math.random() * 1000000000) + 100000000;
    }
    return this.userId;
  },
  
  async sendEvent(eventName, eventData = {}) {
    try {
      const payload = {
        events: [{
          event_name: eventName,
          user_id: this.getUserId(),
          session_id: this.getSessionId(),
          timestamp: Date.now(),
          event_data: eventData,
          platform: 'web',
          app_name: this.appName
        }]
      };

      console.log('📤 Отправляем событие:', eventName, payload);
      
      const response = await fetch('https://tganalytics.xyz/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TGA-Auth-Token': this.token,
          'Authorization': `Bearer ${this.token}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
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
  },

  // Основные события согласно документации
  appShow() {
    this.sendEvent('app-init');
  },

  appHide() {
    this.sendEvent('app-hide');
  },

  screenView(screenName) {
    this.sendEvent('custom-event', { 
      screen_name: screenName,
      event_type: 'screen_view'
    });
  },

  buttonClick(buttonName, screenName = null) {
    this.sendEvent('custom-event', { 
      button_name: buttonName,
      event_type: 'button_click',
      ...(screenName && { screen_name: screenName })
    });
  },

  customEvent(eventName, customData = {}) {
    this.sendEvent('custom-event', {
      event_name: eventName,
      custom_data: customData
    });
  }
};

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/functions',
        element: <Functions />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/progress',
        element: <Progress />
      },
      {
        path: '/assistant',
        element: <Assistant />
      },
      {
        path: '/smooth-reader',
        element: <SmoothReader />
      },
      {
        path: '/dafmaf',
        element: <DAFMAF />
      },
      {
        path: '/breathing',
        element: <BreathingExercises />
      },
      {
        path: '/tongue-twisters',
        element: <TongueTwisters />
      },
      {
        path: '/metronome',
        element: <MetronomeReader />
      },
      {
        path: '/emotions',
        element: <EmotionsTrainer />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

// Main App component
const App = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  
  // Функция для проверки доступности функций Telegram WebApp
  const isTelegramWebAppAvailable = () => {
    return window.Telegram && window.Telegram.WebApp;
  };

  // Функция для проверки поддержки методов установки цветов
  const isColorMethodsSupported = () => {
    if (!isTelegramWebAppAvailable()) return false;
    const version = window.Telegram.WebApp.version;
    return version && parseFloat(version) > 6.0;
  };
  
  const updateTheme = (isDark) => {
    setDarkMode(isDark);
    setThemeMode(isDark ? 'dark' : 'light');
    
    if (window.Telegram?.WebApp?.isExpanded && isColorMethodsSupported()) {
      try {
        window.Telegram.WebApp.setHeaderColor(isDark ? '#17212B' : '#FFFFFF');
        window.Telegram.WebApp.setBackgroundColor(isDark ? '#1F2936' : '#F0F2F5');
      } catch (error) {
        console.warn('Error setting Telegram WebApp colors:', error);
      }
    }
  };

  // Загрузка сохраненных настроек при запуске
  useEffect(() => {
    const savedSettings = getUserSettings();
    if (savedSettings) {
      updateTheme(savedSettings.darkMode || false);
    }
  }, []);

  // Обработчик события изменения темы из настроек
  useEffect(() => {
    const handleThemeChange = (event) => {
      const isDark = event.detail.darkMode;
      updateTheme(isDark);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);
  
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Функция для установки цветов
    const setColors = () => {
      if (isColorMethodsSupported()) {
        try {
          window.Telegram.WebApp.setHeaderColor(isDark ? '#17212B' : '#FFFFFF');
          window.Telegram.WebApp.setBackgroundColor(isDark ? '#1F2936' : '#F0F2F5');
        } catch (error) {
          console.warn('Error setting Telegram WebApp colors:', error);
        }
      }
    };

    // Установка начальных цветов
    setColors();

    // Обработка изменения темы
    if (isTelegramWebAppAvailable()) {
      try {
        const colorScheme = window.Telegram.WebApp.colorScheme;
        setDarkMode(colorScheme === 'dark');
        setThemeMode(colorScheme === 'dark' ? 'dark' : 'light');
        setColors();

        window.Telegram.WebApp.onEvent('themeChanged', () => {
          try {
            const newColorScheme = window.Telegram.WebApp.colorScheme;
            setDarkMode(newColorScheme === 'dark');
            setThemeMode(newColorScheme === 'dark' ? 'dark' : 'light');
            setColors();
          } catch (error) {
            console.warn('Error handling theme change:', error);
          }
        });
      } catch (error) {
        console.warn('Error setting up theme listener:', error);
      }
    } else {
      // Если Telegram WebApp недоступен, используем системные настройки
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(mediaQuery.matches);
      setThemeMode(mediaQuery.matches ? 'dark' : 'light');

      mediaQuery.addEventListener('change', (e) => {
        setDarkMode(e.matches);
        setThemeMode(e.matches ? 'dark' : 'light');
      });
    }
  }, []);
  
  // Создаем тему на основе настроек
  const theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode: themeMode,
      primary: {
        ...baseTheme.palette.primary,
        main: themeMode === 'dark' ? telegramColors.dark.primary : telegramColors.light.primary,
        light: themeMode === 'dark' ? telegramColors.dark.secondary : telegramColors.light.secondary,
      },
      background: {
        default: themeMode === 'dark' ? telegramColors.dark.background : telegramColors.light.background,
        paper: themeMode === 'dark' ? telegramColors.dark.paper : telegramColors.light.paper,
      },
      text: {
        primary: themeMode === 'dark' ? telegramColors.dark.text : telegramColors.light.text,
        secondary: themeMode === 'dark' ? telegramColors.dark.textSecondary : telegramColors.light.textSecondary,
      },
      divider: themeMode === 'dark' ? telegramColors.dark.divider : telegramColors.light.divider,
    },
  });

  // Инициализация Telegram Analytics
  useEffect(() => {
    // Отправляем событие запуска приложения
    window.TelegramAnalytics.appShow();
    window.TelegramAnalytics.screenView('home');

    // Глобальные функции для тестирования
    window.testAnalytics = () => {
      window.TelegramAnalytics.customEvent('browser_test', {
        test_type: 'manual_test',
        timestamp: Date.now(),
        user_agent: navigator.userAgent.substring(0, 100)
      });
    };

    window.checkAnalytics = async () => {
      try {
        const response = await fetch('https://tganalytics.xyz/events', {
          method: 'GET',
          headers: {
            'TGA-Auth-Token': window.TelegramAnalytics.token,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('📊 Analytics data:', data);
          return data;
        } else {
          console.log('❌ Failed to fetch analytics:', response.status);
        }
      } catch (error) {
        console.error('❌ Error checking analytics:', error);
      }
    };

    console.log('🚀 Telegram Analytics инициализирован');
    console.log('🔧 Доступные функции:');
    console.log('- testAnalytics() - отправить тестовое событие');
    console.log('- checkAnalytics() - проверить записанные события');
    
    // Показываем информацию о пользователе и сессии
    console.log('👤 User ID:', window.TelegramAnalytics.getUserId());
    console.log('🔗 Session ID:', window.TelegramAnalytics.getSessionId());
    console.log('📱 Telegram WebApp доступен:', !!window.Telegram?.WebApp);
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      console.log('👤 Telegram User:', window.Telegram.WebApp.initDataUnsafe.user);
    }

    // Отслеживание закрытия приложения
    const handleBeforeUnload = () => {
      window.TelegramAnalytics.appHide();
    };

    // Отслеживание навигации
    const handleCustomEvent = (event) => {
      if (event.detail?.eventType) {
        window.TelegramAnalytics.customEvent(event.detail.eventType, event.detail.data || {});
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('analyticsEvent', handleCustomEvent);

    // Очистка
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('analyticsEvent', handleCustomEvent);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App; 