import { getUserSettings } from './storage';

// Проверка поддержки вибрации и возможности её использования
const isVibrationSupported = () => {
  // Проверяем базовую поддержку
  if (!('vibrate' in navigator)) {
    return false;
  }

  // Проверяем, находимся ли мы в iframe
  try {
    // В cross-origin iframe window.parent будет заблокирован
    if (window.self !== window.top) {
      // Мы в iframe, проверяем можем ли использовать вибрацию
      return false;
    }
  } catch (e) {
    // Ошибка доступа означает cross-origin iframe
    return false;
  }

  return true;
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
    // Получаем настройки пользователя
    const settings = getUserSettings();
    
    // Проверяем, включена ли вибрация в настройках
    if (settings && settings.vibrationEnabled === false) {
      return;
    }

    if (!isVibrationSupported()) {
      return;
    }

    const pattern = patterns[type];
    if (pattern) {
      navigator.vibrate(pattern);
    }
  } catch (error) {
    // Тихо игнорируем ошибки вибрации - это не критично
    console.debug('Вибрация недоступна:', error.message);
  }
};

// Функция для отключения вибрации
export const stopVibration = () => {
  try {
    if (isVibrationSupported()) {
      navigator.vibrate(0);
    }
  } catch (error) {
    console.debug('Остановка вибрации недоступна:', error.message);
  }
}; 