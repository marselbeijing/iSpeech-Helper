import { getCurrentUser } from './telegram';

// Базовый URL API
const API_BASE = process.env.REACT_APP_API_URL || 'https://ispeech-backend.onrender.com';

// Получение баланса звезд пользователя
export const getStarsBalance = async () => {
  const user = getCurrentUser();
  if (!user || !user.id) {
    return 0;
  }

  // API endpoint не реализован, возвращаем 0
  return 0;
};

// Получение статистики рефералов
export const getReferralStats = async () => {
  const user = getCurrentUser();
  if (!user || !user.id) {
    return null;
  }

  // API endpoint не реализован, возвращаем null
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