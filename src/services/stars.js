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
  
  // Единственный надежный способ - проверить наличие showInvoice
  const hasInvoiceSupport = typeof webApp.showInvoice === 'function';
  
  // Дополнительная информация для отладки
  const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  console.log('Telegram WebApp platform:', webApp.platform);
  console.log('Has showInvoice:', hasInvoiceSupport);
  console.log('Is mobile device (UA):', isMobileDevice);
  console.log('Is touch device:', isTouchDevice);
  console.log('WebApp version:', webApp.version);
  
  // Возвращаем true только если есть showInvoice
  return hasInvoiceSupport;
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
      
      // Проверяем только showInvoice - это единственный надежный метод
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
      } else {
        // Альтернативный метод - отправка инвойса через бота
        console.log('showInvoice недоступен, пытаемся альтернативный метод');
        
        const user = getCurrentUser();
        if (!user) {
          throw new Error('Пользователь не авторизован');
        }

        try {
          // Создаем инвойс на сервере через API
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
            
            // Показываем сообщение пользователю с инструкциями
            const message = `💳 Инвойс создан успешно!

📱 Для оплаты ${SUBSCRIPTION_PLANS[planType].title} за ${SUBSCRIPTION_PLANS[planType].amount} ⭐ звезд:

1️⃣ Перейдите в чат с ботом @iSpeechHelper_bot
2️⃣ Нажмите кнопку "Оплатить" в полученном сообщении
3️⃣ Подтвердите платеж через Telegram Stars

✅ Подписка активируется автоматически после оплаты!`;
            
            if (typeof webApp.showAlert === 'function') {
              webApp.showAlert(message, () => {
                // Открываем чат с ботом
                if (typeof webApp.openTelegramLink === 'function') {
                  webApp.openTelegramLink('https://t.me/iSpeechHelper_bot');
                }
                resolve({
                  success: false,
                  cancelled: true,
                  error: 'Перейдите в чат с ботом для оплаты',
                });
              });
            } else {
              alert(message);
              resolve({
                success: false,
                cancelled: true,
                error: 'Перейдите в чат с ботом для оплаты',
              });
            }
          } else {
            throw new Error('Ошибка создания инвойса на сервере');
          }
        } catch (serverError) {
          console.error('Ошибка при создании инвойса через сервер:', serverError);
          
          // Fallback - показываем стандартное сообщение
          const message = `💳 ${SUBSCRIPTION_PLANS[planType].title} за ${SUBSCRIPTION_PLANS[planType].amount} ⭐ звезд

📱 Для покупки через Telegram Stars:

1️⃣ Убедитесь, что используете официальное мобильное приложение Telegram
2️⃣ Обновите Telegram до последней версии
3️⃣ Попробуйте снова

💡 Альтернативно: свяжитесь с @iSpeechHelper_bot для помощи с оплатой`;
          
          if (typeof webApp.showAlert === 'function') {
            try {
              webApp.showAlert(message, () => {
                resolve({
                  success: false,
                  cancelled: true,
                  error: 'Для покупки используйте мобильное приложение Telegram',
                });
              });
            } catch (alertError) {
              console.error('Ошибка при вызове showAlert:', alertError);
              alert(message);
              resolve({
                success: false,
                cancelled: true,
                error: 'Для покупки используйте мобильное приложение Telegram',
              });
            }
          } else {
            alert(message);
            resolve({
              success: false,
              cancelled: true,
              error: 'Для покупки используйте мобильное приложение Telegram',
            });
          }
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