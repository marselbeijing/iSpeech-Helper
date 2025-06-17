import { getCurrentUser } from './telegram';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SUBSCRIPTION_TYPES = {
  MONTHLY: {
    id: 'monthly',
    stars: 299,
    duration: 30, // дней
  },
  QUARTERLY: {
    id: 'quarterly',
    stars: 799,
    duration: 90, // дней
  },
  YEARLY: {
    id: 'yearly',
    stars: 1999,
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
export const checkSubscriptionStatus = async (userId) => {
  try {
    const user = getCurrentUser();
    const targetUserId = userId || user?.id;
    
    if (!targetUserId) {
      return {
        isActive: false,
        type: null,
        expiresAt: null,
      };
    }

    const response = await fetch(`${API_URL}/subscriptions/status/${targetUserId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get subscription status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка проверки статуса подписки:', error);
    return {
      isActive: false,
      type: null,
      expiresAt: null,
    };
  }
};

// Покупка подписки
export const purchaseSubscription = async (type) => {
  console.warn('purchaseSubscription устарел. Используйте purchaseSubscription из services/payments.js');
  
  // Перенаправляем на новый метод
  const { purchaseSubscription: newPurchaseSubscription } = await import('./payments');
  return newPurchaseSubscription(type.toUpperCase());
};

// Получение информации о подписке
export const getSubscriptionInfo = (type) => {
  const SUBSCRIPTION_TYPES = {
    MONTHLY: {
      id: 'monthly',
      stars: 299,
      duration: 30,
    },
    QUARTERLY: {
      id: 'quarterly',
      stars: 799,
      duration: 90,
    },
    YEARLY: {
      id: 'yearly',
      stars: 1999,
      duration: 365,
    },
  };

  return SUBSCRIPTION_TYPES[type] || null;
};

export default {
  initTelegramStars,
  checkSubscriptionStatus,
  purchaseSubscription,
  getSubscriptionInfo,
}; 