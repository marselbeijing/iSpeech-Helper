/**
 * API Service - Compatibility Layer
 * Обеспечивает совместимость с существующим кодом
 * Создан: 2025-01-29 для решения проблемы импорта на Vercel
 */

import { checkSubscriptionStatus } from './subscription';
import { getTrialStatus } from './trial';

console.log('🔌 API Service загружен для совместимости');

/**
 * Получение статуса подписки пользователя
 * @param {string} userId - ID пользователя
 * @returns {Promise<Object>} Статус подписки
 */
export const getUserSubscriptionStatus = async (userId) => {
  try {
    console.log('📊 Проверка статуса подписки для пользователя:', userId);
    const status = await checkSubscriptionStatus();
    
    const result = {
      hasActiveSubscription: status.isActive || false,
      trialActive: false, // Получается из getTrialData
      trialExpired: false, // Получается из getTrialData
      type: status.type || null,
      expiresAt: status.expiresAt || null
    };
    
    console.log('✅ Статус подписки получен:', result);
    return result;
  } catch (error) {
    console.error('❌ Ошибка получения статуса подписки:', error);
    return {
      hasActiveSubscription: false,
      trialActive: false,
      trialExpired: true,
      type: null,
      expiresAt: null
    };
  }
};

/**
 * Получение данных пробного периода
 * @param {string} userId - ID пользователя  
 * @returns {Promise<Object>} Данные пробного периода
 */
export const getTrialData = async (userId) => {
  try {
    console.log('📅 Получение данных пробного периода для пользователя:', userId);
    const trialStatus = await getTrialStatus();
    
    console.log('✅ Данные пробного периода получены:', trialStatus);
    return trialStatus;
  } catch (error) {
    console.error('❌ Ошибка получения данных пробного периода:', error);
    return {
      hasActiveSubscription: false,
      trial: {
        isActive: false,
        hasSeenWelcome: true,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        timeLeft: { days: 0, hours: 0, minutes: 0 },
        timeLeftMs: 0
      }
    };
  }
};

// Экспорт оригинальных функций для прямого использования
export { checkSubscriptionStatus, getTrialStatus };

export default {
  getUserSubscriptionStatus,
  getTrialData,
  checkSubscriptionStatus,
  getTrialStatus
}; 