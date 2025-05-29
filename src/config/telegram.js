import WebApp from '@twa-dev/sdk';

// Инициализация Telegram WebApp
export const initTelegramWebApp = () => {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      // Расширяем на весь экран
      window.Telegram.WebApp.expand();
      
      // Устанавливаем версию
      const version = window.Telegram.WebApp.version;
      console.log('Telegram WebApp version:', version);
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
    return false;
  }
};

// Проверка доступности функций Telegram WebApp
export const isTelegramWebAppAvailable = () => {
  try {
    return window.Telegram && window.Telegram.WebApp;
  } catch (error) {
    console.error('Error checking Telegram WebApp:', error);
    return false;
  }
};

// Получение данных пользователя
export const getTelegramUser = () => {
  try {
    if (isTelegramWebAppAvailable() && window.Telegram.WebApp.initDataUnsafe) {
      return window.Telegram.WebApp.initDataUnsafe.user;
    }
    return null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

// Отправка данных на сервер
export const sendData = (data) => {
  try {
    if (isTelegramWebApp()) {
      WebApp.sendData(JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

// Показать всплывающее окно
export const showPopup = (params) => {
  try {
    if (isTelegramWebApp()) {
      WebApp.showPopup(params);
    }
  } catch (error) {
    console.error('Error showing popup:', error);
  }
};

// Показать уведомление
export const showAlert = (message) => {
  try {
    if (isTelegramWebApp()) {
      WebApp.showAlert(message);
    }
  } catch (error) {
    console.error('Error showing alert:', error);
  }
}; 