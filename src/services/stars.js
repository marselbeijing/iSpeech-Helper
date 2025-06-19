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
  const hasVersion = webApp.isVersionAtLeast ? webApp.isVersionAtLeast('6.1') : true;
  // Убираем проверку openInvoice, так как используем альтернативный подход
  const hasTelegramLink = typeof webApp.openTelegramLink === 'function' || typeof webApp.openLink === 'function';
  
  console.log('Telegram WebApp platform:', webApp.platform);
  console.log('Has user:', hasUser);
  console.log('Version check:', hasVersion);
  console.log('Has openInvoice:', typeof webApp.openInvoice === 'function');
  console.log('Has openTelegramLink:', typeof webApp.openTelegramLink === 'function');
  console.log('WebApp version:', webApp.version);
  
  // Telegram Stars доступны если есть WebApp с пользователем и возможность открыть ссылку
  return hasUser && hasVersion && hasTelegramLink;
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
    console.log('sendData:', typeof webApp.sendData);
    console.log('openTelegramLink:', typeof webApp.openTelegramLink);
    console.log('showPopup:', typeof webApp.showPopup);

    // Поскольку openInvoice содержит баг, используем альтернативный подход
    console.log('openInvoice содержит баг в текущей версии Telegram WebApp');
    console.log('Используем альтернативный подход через бота...');

    // Создаем сообщение с инструкциями
    const message = `💫 ${plan.title}

💰 Стоимость: ${plan.amount} ⭐ звезд
📝 ${plan.description}

🤖 Для покупки перейдите в @iSpeechHelper_bot и напишите:
/buy_${planType.toLowerCase()}

Или просто напишите /start для выбора подписки.`;

    // Показываем popup с выбором действий
    if (typeof webApp.showPopup === 'function') {
      return new Promise((resolve) => {
        webApp.showPopup({
          title: '💳 Покупка подписки',
          message: message,
          buttons: [
            {
              id: 'open_bot',
              type: 'default',
              text: '🤖 Открыть бота'
            },
            {
              id: 'cancel',
              type: 'cancel',
              text: 'Отмена'
            }
          ]
        }, (buttonId) => {
          console.log('Выбрана кнопка:', buttonId);
          
          if (buttonId === 'open_bot') {
            // Открываем бота для покупки
            if (typeof webApp.openTelegramLink === 'function') {
              webApp.openTelegramLink('https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase());
            } else if (typeof webApp.openLink === 'function') {
              webApp.openLink('https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase());
            }
            
            resolve({
              success: false,
              cancelled: false,
              redirected: true,
              message: 'Перенаправлен в бота для покупки'
            });
          } else {
            resolve({
              success: false,
              cancelled: true,
              status: 'cancelled'
            });
          }
        });
      });
    } 
    
    // Fallback для старых версий без showPopup
    else if (typeof webApp.showAlert === 'function') {
      return new Promise((resolve) => {
        webApp.showAlert(message, () => {
          // Автоматически открываем бота
          if (typeof webApp.openTelegramLink === 'function') {
            webApp.openTelegramLink('https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase());
          }
          
          resolve({
            success: false,
            cancelled: false,
            redirected: true,
            message: 'Перенаправлен в бота для покупки'
          });
        });
      });
    } 
    
    // Последний fallback
    else {
      alert(message);
      
      // Пытаемся открыть ссылку
      if (typeof webApp.openTelegramLink === 'function') {
        webApp.openTelegramLink('https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase());
      } else if (typeof webApp.openLink === 'function') {
        webApp.openLink('https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase());
      } else {
        window.open('https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase(), '_blank');
      }
      
      return {
        success: false,
        cancelled: false,
        redirected: true,
        message: 'Перенаправлен в бота для покупки'
      };
    }

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