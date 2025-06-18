// Типы уведомлений
export const NotificationType = {
  NEW_REFERRAL: 'NEW_REFERRAL',
  REFERRAL_PURCHASE: 'REFERRAL_PURCHASE',
  STARS_EARNED: 'STARS_EARNED',
  STARS_SPENT: 'STARS_SPENT'
};

// Заглушки для функций уведомлений
export const createNotification = async () => false;
export const getUserNotifications = async () => [];
export const markNotificationAsRead = async () => false;

// Запрос разрешения на push-уведомления
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return { error: 'Ошибка при запросе разрешения на уведомления.' };
  }
};

// Получение заголовка уведомления
const getNotificationTitle = (type) => {
  switch (type) {
    case NotificationType.NEW_REFERRAL:
      return 'Новый реферал';
    case NotificationType.REFERRAL_PURCHASE:
      return 'Покупка реферала';
    case NotificationType.STARS_EARNED:
      return 'Получены звезды';
    case NotificationType.STARS_SPENT:
      return 'Использованы звезды';
    default:
      return 'iSpeech Helper';
  }
};

// Получение текста уведомления
const getNotificationBody = (type, data) => {
  switch (type) {
    case NotificationType.NEW_REFERRAL:
      return `Пользователь ${data.username} присоединился по вашей реферальной ссылке`;
    case NotificationType.REFERRAL_PURCHASE:
      return `Ваш реферал ${data.username} оплатил подписку. Вам начислено ${data.stars} ⭐`;
    case NotificationType.STARS_EARNED:
      return `Вы получили ${data.stars} ⭐`;
    case NotificationType.STARS_SPENT:
      return `Вы потратили ${data.stars} ⭐`;
    default:
      return '';
  }
}; 