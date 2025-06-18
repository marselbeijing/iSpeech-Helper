import { getCurrentUser } from './telegram';

const API_URL = process.env.REACT_APP_API_URL || 'https://ispeech-backend.onrender.com/api';

const SUBSCRIPTION_TYPES = {
  MONTHLY: {
    id: 'monthly',
    stars: 300,
    duration: 30, // дней
  },
  QUARTERLY: {
    id: 'quarterly',
    stars: 720,
    duration: 90, // дней
  },
  YEARLY: {
    id: 'yearly',
    stars: 2160,
    duration: 365, // дней
  },
};

// Инициализация Telegram Stars
export const initTelegramStars = () => {
  if (window.Telegram?.WebApp?.Stars) {
    return window.Telegram.WebApp.Stars;
  }
  return null;
};

// Проверка статуса подписки
export const checkSubscriptionStatus = async () => {
  try {
    const user = getCurrentUser();
    if (!user) {
      console.log('Пользователь не найден при проверке подписки');
      return { error: 'Пользователь не авторизован' };
    }

    console.log(`Проверяем подписку для пользователя: ${user.id}`);
    const url = `${API_URL}/subscriptions/status/${user.id}`;
    console.log(`Запрос к: ${url}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Ответ сервера: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.log('Подписка не найдена (404)');
        return {
          isActive: false,
          type: null,
          expiresAt: null,
        };
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Данные подписки получены:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при проверке подписки:', error);
    
    // Обработка разных типов ошибок
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { error: 'Проблема с сетью. Проверьте соединение с интернетом.' };
    }
    
    if (error.message.includes('CORS')) {
      return { error: 'Ошибка настройки сервера. Обратитесь к администратору.' };
    }
    
    return { error: `Ошибка сервера: ${error.message}` };
  }
};

// Покупка подписки
export const purchaseSubscription = async (type) => {
  try {
    const stars = initTelegramStars();
    if (!stars) {
      throw new Error('Telegram Stars не инициализирован');
    }

    const subscription = SUBSCRIPTION_TYPES[type];
    if (!subscription) {
      throw new Error('Неверный тип подписки');
    }

    const user = getCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    // Запрос на покупку
    const result = await stars.purchase({
      productId: subscription.id,
      amount: subscription.stars,
    });

    if (result.status === 'success') {
      // Отправляем информацию о покупке на бэкенд
      const response = await fetch(`${API_URL}/subscriptions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          type: subscription.id,
          stars: subscription.stars,
          transactionId: result.transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await response.json();
      return {
        success: true,
        subscription: data.subscription,
      };
    }

    return {
      success: false,
      error: result.error || 'Ошибка при покупке подписки',
    };
  } catch (error) {
    console.error('Ошибка при покупке подписки:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Получение информации о подписке
export const getSubscriptionInfo = (type) => {
  return SUBSCRIPTION_TYPES[type] || null;
};

export default {
  initTelegramStars,
  checkSubscriptionStatus,
  purchaseSubscription,
  getSubscriptionInfo,
}; 