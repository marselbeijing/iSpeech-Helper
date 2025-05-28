import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import baseTheme from './theme';
import { getUserSettings } from './services/storage';
import { telegramColors } from './styles/TelegramStyles';
import WebApp from '@twa-dev/sdk';
import telegramAnalytics from '@telegram-apps/analytics';
import './i18n';
import { useTranslation } from 'react-i18next';

// Components
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Functions from './pages/Functions';
import Account from './pages/Account';
import Progress from './pages/Progress';
import SmoothReader from './components/SmoothReader';
import DAFMAF from './components/DAFMAF';
import BreathingExercises from './components/BreathingExercises';
import TongueTwisters from './components/TongueTwisters';
import MetronomeReader from './components/MetronomeReader';
import EmotionsTrainer from './components/EmotionsTrainer';

// Animated Routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/account" element={<Account />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/smooth-reader" element={<SmoothReader />} />
        <Route path="/dafmaf" element={<DAFMAF />} />
        <Route path="/breathing" element={<BreathingExercises />} />
        <Route path="/tongue-twisters" element={<TongueTwisters />} />
        <Route path="/metronome" element={<MetronomeReader />} />
        <Route path="/emotions" element={<EmotionsTrainer />} />
      </Routes>
    </AnimatePresence>
  );
};

// Функция для проверки доступности функций Telegram WebApp
const isTelegramFeatureSupported = (feature) => {
  try {
    if (!window.Telegram?.WebApp?.isExpanded) return false;
    return true;
  } catch (e) {
    console.warn(`Error checking Telegram feature support: ${e.message}`);
    return false;
  }
};

// Main App component
const App = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  
  const updateTheme = (isDark) => {
    setDarkMode(isDark);
    setThemeMode(isDark ? 'dark' : 'light');
    
    if (window.Telegram?.WebApp?.isExpanded && isTelegramFeatureSupported()) {
      window.Telegram.WebApp.setHeaderColor(isDark ? '#17212B' : '#FFFFFF');
      window.Telegram.WebApp.setBackgroundColor(isDark ? '#1F2936' : '#F0F2F5');
    }
  };
  
  useEffect(() => {
    try {
      if (window.Telegram?.WebApp?.isExpanded) {
        const colorScheme = window.Telegram.WebApp.colorScheme;
        updateTheme(colorScheme === 'dark');
        
        window.Telegram.WebApp.onEvent('themeChanged', () => {
          const newColorScheme = window.Telegram.WebApp.colorScheme;
          updateTheme(newColorScheme === 'dark');
        });
      } else {
        const settings = getUserSettings();
        if (settings && typeof settings.darkMode === 'boolean') {
          updateTheme(settings.darkMode);
        }
      }
    } catch (error) {
      console.warn('Telegram WebApp not available, using system settings:', error);
      const settings = getUserSettings();
      if (settings && typeof settings.darkMode === 'boolean') {
        updateTheme(settings.darkMode);
      }
    }
    
    const handleStorageChange = () => {
      const updatedSettings = getUserSettings();
      if (updatedSettings && typeof updatedSettings.darkMode === 'boolean') {
        updateTheme(updatedSettings.darkMode);
      }
    };
    
    const handleCustomThemeChange = (event) => {
      if (event.detail && typeof event.detail.darkMode === 'boolean') {
        updateTheme(event.detail.darkMode);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('themeChanged', handleCustomThemeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChanged', handleCustomThemeChange);
    };
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

  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) {
    telegramAnalytics.init({
      token: 'eyJhcHBfbmFtZSI6ImlzcGVlY2hoZWxwZXJib3QiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL2lTcGVlY2hIZWxwZXJfYm90IiwiYXBwX2RvbWFpbiI6Imh0dHBzOi8vaS1zcGVlY2gtaGVscGVyLTJ1NGQudmVyY2VsLmFwcC8ifQ==!ZkcImen6FpPBw6xfWjRZBKHfMzS80qpeFc/fZ6y+KCA=',
      appName: 'ispeech_helper'
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: theme.palette.background.default,
          transition: 'background 0.3s ease',
          paddingBottom: '56px',
        }}
      >
        <Box
          component="main"
          sx={{
            flex: 1,
          }}
        >
          <AnimatedRoutes />
        </Box>
        <NavigationBar />
      </Box>
    </ThemeProvider>
  );
};

export default App; 