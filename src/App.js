import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';
import WebApp from '@twa-dev/sdk';
import telegramAnalytics from '@telegram-apps/analytics';
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

  // Инициализация аналитики
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        // Проверяем доступность аналитики
        if (window.Telegram.WebApp.initData) {
          // Инициализация аналитики
          console.log('Analytics initialized');
          try {
            telegramAnalytics.init({
              token: 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyX2FuYWx5dGljcyIsImFwcF91cmwiOiJodHRwczovL3QubWUvaVNwZWVjaEhlbHBlcl9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwIn0=!j9+Ln94Vror//YszMapC2bBcM7JNJ3tyOVLFnAUI7xg=',
              appName: 'iSpeech Helper'
            });
            console.log('Telegram Analytics initialized successfully');
          } catch (error) {
            console.error('Error initializing Telegram Analytics:', error);
          }
        } else {
          console.log('Telegram WebApp analytics not available');
        }
      } catch (error) {
        console.warn('Error initializing analytics:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Проверяем, открыто ли приложение через Telegram WebApp
    const isTelegramWebApp = window.Telegram?.WebApp;
    
    if (!isTelegramWebApp) {
      // Если открыто не через Telegram, редиректим на бота
      window.location.href = 'https://t.me/iSpeechHelper_bot';
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App; 