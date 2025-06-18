import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';
import WebApp from '@twa-dev/sdk';
import './i18n';
import { useTranslation } from 'react-i18next';
import { initTelegramWebApp } from './services/telegram';
import analyticsService from './services/analytics-test';

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

// Определяем токен напрямую для отладки
const ANALYTICS_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hoZWxwZXIiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL2lTcGVlY2hIZWxwZXJfYm90L2lzcGVlY2giLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwLyJ9!B5PY86VQG7rW63+lZ9B1t642VCbXoDEdKO/UH9tQHCU=';

// === Глобальные функции отладки ===
window.debugAnalytics = () => {
  console.log('🔍 Debug Analytics: Проверяем состояние...');
  console.log('Token from env:', process.env.REACT_APP_TG_ANALYTICS_TOKEN ? 'НАЙДЕН' : 'НЕ НАЙДЕН');
  console.log('Token from const:', ANALYTICS_TOKEN ? 'НАЙДЕН' : 'НЕ НАЙДЕН');
  console.log('Token length env:', process.env.REACT_APP_TG_ANALYTICS_TOKEN?.length || 0);
  console.log('Token length const:', ANALYTICS_TOKEN?.length || 0);
  console.log('Telegram WebApp:', !!window.Telegram?.WebApp);
  console.log('Analytics service:', window.analyticsService || 'нет');
  return {
    tokenFromEnv: !!process.env.REACT_APP_TG_ANALYTICS_TOKEN,
    tokenFromConst: !!ANALYTICS_TOKEN,
    tokenLengthEnv: process.env.REACT_APP_TG_ANALYTICS_TOKEN?.length || 0,
    tokenLengthConst: ANALYTICS_TOKEN?.length || 0,
    webApp: !!window.Telegram?.WebApp,
    service: window.analyticsService || null
  };
};
window.testAnalyticsEvent = () => {
  console.log('🧪 Отправляем тестовое событие...');
  if (window.analyticsService) {
    window.analyticsService.trackFeatureUsage('debug_test', 'manual_test');
    return 'Тестовое событие отправлено';
  } else {
    return 'analyticsService не найден';
  }
};
window.initAnalyticsWithToken = () => {
  console.log('🔧 Инициализируем аналитику с фиксированным токеном...');
  try {
    if (window.telegramAnalytics) {
      window.telegramAnalytics.init({
        token: ANALYTICS_TOKEN,
        appName: 'ispeechhelper',
      });
      console.log('✅ Аналитика инициализирована с фиксированным токеном');
      return { success: true, message: 'Аналитика инициализирована' };
    } else {
      console.log('❌ telegramAnalytics недоступен');
      return { success: false, message: 'telegramAnalytics недоступен' };
    }
  } catch (error) {
    console.error('❌ Ошибка инициализации:', error);
    return { success: false, error: error.message };
  }
};
console.log('✅ Глобальные функции отладки добавлены: window.debugAnalytics(), window.testAnalyticsEvent(), window.initAnalyticsWithToken()');

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

  // Безопасная инициализация Telegram WebApp и загрузка настроек
  useEffect(() => {
    // Инициализируем Telegram WebApp безопасно
    try {
      initTelegramWebApp();
    } catch (error) {
      console.log('Telegram WebApp инициализация пропущена');
    }

    // Отслеживание запуска приложения
    analyticsService.trackAppStart();
    
    // Загружаем сохраненные настройки
    const savedSettings = getUserSettings();
    if (savedSettings) {
      updateTheme(savedSettings.darkMode || false);
    }
  }, [i18n.language]);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App; 