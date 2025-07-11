import { getCurrentUser } from './telegram';
import i18n from '../i18n';
import { getStarsBalance as getReferralStarsBalance } from './referral';

// Глобальное состояние для предотвращения множественных попапов
let isPopupOpen = false;

// Функция для получения текстов в зависимости от языка
const getTexts = (language = i18n.language) => {
  const isEnglish = language && language.startsWith('en');
  return {
    purchaseTitle: isEnglish ? '💳 Purchase Subscription' : '💳 Покупка подписки',
    cost: isEnglish ? 'Cost:' : 'Стоимость:',
    stars: isEnglish ? 'stars' : 'звезд',
    forPurchase: isEnglish ? 'To purchase, go to @iSpeechHelper_bot and write:' : 'Для покупки перейдите в @iSpeechHelper_bot и напишите:',
    orStart: isEnglish ? 'Or simply write /start to choose a subscription.' : 'Или просто напишите /start для выбора подписки.',
    linkCopied: isEnglish ? 'Link copied to clipboard! Paste it in Telegram to go to the bot.' : 'Ссылка скопирована в буфер обмена! Вставьте её в Telegram для перехода к боту.',
    redirectedToBot: isEnglish ? 'Redirected to bot for purchase' : 'Перенаправлен в бота для покупки',
    failedToOpenBot: isEnglish ? 'Failed to open bot automatically' : 'Не удалось открыть бота автоматически',
    allMethodsFailed: isEnglish ? `Failed to automatically open the bot.

Go manually to @iSpeechHelper_bot and write:
/buy_` : `Не удалось автоматически открыть бота. 

Перейдите вручную в @iSpeechHelper_bot и напишите:
/buy_`,
    orStartForSelection: isEnglish ? 'Or simply /start to choose subscription.' : 'Или просто /start для выбора подписки.',
    monthlyTitle: isEnglish ? 'Monthly Subscription' : 'Месячная подписка',
    quarterlyTitle: isEnglish ? 'Quarterly Subscription' : 'Квартальная подписка',
    yearlyTitle: isEnglish ? 'Annual Subscription' : 'Годовая подписка',
    monthlyDescription: isEnglish ? 'Access to all features for 30 days.' : 'Доступ ко всем функциям на 30 дней.',
    quarterlyDescription: isEnglish ? 'Access to all features for 90 days.' : 'Доступ ко всем функциям на 90 дней.',
    yearlyDescription: isEnglish ? 'Access to all features for 365 days.' : 'Доступ ко всем функциям на 365 дней.',
    openBot: isEnglish ? 'Open bot' : 'Открыть бота',
    cancel: isEnglish ? 'Cancel' : 'Отмена'
  };
};

