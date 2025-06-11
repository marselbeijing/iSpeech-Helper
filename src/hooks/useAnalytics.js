import { useCallback } from 'react';
import telegramAnalyticsService from '../services/telegramAnalytics';

/**
 * Хук для удобного использования Telegram Analytics в компонентах
 */
export const useAnalytics = () => {
  
  // Отслеживание использования функции
  const trackFunction = useCallback((functionName, parameters = {}) => {
    telegramAnalyticsService.trackFunctionUsage(functionName, parameters.duration);
  }, []);

  // Отслеживание завершения упражнения
  const trackExercise = useCallback((exerciseType, duration, score = null) => {
    telegramAnalyticsService.trackExerciseCompleted(exerciseType, duration, score);
  }, []);

  // Отслеживание просмотра страницы
  const trackPage = useCallback((pageName, timeSpent = null) => {
    telegramAnalyticsService.trackPageView(pageName, timeSpent);
  }, []);

  // Отслеживание изменения настроек
  const trackSetting = useCallback((settingName, newValue) => {
    telegramAnalyticsService.trackSettingsChange(settingName, newValue);
  }, []);

  // Отслеживание ошибки
  const trackError = useCallback((errorType, errorMessage) => {
    telegramAnalyticsService.trackError(errorType, errorMessage);
  }, []);

  // Отслеживание достижения
  const trackAchievement = useCallback((achievementName) => {
    telegramAnalyticsService.trackAchievement(achievementName);
  }, []);

  // Отслеживание кастомного события
  const trackEvent = useCallback((eventName, parameters = {}) => {
    telegramAnalyticsService.trackEvent(eventName, parameters);
  }, []);

  // Проверка готовности аналитики
  const isReady = useCallback(() => {
    return telegramAnalyticsService.isReady();
  }, []);

  // Получение информации о пользователе
  const getUserInfo = useCallback(() => {
    return telegramAnalyticsService.getUserInfo();
  }, []);

  return {
    trackFunction,
    trackExercise,
    trackPage,
    trackSetting,
    trackError,
    trackAchievement,
    trackEvent,
    isReady,
    getUserInfo
  };
}; 