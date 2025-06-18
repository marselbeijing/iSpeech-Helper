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
  // Проверяем наличие Telegram WebApp и функции showInvoice
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return false;
  
  // Проверяем наличие функции showInvoice - это главный индикатор
  const hasInvoiceSupport = typeof webApp.showInvoice === 'function';
  
  // Дополнительные проверки для мобильного устройства
  const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Безопасная проверка версии
  let hasNativeFeatures = false;
  try {
    hasNativeFeatures = webApp.isVersionAtLeast && typeof webApp.isVersionAtLeast === 'function' && webApp.isVersionAtLeast('6.0');
  } catch (error) {
    console.log('Ошибка при проверке версии WebApp:', error);
    hasNativeFeatures = false;
  }
  
  console.log('Telegram WebApp platform:', webApp.platform);
  console.log('Has showInvoice:', hasInvoiceSupport);
  console.log('Is mobile device (UA):', isMobileDevice);
  console.log('Is touch device:', isTouchDevice);
  console.log('Has native features:', hasNativeFeatures);
  console.log('WebApp version:', webApp.version);
  
  // Если есть showInvoice - точно поддерживается
  if (hasInvoiceSupport) return true;
  
  // Если это мобильное устройство с поддержкой нативных функций - пробуем
  if (isMobileDevice && hasNativeFeatures) return true;
  
  // Иначе - не поддерживается
  return false;
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

      console.log('WebApp доступен, создаем инвойс...');
      const invoice = await createInvoice(planType);
      console.log('Инвойс создан, пытаемся инициировать платеж...');
      
      // Пытаемся показать инвойс
      if (typeof webApp.showInvoice === 'function') {
        console.log('Показываем инвойс через showInvoice');
        try {
          webApp.showInvoice(invoice, (status) => {
            console.log('Статус платежа:', status);
            if (status === 'paid') {
              resolve({
                success: true,
                planType: planType,
                amount: SUBSCRIPTION_PLANS[planType].amount,
              });
            } else if (status === 'cancelled') {
              resolve({
                success: false,
                cancelled: true,
                error: 'Платеж отменен пользователем',
              });
            } else if (status === 'failed') {
              resolve({
                success: false,
                error: 'Платеж не удался',
              });
            } else {
              resolve({
                success: false,
                error: `Неизвестный статус платежа: ${status}`,
              });
            }
          });
        } catch (invoiceError) {
          console.error('Ошибка при вызове showInvoice:', invoiceError);
          throw invoiceError;
        }
      } else if (typeof webApp.openInvoice === 'function') {
        // Альтернативный метод для некоторых версий
        console.log('Пытаемся использовать openInvoice');
        try {
          webApp.openInvoice(invoice, (status) => {
            console.log('Статус платежа (openInvoice):', status);
            if (status === 'paid') {
              resolve({
                success: true,
                planType: planType,
                amount: SUBSCRIPTION_PLANS[planType].amount,
              });
            } else {
              resolve({
                success: false,
                cancelled: true,
                error: 'Платеж не завершен',
              });
            }
          });
        } catch (invoiceError) {
          console.error('Ошибка при вызове openInvoice:', invoiceError);
          throw invoiceError;
        }
      } else if (webApp.sendData && typeof webApp.sendData === 'function') {
        // Попытка через sendData для старых версий
        console.log('Пытаемся использовать sendData');
        try {
          const paymentData = {
            action: 'purchase',
            planType: planType,
            amount: SUBSCRIPTION_PLANS[planType].amount,
            invoice: invoice
          };
          webApp.sendData(JSON.stringify(paymentData));
          resolve({
            success: false,
            cancelled: true,
            error: 'Платеж инициирован через sendData - проверьте результат в боте',
          });
        } catch (sendDataError) {
          console.error('Ошибка при вызове sendData:', sendDataError);
          throw sendDataError;
        }
      } else {
        // Если ничего не работает, показываем информационное сообщение
        console.log('Никакие методы платежа недоступны, показываем alert');
        const message = `Для покупки ${SUBSCRIPTION_PLANS[planType].title} за ${SUBSCRIPTION_PLANS[planType].amount} звезд обновите Telegram до последней версии или используйте официальное мобильное приложение.`;
        
        if (typeof webApp.showAlert === 'function') {
          try {
            webApp.showAlert(message, () => {
              resolve({
                success: false,
                cancelled: true,
                error: 'Требуется обновление Telegram или использование мобильного приложения',
              });
            });
          } catch (alertError) {
            console.error('Ошибка при вызове showAlert:', alertError);
            // Fallback к обычному alert
            alert(message);
            resolve({
              success: false,
              cancelled: true,
              error: 'Требуется обновление Telegram или использование мобильного приложения',
            });
          }
        } else {
          // Fallback для случаев когда и showAlert недоступен
          alert(message);
          resolve({
            success: false,
            cancelled: true,
            error: 'Требуется обновление Telegram или использование мобильного приложения',
          });
        }
      }

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

export default {
  isStarsAvailable,
  createInvoice,
  purchaseWithStars,
  getPlanInfo,
  getAllPlans,
  SUBSCRIPTION_PLANS,
}; 