// Заглушки для работы со звездами
export const getStarsBalance = async () => {
  return await getReferralStarsBalance();
};
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
export const SUBSCRIPTION_PLANS = {
  monthly: {
    stars: 299,
    duration: 30,
    get title() { return getTexts().monthlyTitle; },
    amount: 299,
    get description() { return getTexts().monthlyDescription; }
  },
  quarterly: {
    stars: 699,
    duration: 90,
    get title() { return getTexts().quarterlyTitle; },
    amount: 699,
    get description() { return getTexts().quarterlyDescription; }
  },
  yearly: {
    stars: 1999,
    duration: 365,
    get title() { return getTexts().yearlyTitle; },
    amount: 1999,
    get description() { return getTexts().yearlyDescription; }
  }
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
    // Исправление: всегда приводим тип к строке и нижнему регистру
    if (typeof planType !== 'string') {
      throw new Error('Тип подписки должен быть строкой');
    }
    planType = planType.toLowerCase();
    
    // Проверяем, не открыт ли уже попап
    if (isPopupOpen) {
      console.log('⚠️ Попап уже открыт, игнорируем запрос');
      return {
        success: false,
        cancelled: true,
        message: 'Попап уже открыт'
      };
    }
    
    console.log('🌟 Попытка покупки подписки:', planType);
    
    // Определяем URLs в начале функции для доступности во всех блоках
    const botUrl = 'https://t.me/iSpeechHelper_bot';
    const botUrlWithStart = 'https://t.me/iSpeechHelper_bot?start=buy_' + planType;
    
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

    // Получаем тексты для текущего языка
    const texts = getTexts();

    // Создаем сообщение с инструкциями
    const message = `💫 ${plan.title}

💰 ${texts.cost} ${plan.amount} ⭐ ${texts.stars}
📝 ${plan.description}

🤖 ${texts.forPurchase}
/buy_${planType}

${texts.orStart}`;

    // Показываем popup с выбором действий
    if (typeof webApp.showPopup === 'function' && process.env.NODE_ENV !== 'development') {
      // Устанавливаем флаг что попап открыт
      isPopupOpen = true;
      
      return new Promise((resolve) => {
        webApp.showPopup({
          title: texts.purchaseTitle,
          message: message,
          buttons: [
            {
              id: 'open_bot',
              type: 'default',
              text: `🤖 ${texts.openBot}`
            },
            {
              id: 'cancel',
              type: 'cancel',
              text: texts.cancel
            }
          ]
        }, (buttonId) => {
          // Сбрасываем флаг когда попап закрыт
          isPopupOpen = false;
          
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
                const tgUrl = `tg://resolve?domain=iSpeechHelper_bot&start=buy_${planType}`;
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
                    webApp.showAlert(texts.linkCopied);
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
                webApp.showAlert(`${texts.allMethodsFailed}${planType}
                
${texts.orStartForSelection}`);
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
              message: opened ? texts.redirectedToBot : texts.failedToOpenBot
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
    
    // Fallback для старых версий без showPopup или development окружения
    else if (typeof webApp.showAlert === 'function' || process.env.NODE_ENV === 'development') {
      // Устанавливаем флаг что попап открыт
      isPopupOpen = true;
      
      return new Promise((resolve) => {
        // В development используем обычный alert
        if (process.env.NODE_ENV === 'development') {
          const confirmed = window.confirm(`${message}\n\nОткрыть бота для покупки?`);
          
          // Сбрасываем флаг когда попап закрыт
          isPopupOpen = false;
          
          if (confirmed) {
            // Автоматически открываем бота
            window.open(botUrlWithStart, '_blank');
            
            resolve({
              success: false,
              cancelled: false,
              redirected: true,
              message: texts.redirectedToBot
            });
          } else {
            resolve({
              success: false,
              cancelled: true,
              status: 'cancelled'
            });
          }
        } else {
          // Обычный showAlert для старых версий
          webApp.showAlert(message, () => {
          // Сбрасываем флаг когда попап закрыт
          isPopupOpen = false;
          
          // Автоматически открываем бота
          if (typeof webApp.openTelegramLink === 'function') {
            webApp.openTelegramLink(botUrlWithStart);
          }
          
          resolve({
            success: false,
            cancelled: false,
            redirected: true,
              message: texts.redirectedToBot
            });
          });
        }
      });
    } 
    
    // Последний fallback
    else {
      // Устанавливаем флаг что попап открыт
      isPopupOpen = true;
      
      alert(message);
      
      // Сбрасываем флаг после alert
      isPopupOpen = false;
      
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
        message: texts.redirectedToBot
      };
    }

  } catch (error) {
    console.error('Ошибка при покупке:', error);
    // Сбрасываем флаг в случае ошибки
    isPopupOpen = false;
    throw error;
  }
};

// Функция для принудительного сброса состояния попапа
export const resetPopupState = () => {
  isPopupOpen = false;
  console.log('🔄 Состояние попапа сброшено принудительно');
};

const starsService = {
  isStarsAvailable,
  purchaseWithStars,
  resetPopupState,
  SUBSCRIPTION_PLANS,
};

export default starsService; 