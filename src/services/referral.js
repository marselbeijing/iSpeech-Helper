// Заглушки для реферальных функций
export const getReferralData = async () => null;
export const getReferralStats = async () => null;
export const addReferralTransaction = async () => false;
export const getReferralTransactions = async () => [];
export const checkReferralCode = async () => false;
export const hasUsedReferralCode = async () => false;
export const activateReferralCode = async () => ({ success: false, message: 'Недоступно' });
export const activateReferralSubscription = async () => ({ error: 'Недоступно' });
export const generateReferralCode = (id) => '';
export const getSubscriptionAmount = (type) => 0; 