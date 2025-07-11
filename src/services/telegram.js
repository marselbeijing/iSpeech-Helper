// Telegram Bot API configuration
const TELEGRAM_BOT_NAME = 'iSpeechHelper_bot';
// const TELEGRAM_BOT_TOKEN = '7743960366:AAEwZM2KhTJYiQpnSuyZVr9dEkM7WGacMi0'; // Не используется в клиентском коде

// Telegram Login Widget configuration
export const telegramLoginConfig = {
  botName: TELEGRAM_BOT_NAME,
  cornerRadius: 8,
  requestAccess: true,
  buttonSize: 'large',
  showUserPhoto: true,
  lang: 'ru',
};

// Function to verify Telegram authentication
export const verifyTelegramAuth = async (authData) => {
  try {
    // В реальном приложении здесь должна быть проверка данных на сервере
    // Для демонстрации просто сохраняем данные в localStorage
    const userData = {
      id: authData.id,
      firstName: authData.first_name,
      lastName: authData.last_name,
      username: authData.username,
      photo_url: authData.photo_url,
      authDate: authData.auth_date,
    };

    localStorage.setItem('telegramUser', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('Error verifying Telegram auth:', error);
    throw error;
  }
};

// Function to get current user
export const getCurrentUser = () => {
  // Сначала пытаемся получить пользователя из Telegram WebApp
  const telegramUser = getTelegramWebAppUser();
  if (telegramUser) {
    return {
      id: telegramUser.id,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      username: telegramUser.username,
      language_code: telegramUser.language_code,
      photo_url: telegramUser.photo_url
    };
  }
  
  // Если не получилось, ищем в localStorage
  const userData = localStorage.getItem('telegramUser');
  if (userData) {
    const user = JSON.parse(userData);
    // Проверяем тестовый язык для демонстрации
    const testLanguage = localStorage.getItem('testLanguage');
    if (testLanguage) {
      user.language_code = testLanguage;
    }
    return user;
  }
  
  // Возвращаем демо-пользователя с английским языком по умолчанию
  const testLanguage = localStorage.getItem('testLanguage') || 'en'; // По умолчанию английский
    return {
      id: 'demo_user',
      firstName: 'Demo',
      lastName: 'User',
      username: 'demo',
      language_code: testLanguage,
      photo_url: null
    };
};

// Function to logout
export const logout = () => {
  localStorage.removeItem('telegramUser');
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Безопасная инициализация Telegram WebApp
export const initTelegramWebApp = () => {
  try {
    if (window.Telegram?.WebApp) {
      const webapp = window.Telegram.WebApp;
      
      // Подавляем ошибки Telegram WebApp
      const originalConsoleError = console.error;
      console.error = function(...args) {
        const message = args.join(' ');
        if (
          message.includes('TIMEOUT') ||
          message.includes('TelegramClient') ||
          message.includes('_updateLoop') ||
          message.includes('Not connected') ||
          message.includes('Connection closed')
        ) {
          return; // Подавляем эти ошибки
        }
        originalConsoleError.apply(console, args);
      };

      // Инициализируем WebApp
      webapp.ready();
      webapp.expand();
      
      return webapp;
    }
    return null;
  } catch (error) {
    console.log('Telegram WebApp не доступен или произошла ошибка инициализации');
    return null;
  }
};

// Получение пользователя из Telegram WebApp
export const getTelegramWebAppUser = () => {
  try {
    const webapp = window.Telegram?.WebApp;
    if (webapp?.initDataUnsafe?.user) {
      return webapp.initDataUnsafe.user;
    }
    return null;
  } catch (error) {
    console.log('Не удалось получить пользователя из Telegram WebApp');
    return null;
  }
}; 