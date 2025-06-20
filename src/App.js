import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';

import './i18n';
import { useTranslation } from 'react-i18next';
import { initTelegramWebApp } from './services/telegram';
import telegramAnalytics from '@telegram-apps/analytics';
import { initAudio } from './services/sound';

// Trial period components
import TrialWelcomeModal from './components/TrialWelcomeModal';
import { getTrialStatus, markWelcomeSeen } from './services/trial';

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
import AnalyticsTest from './pages/AnalyticsTest';

const TELEGRAM_ANALYTICS_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hoZWxwZXIiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL2lTcGVlY2hIZWxwZXJfYm90L2lzcGVlY2giLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwLyJ9!B5PY86VQG7rW63+lZ9B1t642VCbXoDEdKO/UH9tQHCU=';

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
      },
      {
        path: '/analytics-test',
        element: <AnalyticsTest />
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
  const { i18n } = useTranslation();
  const [themeMode, setThemeMode] = useState('light');
  
  // Trial period state
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [trialData, setTrialData] = useState(null);
  
  // Функция для проверки доступности функций Telegram WebApp
  const isTelegramWebAppAvailable = () => {
    return window.Telegram && window.Telegram.WebApp;
  };

  // Функция для проверки поддержки методов установки цветов
  const isColorMethodsSupported = React.useCallback(() => {
    return window.Telegram?.WebApp?.setHeaderColor && 
           window.Telegram?.WebApp?.setBackgroundColor;
  }, []);
  
  const updateTheme = React.useCallback((isDark) => {
    setThemeMode(isDark ? 'dark' : 'light');
    
    if (window.Telegram?.WebApp?.isExpanded && isColorMethodsSupported()) {
      try {
        window.Telegram.WebApp.setHeaderColor(isDark ? '#17212B' : '#FFFFFF');
        window.Telegram.WebApp.setBackgroundColor(isDark ? '#1F2936' : '#F0F2F5');
      } catch (error) {
        console.warn('Error setting Telegram WebApp colors:', error);
      }
    }
  }, [isColorMethodsSupported]);

  // Безопасная инициализация Telegram WebApp и загрузка настроек
  useEffect(() => {
    // Инициализируем Telegram WebApp безопасно
    try {
      initTelegramWebApp();
    } catch (error) {
      console.log('Telegram WebApp инициализация пропущена');
    }

    // Загружаем сохраненные настройки
    const savedSettings = getUserSettings();
    if (savedSettings) {
      updateTheme(savedSettings.darkMode || false);
    }

    // Загружаем статус пробного периода
    const loadTrialStatus = async () => {
      try {
        const status = await getTrialStatus();
        setTrialData(status);
        
        // Показываем приветственное окно если пользователь его еще не видел
        if (!status.hasActiveSubscription && status.trial && !status.trial.hasSeenWelcome) {
          setShowWelcomeModal(true);
        }
      } catch (error) {
        console.error('Ошибка загрузки статуса пробного периода:', error);
      }
    };

    // Загружаем статус с небольшой задержкой чтобы Telegram WebApp успел инициализироваться
    setTimeout(loadTrialStatus, 1000);

    // Добавляем обработчик для инициализации аудио после первого клика
    const handleFirstUserInteraction = async () => {
      try {
        await initAudio();
        console.log('🔊 AudioContext инициализирован после пользовательского жеста');
      } catch (error) {
        console.warn('Не удалось инициализировать AudioContext:', error.message);
      }
      // Удаляем обработчики после первого взаимодействия
      document.removeEventListener('click', handleFirstUserInteraction);
      document.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    // Добавляем обработчики для различных типов взаимодействия
    document.addEventListener('click', handleFirstUserInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    // Cleanup функция
    return () => {
      document.removeEventListener('click', handleFirstUserInteraction);
      document.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [i18n.language, updateTheme]);

  // Обработчик события изменения темы из настроек
  useEffect(() => {
    const handleThemeChange = (event) => {
      const isDark = event.detail.darkMode;
      updateTheme(isDark);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, [updateTheme]);
  
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
        setThemeMode(colorScheme === 'dark' ? 'dark' : 'light');
        setColors();

        window.Telegram.WebApp.onEvent('themeChanged', () => {
          try {
            const newColorScheme = window.Telegram.WebApp.colorScheme;
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
      setThemeMode(mediaQuery.matches ? 'dark' : 'light');

      mediaQuery.addEventListener('change', (e) => {
        setThemeMode(e.matches ? 'dark' : 'light');
      });
    }
  }, [isColorMethodsSupported]);
  
  useEffect(() => {
    // Функция проверки доступности Telegram WebApp
    const checkTelegramWebApp = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        console.log('✅ Telegram WebApp загружен');
        console.log('📱 Платформа:', window.Telegram.WebApp.platform);
        console.log('🆔 Версия:', window.Telegram.WebApp.version);
        console.log('👤 Пользователь:', window.Telegram.WebApp.initDataUnsafe?.user || 'Недоступно');
        return true;
      }
      return false;
    };

    // Инициализация Telegram Analytics SDK
    const initAnalytics = () => {
      try {
        console.log('🔍 Проверка доступности telegramAnalytics:', typeof telegramAnalytics);
        console.log('🔍 Методы SDK:', Object.keys(telegramAnalytics));
        
        telegramAnalytics.init({
          token: TELEGRAM_ANALYTICS_TOKEN,
          appName: 'ispeechhelper',
        });
        
        console.log('✅ Telegram Analytics SDK инициализирован успешно');
        console.log('📊 Токен:', TELEGRAM_ANALYTICS_TOKEN.substring(0, 20) + '...');
        
        // Делаем SDK доступным в консоли для тестирования
        window.telegramAnalyticsSDK = telegramAnalytics;
        window.TELEGRAM_ANALYTICS_TOKEN = TELEGRAM_ANALYTICS_TOKEN;
        
        // Проверяем доступность Telegram WebApp
        if (checkTelegramWebApp()) {
          console.log('🌐 Приложение работает в Telegram WebApp контексте');
        } else {
          console.log('🌐 Приложение работает в обычном браузере');
          // Ждем загрузки Telegram WebApp (для браузерной версии)
          let attempts = 0;
          const maxAttempts = 10;
          const checkInterval = setInterval(() => {
            attempts++;
            if (checkTelegramWebApp()) {
              console.log('✅ Telegram WebApp загружен после ожидания');
              clearInterval(checkInterval);
            } else if (attempts >= maxAttempts) {
              console.log('⚠️ Telegram WebApp не загружен после ожидания');
              clearInterval(checkInterval);
            }
          }, 500);
        }
        
      } catch (error) {
        console.error('❌ Ошибка инициализации Telegram Analytics SDK:', error);
      }
    };

    // Запускаем инициализацию
    initAnalytics();

    // Настраиваем обработчики событий платежей
    const setupPaymentHandlers = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        
        // Обработчик успешного платежа
        webApp.onEvent('invoiceStatus', (eventData) => {
          console.log('📊 Событие платежа получено:', eventData);
          
          if (eventData.status === 'paid') {
            console.log('✅ Платеж успешно завершен!');
            // Можно добавить дополнительную логику обработки успешного платежа
            
            // Отправляем событие аналитики
            if (window.telegramAnalyticsSDK) {
              try {
                window.telegramAnalyticsSDK.track('subscription_purchased', {
                  status: 'success',
                  payload: eventData.payload
                });
              } catch (error) {
                console.warn('Ошибка отправки аналитики платежа:', error);
              }
            }
          } else if (eventData.status === 'cancelled') {
            console.log('❌ Платеж отменен пользователем');
          } else if (eventData.status === 'failed') {
            console.log('💥 Платеж не удался');
          }
        });
        
        console.log('💳 Обработчики событий платежей настроены');
      }
    };

    setupPaymentHandlers();
  }, []);
  
  // Обработчики модального окна пробного периода
  const handleStartTrial = async () => {
    try {
      await markWelcomeSeen();
      setShowWelcomeModal(false);
      // Обновляем данные пробного периода
      const status = await getTrialStatus();
      setTrialData(status);
    } catch (error) {
      console.error('Ошибка при начале пробного периода:', error);
    }
  };

  const handleBuyPremium = () => {
    setShowWelcomeModal(false);
    // Перенаправляем на страницу аккаунта для покупки
    window.location.hash = '/account';
  };

  const handleCloseWelcome = async () => {
    try {
      await markWelcomeSeen();
      setShowWelcomeModal(false);
    } catch (error) {
      console.error('Ошибка при закрытии приветствия:', error);
    }
  };
  
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
      
      {/* Модальное окно приветствия пробного периода */}
      <TrialWelcomeModal
        open={showWelcomeModal}
        onClose={handleCloseWelcome}
        onStartTrial={handleStartTrial}
        onBuyPremium={handleBuyPremium}
      />
    </ThemeProvider>
  );
};

export default App; 