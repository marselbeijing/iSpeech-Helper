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
  
  // Для Telegram Stars достаточно наличия WebApp и пользователя
  const hasUser = !!webApp.initDataUnsafe?.user;
  const hasVersion = webApp.isVersionAtLeast ? webApp.isVersionAtLeast('6.1') : true;
  
  // Дополнительная информация для отладки
  const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  console.log('Telegram WebApp platform:', webApp.platform);
  console.log('Has user:', hasUser);
  console.log('Version check:', hasVersion);
  console.log('Has openInvoice:', typeof webApp.openInvoice === 'function');
  console.log('Has showInvoice:', typeof webApp.showInvoice === 'function');
  console.log('Is mobile device (UA):', isMobileDevice);
  console.log('Is touch device:', isTouchDevice);
  console.log('WebApp version:', webApp.version);
  
  // Telegram Stars доступны если есть WebApp с пользователем
  return hasUser && hasVersion;
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

      console.log('Создаем инвойс через бота...');
      
      try {
        // Создаем инвойс на сервере через Bot API
        const apiUrl = 'http://localhost:5001/api/create-invoice';
          
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            planType: planType,
            userInfo: {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username
            }
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Инвойс создан успешно:', result);
          
          // Показываем сообщение пользователю с инструкциями
          const plan = SUBSCRIPTION_PLANS[planType];
          const message = `✨ ${plan.title}

💰 Стоимость: ${plan.amount} ⭐ звезд

📱 Перейдите в @iSpeechHelper_bot для оплаты.
Инвойс уже отправлен вам в бот!`;
          
          if (typeof webApp.showAlert === 'function') {
            webApp.showAlert(message, () => {
              // Открываем чат с ботом
              if (typeof webApp.openTelegramLink === 'function') {
                webApp.openTelegramLink('https://t.me/iSpeechHelper_bot');
              }
            });
          } else {
            alert(message);
          }
          
          resolve({
            success: false,
            cancelled: true,
            error: 'Перейдите в @iSpeechHelper_bot для оплаты',
          });
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Ошибка создания инвойса на сервере');
        }
      } catch (serverError) {
        console.error('Ошибка при создании инвойса через сервер:', serverError);
        
        // Fallback - показываем стандартное сообщение
        const plan = SUBSCRIPTION_PLANS[planType];
        const message = `💳 ${plan.title} - ${plan.amount} ⭐ звезд

Напишите /start боту @iSpeechHelper_bot для покупки подписки.`;
        
        if (typeof webApp.showAlert === 'function') {
          webApp.showAlert(message, () => {
            if (typeof webApp.openTelegramLink === 'function') {
              webApp.openTelegramLink('https://t.me/iSpeechHelper_bot');
            }
          });
        } else {
          alert(message);
        }
        
        resolve({
          success: false,
          cancelled: true,
          error: 'Свяжитесь с ботом для покупки',
        });
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