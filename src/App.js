import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';
import WebApp from '@twa-dev/sdk';
import telegramAnalyticsService from './services/telegramAnalytics';
import AnalyticsDebugger from './utils/analyticsDebug';
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
  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);
  
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

  // Инициализация Telegram Analytics
  useEffect(() => {
    const initAnalytics = async () => {
      try {
        console.log('🚀 Инициализация Telegram Analytics...');
        
        // Небольшая задержка для полной загрузки Telegram WebApp
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const success = await telegramAnalyticsService.init();
        
        if (success) {
          setAnalyticsInitialized(true);
          console.log('✅ Analytics успешно инициализирован');
          
          // Отправляем событие запуска приложения
          telegramAnalyticsService.trackAppLaunch();
          telegramAnalyticsService.trackSessionStart();
          
          // Отслеживаем информацию о пользователе
          const userInfo = telegramAnalyticsService.getUserInfo();
          if (userInfo) {
            console.log('👤 Информация о пользователе:', userInfo);
          }
        } else {
          console.warn('⚠️ Analytics не инициализирован');
        }
      } catch (error) {
        console.error('❌ Ошибка инициализации Analytics:', error);
      }
    };

    initAnalytics();

    // Отслеживание закрытия приложения
    const handleBeforeUnload = () => {
      if (analyticsInitialized) {
        const sessionDuration = Date.now() - performance.timing.navigationStart;
        telegramAnalyticsService.trackSessionEnd(Math.round(sessionDuration / 1000));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
      
      // Отслеживаем изменение темы
      if (analyticsInitialized) {
        telegramAnalyticsService.trackSettingsChange('theme', isDark ? 'dark' : 'light');
      }
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, [analyticsInitialized]);
  
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

  // Глобальный обработчик ошибок для аналитики
  useEffect(() => {
    const handleError = (event) => {
      if (analyticsInitialized) {
        telegramAnalyticsService.trackError('javascript_error', event.error?.message || 'Unknown error');
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [analyticsInitialized]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App; 