import { getCurrentUser } from './telegram';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Конфигурация подписок
export const SUBSCRIPTION_TYPES = {
  MONTHLY: {
    id: 'monthly',
    stars: 299,
    duration: 30,
    title: 'Месячная подписка',
    description: 'Доступ ко всем функциям на 1 месяц',
  },
  QUARTERLY: {
    id: 'quarterly',
    stars: 799,
    duration: 90,
    title: 'Квартальная подписка',
    description: 'Доступ ко всем функциям на 3 месяца (скидка 20%)',
  },
  YEARLY: {
    id: 'yearly',
    stars: 1999,
    duration: 365,
    title: 'Годовая подписка',
    description: 'Доступ ко всем функциям на 1 год (скидка 40%)',
  },
};

// Проверка поддержки Telegram Stars
export const isTelegramStarsSupported = () => {
  try {
    return !!(
      window.Telegram?.WebApp?.isVersionAtLeast &&
      window.Telegram.WebApp.isVersionAtLeast('6.9') &&
      window.Telegram.WebApp.openInvoice
    );
  } catch (error) {
    console.error('Ошибка проверки поддержки Telegram Stars:', error);
    return false;
  }
};

// Создание инвойса для подписки
export const createSubscriptionInvoice = async (subscriptionType) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    const config = SUBSCRIPTION_TYPES[subscriptionType];
    if (!config) {
      throw new Error('Неверный тип подписки');
    }

    const response = await fetch(`${API_URL}/payments/create-invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id.toString(),
        subscriptionType: config.id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка создания инвойса');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка создания инвойса:', error);
    throw error;
  }
};

// Покупка подписки через Telegram Stars
export const purchaseSubscription = async (subscriptionType) => {
  try {
    if (!isTelegramStarsSupported()) {
      throw new Error('Telegram Stars не поддерживается в этой версии приложения');
    }

    const user = getCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    // Создаем инвойс
    const invoiceData = await createSubscriptionInvoice(subscriptionType);
    
    if (!invoiceData.success || !invoiceData.invoiceLink) {
      throw new Error('Не удалось создать инвойс');
    }

    // Открываем платежный интерфейс Telegram
    return new Promise((resolve, reject) => {
      try {
        window.Telegram.WebApp.openInvoice(invoiceData.invoiceLink, (status) => {
          console.log('Payment status:', status);
          
          if (status === 'paid') {
            resolve({
              success: true,
              status: 'paid',
              invoiceId: invoiceData.invoiceId,
              subscriptionType,
            });
          } else if (status === 'cancelled') {
            resolve({
              success: false,
              status: 'cancelled',
              error: 'Платеж отменен пользователем',
            });
          } else if (status === 'failed') {
            reject(new Error('Платеж не удался'));
          } else {
            reject(new Error(`Неизвестный статус платежа: ${status}`));
          }
        });
      } catch (error) {
        console.error('Ошибка открытия платежного интерфейса:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Ошибка покупки подписки:', error);
    throw error;
  }
};

// Проверка статуса платежа
export const checkPaymentStatus = async (invoiceId) => {
  try {
    const response = await fetch(`${API_URL}/payments/status/${invoiceId}`);
    
    if (!response.ok) {
      throw new Error('Ошибка проверки статуса платежа');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка проверки статуса платежа:', error);
    throw error;
  }
};

// Возврат средств
export const refundPayment = async (subscriptionId) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    const response = await fetch(`${API_URL}/payments/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id.toString(),
        subscriptionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка возврата средств');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка возврата средств:', error);
    throw error;
  }
};

// Получение информации о подписке
export const getSubscriptionInfo = (subscriptionType) => {
  return SUBSCRIPTION_TYPES[subscriptionType] || null;
};

// Проверка доступности функций премиум подписки
export const isPremiumFeatureAvailable = async () => {
  try {
    const user = getCurrentUser();
    if (!user) return false;

    const response = await fetch(`${API_URL}/subscriptions/status/${user.id}`);
    if (!response.ok) return false;

    const data = await response.json();
    return data.isActive;
  } catch (error) {
    console.error('Ошибка проверки премиум функций:', error);
    return false;
  }
};

export default {
  SUBSCRIPTION_TYPES,
  isTelegramStarsSupported,
  createSubscriptionInvoice,
  purchaseSubscription,
  checkPaymentStatus,
  refundPayment,
  getSubscriptionInfo,
  isPremiumFeatureAvailable,
}; 