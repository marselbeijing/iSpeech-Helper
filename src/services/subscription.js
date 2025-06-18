import { getCurrentUser } from './telegram';

const API_URL = process.env.REACT_APP_API_URL || 'https://ispeech-backend.onrender.com/api';

// Кэш для результатов проверки подписки
let subscriptionCache = null;
let cacheTimestamp = null;
let pendingRequest = null;
const CACHE_DURATION = 30000; // 30 секунд

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

// Проверка актуальности кэша
const isCacheValid = () => {
  return subscriptionCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
};

// Функция выполнения запроса с retry
const fetchWithRetry = async (url, options, maxRetries = 2) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 секунд

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Ждем перед повторной попыткой
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
};

// Проверка статуса подписки с кэшированием
export const checkSubscriptionStatus = async () => {
  try {
    const user = getCurrentUser();
    if (!user) {
      console.log('Пользователь не найден при проверке подписки');
      return { 
        isActive: false,
        type: null,
        expiresAt: null,
      };
    }

    // Проверяем кэш
    if (isCacheValid()) {
      return subscriptionCache;
    }

    // Если уже есть ожидающий запрос, возвращаем его
    if (pendingRequest) {
      return await pendingRequest;
    }

    // Создаем новый запрос
    const url = `${API_URL}/subscriptions/status/${user.id}`;

    pendingRequest = fetchWithRetry(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return {
            isActive: false,
            type: null,
            expiresAt: null,
          };
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Сохраняем в кэш
      subscriptionCache = data;
      cacheTimestamp = Date.now();
      
      return data;
    }).catch((error) => {
      if (error.name === 'AbortError') {
        throw new Error('Время ожидания запроса истекло');
      }
      throw error;
    }).finally(() => {
      // Очищаем ожидающий запрос
      pendingRequest = null;
    });

    return await pendingRequest;

  } catch (error) {
    // Тихо логируем только если это не таймаут
    if (!error.message.includes('Время ожидания') && error.name !== 'AbortError') {
      console.error('Ошибка при проверке подписки:', error);
    }
    
    // Очищаем ожидающий запрос при ошибке
    pendingRequest = null;
    
    // Обработка разных типов ошибок
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { error: 'Проблема с сетью. Проверьте соединение с интернетом.' };
    }
    
    if (error.message.includes('CORS')) {
      return { error: 'Ошибка настройки сервера. Обратитесь к администратору.' };
    }
    
    // Если это таймаут, возвращаем данные по умолчанию и не показываем ошибку
    if (error.message.includes('Время ожидания запроса истекло') || error.name === 'AbortError') {
      // Тихо возвращаем значения по умолчанию без логирования ошибки
      return {
        isActive: false,
        type: null,
        expiresAt: null,
      };
    }
    
    return { error: `Ошибка сервера: ${error.message}` };
  }
};

// Очистка кэша (например, после покупки подписки)
export const clearSubscriptionCache = () => {
  subscriptionCache = null;
  cacheTimestamp = null;
  pendingRequest = null;
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
      
      // Очищаем кэш после успешной покупки
      clearSubscriptionCache();
      
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

const subscriptionService = {
  initTelegramStars,
  checkSubscriptionStatus,
  purchaseSubscription,
  getSubscriptionInfo,
  clearSubscriptionCache,
};

export default subscriptionService; 