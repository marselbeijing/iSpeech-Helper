import { getCurrentUser } from './telegram';

// Получение баланса звезд пользователя
export const getStarsBalance = async () => {
  const user = getCurrentUser();
  if (!user || !user.id) {
    return 0;
  }

  try {
    // В реальном приложении здесь будет API запрос к серверу
    // Пока возвращаем 0, но структура готова для интеграции
    const response = await fetch(`/api/referral/balance/${user.id}`);
    if (response.ok) {
      const data = await response.json();
      return data.balance || 0;
    }
  } catch (error) {
    console.log('Не удалось получить баланс звезд:', error);
  }
  
  return 0;
};

// Получение статистики рефералов
export const getReferralStats = async () => {
  const user = getCurrentUser();
  if (!user || !user.id) {
    return null;
  }

  try {
    const response = await fetch(`/api/referral/stats/${user.id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log('Не удалось получить статистику рефералов:', error);
  }
  
  return null;
};

// Заглушки для остальных функций (пока не реализованы)
export const getReferralData = async () => null;
export const addReferralTransaction = async () => false;
export const getReferralTransactions = async () => [];
export const checkReferralCode = async () => false;
export const hasUsedReferralCode = async () => false;
export const activateReferralCode = async () => ({ success: false, message: 'Недоступно' });
export const activateReferralSubscription = async () => ({ error: 'Недоступно' });
export const generateReferralCode = (id) => '';
export const getSubscriptionAmount = (type) => 0;

// Генерация реферальной ссылки на основе ID пользователя
export const generateReferralLink = () => {
  const user = getCurrentUser();
  if (user && user.id) {
    return `https://t.me/iSpeechHelper_bot?start=ref_${user.id}`;
  }
  return `https://t.me/iSpeechHelper_bot?start=ref_demo`;
};

export const requestPayout = async () => ({ success: false, message: 'Недоступно' }); 