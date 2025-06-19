import { getCurrentUser } from './telegram';

// Заглушки для работы со звездами
export const getStarsBalance = async () => 0;
export const addReferralStars = async () => false;
export const useStars = async () => false;

// Проверка достаточности звезд для покупки
export const hasEnoughStars = async (amount) => {
  const balance = await getStarsBalance();
  return balance >= amount;
};

// Конвертация суммы в звезды
export const convertToStars = (amount) => {
  return Math.floor(amount * 0.2); // 20% от суммы в звездах
};

// Конфигурация подписок
const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    id: 'monthly_premium',
    title: 'Месячная подписка Premium',
    description: 'Полный доступ ко всем функциям на 1 месяц',
    amount: 300, // stars
    duration: 30, // дней
  },
  QUARTERLY: {
    id: 'quarterly_premium', 
    title: 'Квартальная подписка Premium',
    description: 'Полный доступ ко всем функциям на 3 месяца (скидка 20%)',
    amount: 720, // stars
    duration: 90, // дней
  },
  YEARLY: {
    id: 'yearly_premium',
    title: 'Годовая подписка Premium', 
    description: 'Полный доступ ко всем функциям на 1 год (скидка 40%)',
    amount: 2160, // stars
    duration: 365, // дней
  },
};

// Проверка доступности Telegram Stars
export const isStarsAvailable = () => {
  // Проверяем наличие Telegram WebApp
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return false;
  
  // Для Telegram Stars нужны: WebApp, пользователь и функция openInvoice
  const hasUser = !!webApp.initDataUnsafe?.user;
  const hasOpenInvoice = typeof webApp.openInvoice === 'function';
  const hasVersion = webApp.isVersionAtLeast ? webApp.isVersionAtLeast('6.1') : true;
  
  // Дополнительная информация для отладки
  const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  console.log('Telegram WebApp platform:', webApp.platform);
  console.log('Has user:', hasUser);
  console.log('Version check:', hasVersion);
  console.log('Has openInvoice:', hasOpenInvoice);
  console.log('Has showInvoice:', typeof webApp.showInvoice === 'function');
  console.log('Is mobile device (UA):', isMobileDevice);
  console.log('Is touch device:', isTouchDevice);
  console.log('WebApp version:', webApp.version);
  
  // Telegram Stars доступны если есть WebApp с пользователем И функция openInvoice
  return hasUser && hasVersion && hasOpenInvoice;
};

// Создание инвойса для покупки
export const createInvoice = async (planType) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    const plan = SUBSCRIPTION_PLANS[planType];
    if (!plan) {
      throw new Error('Неверный тип подписки');
    }

    // Создаем безопасный payload
    const payload = {
      userId: user.id,
      planType: planType,
      planId: plan.id,
      timestamp: Date.now(),
    };

    // Создаем инвойс через Telegram WebApp API
    const invoice = {
      title: plan.title,
      description: plan.description,
      payload: JSON.stringify(payload),
      provider_token: '', // Пустой для Telegram Stars
      currency: 'XTR', // Telegram Stars currency
      prices: [{
        label: plan.title,
        amount: plan.amount, // amount in stars
      }],
      start_parameter: `premium_${planType.toLowerCase()}`,
      photo_url: 'https://i-speech-helper-uce4.vercel.app/assets/telegram-star.png',
      photo_size: 512,
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: false,
      need_email: false,
      need_shipping_address: false,
      send_phone_number_to_provider: false,
      send_email_to_provider: false,
      is_flexible: false,
    };

    console.log('Создан инвойс:', invoice);
    return invoice;
  } catch (error) {
    console.error('Ошибка создания инвойса:', error);
    throw error;
  }
};

// Инициация платежа через Telegram Stars
export const purchaseWithStars = async (planType) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Начинаем покупку для плана:', planType);
      
      const webApp = window.Telegram?.WebApp;
      if (!webApp) {
        throw new Error('Telegram WebApp недоступен');
      }

      const user = getCurrentUser();
      if (!user) {
        throw new Error('Пользователь не авторизован');
      }

      const plan = SUBSCRIPTION_PLANS[planType];
      if (!plan) {
        throw new Error('Неверный тип подписки');
      }

      // Проверяем доступность openInvoice
      if (typeof webApp.openInvoice !== 'function') {
        throw new Error('Функция openInvoice недоступна в этой версии Telegram');
      }

      console.log('Создаем инвойс через WebApp API...');
      
      // Создаем уникальный payload
      const payload = JSON.stringify({
        userId: user.id,
        planType: planType,
        planId: plan.id,
        timestamp: Date.now(),
        appName: 'iSpeechHelper'
      });

      // Параметры инвойса для Telegram Stars
      const invoiceParams = {
        title: plan.title,
        description: plan.description,
        payload: payload,
        provider_token: '', // Пустой для Telegram Stars
        currency: 'XTR', // Telegram Stars
        prices: [{
          label: plan.title,
          amount: plan.amount
        }],
        photo_url: 'https://i-speech-helper-uce4.vercel.app/assets/telegram-star.png',
        photo_size: 512,
        photo_width: 512,
        photo_height: 512,
        need_name: false,
        need_phone_number: false,
        need_email: false,
        need_shipping_address: false,
        send_phone_number_to_provider: false,
        send_email_to_provider: false,
        is_flexible: false
      };

      console.log('Параметры инвойса:', invoiceParams);

      // Открываем инвойс через Telegram WebApp
      webApp.openInvoice(invoiceParams, (status) => {
        console.log('Статус платежа:', status);
        
        if (status === 'paid') {
          console.log('Платеж успешно завершен!');
          resolve({
            success: true,
            status: 'paid',
            plan: plan
          });
        } else if (status === 'cancelled') {
          console.log('Платеж отменен пользователем');
          resolve({
            success: false,
            cancelled: true,
            status: 'cancelled'
          });
        } else if (status === 'failed') {
          console.log('Платеж не удался');
          resolve({
            success: false,
            status: 'failed',
            error: 'Платеж не удался'
          });
        } else {
          console.log('Неизвестный статус платежа:', status);
          resolve({
            success: false,
            status: status,
            error: `Неизвестный статус: ${status}`
          });
        }
      });

    } catch (error) {
      console.error('Ошибка при покупке:', error);
      reject(error);
    }
  });
};

// Получение информации о плане
export const getPlanInfo = (planType) => {
  return SUBSCRIPTION_PLANS[planType] || null;
};

// Получение всех доступных планов
export const getAllPlans = () => {
  return SUBSCRIPTION_PLANS;
};

const starsService = {
  isStarsAvailable,
  createInvoice,
  purchaseWithStars,
  getPlanInfo,
  getAllPlans,
  SUBSCRIPTION_PLANS,
};

export default starsService; 