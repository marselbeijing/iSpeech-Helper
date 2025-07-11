import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';
import { TrackGroups, TwaAnalyticsProvider } from '@tonsolutions/telemetree-react';
import { init } from '@telegram-apps/sdk-react';

import './i18n';
import { useTranslation } from 'react-i18next';
import { initTelegramWebApp } from './services/telegram';
import telegramAnalytics from '@telegram-apps/analytics';
import { initAudio } from './services/sound';
import { getCurrentUser } from './services/telegram';

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
// import ProtectedComponent from './components/ProtectedComponent';

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
  
  // Безопасное использование хуков SDK
  const [initData, setInitData] = useState(null);
  const [launchParams, setLaunchParams] = useState(null);
  
  // Инициализация SDK
  useEffect(() => {
    try {
      // Инициализируем SDK
      init();
      console.log('✅ Telegram SDK инициализирован');
    } catch (error) {
      console.log('⚠️ Ошибка инициализации SDK:', error.message);
    }
  }, []);
  
  // Получение данных через window.Telegram как fallback
  useEffect(() => {
    try {
      // Используем window.Telegram для получения данных
      if (window.Telegram?.WebApp?.initDataUnsafe) {
        const webAppData = window.Telegram.WebApp.initDataUnsafe;
        setInitData({
          queryId: webAppData.query_id,
          user: webAppData.user,
          chatType: webAppData.chat_type,
          chatInstance: webAppData.chat_instance,
          startParam: webAppData.start_param,
          authDate: webAppData.auth_date,
          hash: webAppData.hash,
        });
        
        setLaunchParams({
          platform: window.Telegram.WebApp.platform,
        });
      }
    } catch (error) {
      console.log('Ошибка получения данных Telegram:', error.message);
    }
  }, []);

  const telegramWebAppData = {
    query_id: initData?.queryId,
    user: initData?.user,
    chat_type: initData?.chatType,
    chat_instance: initData?.chatInstance,
    start_param: initData?.startParam,
    auth_date: initData?.authDate,
    hash: initData?.hash,
    platform: launchParams?.platform,
  };
  
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
        console.log('🔍 Начинаем загрузку статуса пробного периода...');
        
        // Детальная отладка получения пользователя
        console.log('🔍 Отладка получения пользователя:');
        console.log('- window.Telegram:', !!window.Telegram);
        console.log('- window.Telegram.WebApp:', !!window.Telegram?.WebApp);
        console.log('- initDataUnsafe:', window.Telegram?.WebApp?.initDataUnsafe);
        console.log('- localStorage telegramUser:', localStorage.getItem('telegramUser'));
        console.log('- testLanguage:', localStorage.getItem('testLanguage'));
        
        // Проверяем доступность пользователя
        const user = getCurrentUser();
        console.log('👤 Текущий пользователь:', user);
        
        if (!user?.id) {
          console.log('❌ Пользователь не найден, показываем модальное окно для демонстрации');
          // Для демонстрации показываем окно даже без пользователя
          setShowWelcomeModal(true);
          return;
        }
        
        // Получаем статус пробного периода
        const trialStatus = await getTrialStatus(user);
        // trialData удалён как неиспользуемый
        
        // Показываем приветственное окно если пользователь его еще не видел
        if (!trialStatus.hasActiveSubscription && trialStatus.trial && !trialStatus.trial.hasSeenWelcome) {
          console.log('🎉 Показываем приветственное окно пробного периода');
          setShowWelcomeModal(true);
        } else {
          console.log('ℹ️ Приветственное окно не показываем:', {
            hasActiveSubscription: trialStatus.hasActiveSubscription,
            hasSeenWelcome: trialStatus.trial?.hasSeenWelcome
          });
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки статуса пробного периода:', error);
        // В случае ошибки показываем окно для демонстрации
        console.log('🎭 Показываем демо-окно из-за ошибки');
        setShowWelcomeModal(true);
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

    // Инициализация аналитики
    const initAnalytics = () => {
      try {
        // Проверяем, что мы действительно в Telegram WebApp
        const isInTelegram = !!(
          window.Telegram?.WebApp?.initDataUnsafe?.user ||
          window.Telegram?.WebApp?.platform ||
          window.location.search.includes('tgWebAppPlatform')
        );

        if (!isInTelegram) {
          console.log('📱 Приложение запущено вне Telegram, пропускаем инициализацию Analytics');
          return;
        }

        if (!TELEGRAM_ANALYTICS_TOKEN) {
          console.log('⚠️ Токен Analytics не найден');
          return;
        }

        // Инициализация только если есть все необходимые данные
        telegramAnalytics.init({
          token: TELEGRAM_ANALYTICS_TOKEN,
          debug: process.env.NODE_ENV === 'development'
        });
        
        console.log('📊 Telegram Analytics инициализирован успешно');
        
      } catch (error) {
        console.warn('⚠️ Analytics недоступен в режиме браузера:', error.message);
        // Не прерываем выполнение приложения
      }
    };

    // Проверяем Telegram WebApp
    if (checkTelegramWebApp()) {
    initAnalytics();
    } else {
      console.log('⚠️ Telegram WebApp недоступен, работаем в режиме браузера');
    }

    // Настройка обработчиков платежей
    const setupPaymentHandlers = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        // Обработчик успешного платежа
        window.Telegram.WebApp.onEvent('invoiceClosed', (eventData) => {
          console.log('💰 Платеж завершен:', eventData);
          
          if (eventData.status === 'paid') {
            console.log('✅ Платеж успешен!');
            // Здесь можно добавить логику для обработки успешного платежа
            // Например, обновить статус подписки
          } else if (eventData.status === 'cancelled') {
            console.log('❌ Платеж отменен');
          } else if (eventData.status === 'failed') {
            console.log('❌ Платеж не удался');
          }
        });
        
        // Обработчик для popup
        window.Telegram.WebApp.onEvent('popupClosed', (eventData) => {
          console.log('🔔 Popup закрыт:', eventData);
        });
      }
    };

    setupPaymentHandlers();
  }, []);
  
  const handleStartTrial = async () => {
    try {
      console.log('🚀 handleStartTrial вызван');
      
      console.log('🔄 Закрываем модальное окно...');
      setShowWelcomeModal(false);
      console.log('✅ Модальное окно закрыто');
      
      console.log('📊 Обновляем данные пробного периода...');
      const status = await getTrialStatus();
      console.log('📊 Новый статус пробного периода:', status);
      setTrialData(status);
      console.log('✅ handleStartTrial завершен успешно');
    } catch (error) {
      console.error('❌ Ошибка при начале пробного периода:', error);
    }
  };

  const handleBuyPremium = () => {
    console.log('🛒 handleBuyPremium вызван');
    setShowWelcomeModal(false);
    
    // Используем несколько способов навигации для надежности
    const navigateToAccount = () => {
      // Способ 1: Изменяем hash
      window.location.hash = '/account';
      
      // Способ 2: Если hash не сработал, используем replace
      setTimeout(() => {
        if (!window.location.hash.includes('account')) {
          window.location.replace(window.location.origin + window.location.pathname + '#/account');
        }
      }, 100);
      
      // Способ 3: Принудительное обновление если ничего не помогло
      setTimeout(() => {
        if (!window.location.hash.includes('account')) {
          console.log('🔄 Принудительная навигация на /account');
          window.location.href = '#/account';
        }
      }, 300);
    };
    
    // Небольшая задержка для закрытия модального окна
    setTimeout(navigateToAccount, 150);
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

  // Проверяем, запущено ли приложение в Telegram
  const isTelegramApp = window.Telegram?.WebApp && initData?.user;

  const AppContent = () => (
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

  // Если в Telegram, оборачиваем в TwaAnalyticsProvider, иначе рендерим напрямую
  return isTelegramApp ? (
    <TwaAnalyticsProvider
      projectId="846989d7-5b58-4f6a-93ba-715073e6b596"
      apiKey="b6efef23-b414-42d9-ba9b-e011acf410f5"
      trackGroup={TrackGroups.MEDIUM}
      telegramWebAppData={telegramWebAppData}
    >
      <AppContent />
    </TwaAnalyticsProvider>
  ) : (
    <AppContent />
  );
};

export default App; 