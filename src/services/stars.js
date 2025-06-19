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
    console.log('🌟 Попытка покупки подписки:', planType);
    
    // Определяем URLs в начале функции для доступности во всех блоках
    const botUrl = 'https://t.me/iSpeechHelper_bot';
    const botUrlWithStart = 'https://t.me/iSpeechHelper_bot?start=buy_' + planType.toLowerCase();
    
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
      throw new Error('Неизвестный тип подписки');
    }

    console.log('План подписки:', plan);

    // Проверяем доступность openInvoice
    if (typeof webApp.openInvoice === 'function') {
      console.log('openInvoice доступен, но...');
    } else {
      console.log('openInvoice недоступен');
    }

    // Временно отключаем openInvoice из-за бага в Telegram WebApp
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
            console.log('Пытаемся открыть бота...');
            
            // Убираем повторное определение переменных
            console.log('URL бота (простой):', botUrl);
            console.log('URL бота (с параметром):', botUrlWithStart);
            
            let opened = false;
            
            // Определяем платформу
            const platform = webApp.platform || 'unknown';
            const isIOS = platform === 'ios';
            const isAndroid = platform === 'android';
            const isMobile = isIOS || isAndroid;
            
            console.log('Платформа:', platform, 'Мобильное устройство:', isMobile);
            
            // Для мобильных устройств - используем специальные схемы
            if (isMobile) {
              try {
                console.log('Пробуем мобильную схему tg://...');
                const tgUrl = `tg://resolve?domain=iSpeechHelper_bot&start=buy_${planType.toLowerCase()}`;
                console.log('TG URL:', tgUrl);
                
                // Способ 1: Прямая tg:// схема
                if (typeof webApp.openTelegramLink === 'function') {
                  webApp.openTelegramLink(tgUrl);
                  opened = true;
                  console.log('✅ Мобильная tg:// схема выполнена');
                } else {
                  window.location.href = tgUrl;
                  opened = true;
                  console.log('✅ Мобильная схема через location.href выполнена');
                }
              } catch (error) {
                console.error('❌ Ошибка мобильной схемы:', error);
              }
            }
            
            // Способ 1: openTelegramLink (если еще не открыто)
            if (!opened && typeof webApp.openTelegramLink === 'function') {
              try {
                console.log('Пробуем openTelegramLink...');
                webApp.openTelegramLink(botUrlWithStart);
                opened = true;
                console.log('✅ openTelegramLink выполнен');
              } catch (error) {
                console.error('❌ Ошибка openTelegramLink:', error);
              }
            }
            
            // Способ 2: openLink (если первый не сработал)
            if (!opened && typeof webApp.openLink === 'function') {
              try {
                console.log('Пробуем openLink...');
                webApp.openLink(botUrlWithStart);
                opened = true;
                console.log('✅ openLink выполнен');
              } catch (error) {
                console.error('❌ Ошибка openLink:', error);
              }
            }
            
            // Способ 3: sendData (отправляем данные родительскому окну)
            if (!opened && typeof webApp.sendData === 'function') {
              try {
                console.log('Пробуем sendData...');
                webApp.sendData(JSON.stringify({
                  action: 'open_bot',
                  url: botUrlWithStart,
                  planType: planType
                }));
                opened = true;
                console.log('✅ sendData выполнен');
              } catch (error) {
                console.error('❌ Ошибка sendData:', error);
              }
            }
            
            // Способ 4: window.open (последний резерв)
            if (!opened) {
              try {
                console.log('Пробуем window.open...');
                window.open(botUrlWithStart, '_blank');
                opened = true;
                console.log('✅ window.open выполнен');
              } catch (error) {
                console.error('❌ Ошибка window.open:', error);
              }
            }
            
            // Способ 4.5: Простая ссылка на бота без параметров
            if (!opened) {
              try {
                console.log('Пробуем простую ссылку на бота...');
                if (typeof webApp.openTelegramLink === 'function') {
                  webApp.openTelegramLink(botUrl);
                  opened = true;
                  console.log('✅ Простая ссылка через openTelegramLink выполнена');
                } else if (typeof webApp.openLink === 'function') {
                  webApp.openLink(botUrl);
                  opened = true;
                  console.log('✅ Простая ссылка через openLink выполнена');
                } else {
                  window.open(botUrl, '_blank');
                  opened = true;
                  console.log('✅ Простая ссылка через window.open выполнена');
                }
              } catch (error) {
                console.error('❌ Ошибка простой ссылки:', error);
              }
            }
            
            // Способ 5: Копирование ссылки в буфер обмена
            if (!opened) {
              try {
                console.log('Пробуем скопировать ссылку...');
                navigator.clipboard.writeText(botUrlWithStart).then(() => {
                  console.log('✅ Ссылка скопирована в буфер обмена');
                  // Показываем дополнительное уведомление
                  if (typeof webApp.showAlert === 'function') {
                    webApp.showAlert('Ссылка скопирована в буфер обмена! Вставьте её в Telegram для перехода к боту.');
                  }
                  opened = true;
                }).catch((clipError) => {
                  console.error('❌ Ошибка копирования:', clipError);
                });
              } catch (error) {
                console.error('❌ Ошибка clipboard:', error);
              }
            }
            
            // Если ничего не сработало
            if (!opened) {
              console.error('❌ Все способы открытия бота не сработали');
              if (typeof webApp.showAlert === 'function') {
                webApp.showAlert(`Не удалось автоматически открыть бота. 
                
Перейдите вручную в @iSpeechHelper_bot и напишите:
/buy_${planType.toLowerCase()}

Или просто /start для выбора подписки.`);
              }
            }
            
            // Устанавливаем таймер для сброса состояния покупки
            setTimeout(() => {
              console.log('⏰ Таймер: сбрасываем состояние покупки через 10 секунд');
              // Эмитируем событие для сброса состояния
              if (typeof window !== 'undefined' && window.dispatchEvent) {
                const resetEvent = new CustomEvent('resetPurchaseState');
                window.dispatchEvent(resetEvent);
              }
            }, 10000); // 10 секунд
            
            resolve({
              success: false,
              cancelled: false,
              redirected: opened,
              message: opened ? 'Перенаправлен в бота для покупки' : 'Не удалось открыть бота автоматически'
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
            webApp.openTelegramLink(botUrlWithStart);
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
        webApp.openTelegramLink(botUrlWithStart);
      } else if (typeof webApp.openLink === 'function') {
        webApp.openLink(botUrlWithStart);
      } else {
        window.open(botUrlWithStart, '_blank');
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