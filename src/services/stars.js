import { getCurrentUser } from './telegram';

// Заглушки для работы со звездами
export const getStarsBalance = async () => 0;
export const addReferralStars = async () => false;
export const useStars = async () => false;

// Проверка достаточности звезд
export const hasEnoughStars = async (amount) => {
  const balance = await getStarsBalance();
  return balance >= amount;
};

// Конвертация в звезды
export const convertToStars = (amount) => {
  return Math.ceil(amount / 100); // Примерный курс: 1 звезда = 100 единиц
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
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return false;
  
  const hasUser = !!webApp.initDataUnsafe?.user;
  const hasOpenInvoice = typeof webApp.openInvoice === 'function';
  const hasVersion = webApp.isVersionAtLeast ? webApp.isVersionAtLeast('6.1') : true;
  
  console.log('Telegram WebApp platform:', webApp.platform);
  console.log('Has user:', hasUser);
  console.log('Version check:', hasVersion);
  console.log('Has openInvoice:', hasOpenInvoice);
  console.log('WebApp version:', webApp.version);
  
  return hasUser && hasVersion && hasOpenInvoice;
};

// Инициация платежа через Telegram Stars
export const purchaseWithStars = async (planType) => {
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

    console.log('Проверяем доступные методы WebApp...');
    console.log('openInvoice:', typeof webApp.openInvoice);
    
    // Проверяем, что openInvoice действительно функция
    if (typeof webApp.openInvoice !== 'function') {
      const message = `💳 ${plan.title} - ${plan.amount} ⭐ звезд

К сожалению, платежи Telegram Stars недоступны в этой версии приложения.`;
      
      if (typeof webApp.showAlert === 'function') {
        return new Promise((resolve) => {
          webApp.showAlert(message, () => {
            resolve({
              success: false,
              cancelled: true,
              error: 'Платежи недоступны в этой версии Telegram'
            });
          });
        });
      } else {
        return {
          success: false,
          cancelled: true,
          error: 'Платежи недоступны в этой версии Telegram'
        };
      }
    }

    // Параметры инвойса для Telegram Stars
    const invoiceParams = {
      title: plan.title,
      description: plan.description,
      payload: JSON.stringify({
        userId: user.id,
        planType: planType,
        planId: plan.id,
        timestamp: Date.now(),
      }),
      provider_token: '',
      currency: 'XTR',
      prices: [{
        label: plan.title,
        amount: plan.amount
      }],
      need_name: false,
      need_phone_number: false,
      need_email: false,
      need_shipping_address: false,
      send_phone_number_to_provider: false,
      send_email_to_provider: false,
      is_flexible: false
    };

    console.log('Параметры инвойса:', invoiceParams);

    // Возвращаем Promise для корректной обработки
    return new Promise((resolve, reject) => {
      try {
        webApp.openInvoice(invoiceParams, (status) => {
          console.log('Статус платежа:', status);
          
          if (status === 'paid') {
            resolve({
              success: true,
              status: 'paid',
              plan: plan
            });
          } else if (status === 'cancelled') {
            resolve({
              success: false,
              cancelled: true,
              status: 'cancelled'
            });
          } else {
            resolve({
              success: false,
              status: status,
              error: 'Платеж не удался'
            });
          }
        });
      } catch (invoiceError) {
        console.error('Ошибка при вызове openInvoice:', invoiceError);
        reject(new Error(`Ошибка openInvoice: ${invoiceError.message}`));
      }
    });

  } catch (error) {
    console.error('Ошибка при покупке:', error);
    throw error;
  }
};

export { SUBSCRIPTION_PLANS };

const starsService = {
  isStarsAvailable,
  purchaseWithStars,
  SUBSCRIPTION_PLANS,
};

export default starsService; 