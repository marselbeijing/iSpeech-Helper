import { getUserSettings } from './storage';

// Проверка поддержки вибрации
const isVibrationSupported = () => {
  return 'vibrate' in navigator;
};

// Проверка, что мы в Telegram WebApp (где вибрация может работать)
const isTelegramWebApp = () => {
  return window.Telegram && window.Telegram.WebApp;
};

// Паттерны вибрации для разных событий
const patterns = {
  click: 50,
  success: [50, 50, 50],
  error: [100, 50, 100],
};

// Функция для вибрации
export const vibrate = (type) => {
  try {
    // Проверяем настройки пользователя
    const settings = getUserSettings();
    if (settings && settings.vibrationEnabled === false) {
      return; // Если вибрация отключена в настройках
    }

  if (!isVibrationSupported()) {
    return;
  }

    // В Telegram WebApp используем Telegram API для вибрации
    if (isTelegramWebApp()) {
      try {
        if (window.Telegram.WebApp.HapticFeedback) {
          // Используем Telegram Haptic Feedback вместо navigator.vibrate
          switch (type) {
            case 'click':
              window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
              break;
            case 'success':
              window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
              break;
            case 'error':
              window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
              break;
            default:
              window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
          }
          return;
        }
      } catch (e) {
        console.warn('Telegram HapticFeedback недоступен:', e);
      }
    }

    // Fallback для обычных браузеров
  const pattern = patterns[type];
  if (pattern) {
    navigator.vibrate(pattern);
    }
  } catch (error) {
    console.warn('Ошибка при вибрации:', error);
  }
};

// Функция для отключения вибрации
export const stopVibration = () => {
  try {
  if (isVibrationSupported()) {
    navigator.vibrate(0);
    }
  } catch (error) {
    console.warn('Ошибка при остановке вибрации:', error);
  }
}; 