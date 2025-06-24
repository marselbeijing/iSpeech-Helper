// Временный файл для совместимости
// Экспортирует функции из правильных сервисов

import { checkSubscriptionStatus } from './subscription';
import { getTrialStatus } from './trial';

// Экспорт с именами, которые ожидает старый код
export const getUserSubscriptionStatus = async (userId) => {
  const status = await checkSubscriptionStatus();
  return {
    hasActiveSubscription: status.isActive,
    trialActive: false, // Будет получено из getTrialData
    trialExpired: false // Будет получено из getTrialData
  };
};

export const getTrialData = async (userId) => {
  const trialStatus = await getTrialStatus();
  return trialStatus;
};

// Экспорт основных функций для использования в других местах
export { checkSubscriptionStatus, getTrialStatus }; 