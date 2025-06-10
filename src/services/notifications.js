import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  updateDoc,
  serverTimestamp,
  limit 
} from 'firebase/firestore';

// Типы уведомлений
export const NotificationType = {
  NEW_REFERRAL: 'NEW_REFERRAL',
  REFERRAL_PURCHASE: 'REFERRAL_PURCHASE',
  STARS_EARNED: 'STARS_EARNED',
  STARS_SPENT: 'STARS_SPENT'
};

// Создание уведомления
export const createNotification = async (userId, type, data) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      userId,
      type,
      data,
      isRead: false,
      createdAt: serverTimestamp()
    });

    // Отправляем push-уведомление, если пользователь разрешил
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = getNotificationTitle(type);
      const body = getNotificationBody(type, data);
      
      try {
        new Notification(title, {
          body,
          icon: '/logo192.png'
        });
      } catch (error) {
        console.warn('Error showing notification:', error);
      }
    }

    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};

// Получение уведомлений пользователя
export const getUserNotifications = async (userId, limit = 20) => {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    
    const snapshot = await getDocs(notificationsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

// Отметка уведомления как прочитанного
export const markNotificationAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      isRead: true,
      readAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

// Запрос разрешения на push-уведомления
export const requestNotificationPermission = async () => {
  try {
    // Проверяем доступность Notification API
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }
    
    // Если разрешение уже есть
    if (Notification.permission === 'granted') {
      return true;
    }
    
    // Если разрешение запрещено, не спрашиваем снова
    if (Notification.permission === 'denied') {
      console.warn('Notification permission denied');
      return false;
    }
    
    // Запрашиваем разрешение только если это default состояние
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
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