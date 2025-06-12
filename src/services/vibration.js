import { getUserSettings } from './storage';

// Проверка поддержки вибрации и окружения
const isVibrationSupported = () => {
  // Проверяем поддержку API
  if (!('vibrate' in navigator)) {
    return false;
  }
  
  // Проверяем, что мы не в iframe (для избежания блокировки браузером)
  try {
    return window.self === window.top;
  } catch (e) {
    // Если не можем проверить (cross-origin), считаем что в iframe
    return false;
  }
};

// Паттерны вибрации для разных событий
const patterns = {
  click: 50,
  success: [50, 50, 50],
  error: [100, 50, 100],
};

// Функция для вибрации
export const vibrate = (type) => {
  if (!isVibrationSupported()) {
    console.log('Вибрация недоступна в текущем окружении');
    return;
  }

  try {
    const pattern = patterns[type];
    if (pattern) {
      navigator.vibrate(pattern);
    }
  } catch (error) {
    console.warn('Ошибка при вызове вибрации:', error);
  }
};

// Функция для отключения вибрации
export const stopVibration = () => {
  if (isVibrationSupported()) {
    navigator.vibrate(0);
  }
}; 