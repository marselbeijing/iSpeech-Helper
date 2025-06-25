import { useState, useEffect, useCallback } from 'react';
import { getTrialStatus } from '../services/trial';
import { checkSubscriptionStatus } from '../services/subscription';
import { getCurrentUser } from '../services/telegram';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const useAccessControl = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState(true);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showInitialModal, setShowInitialModal] = useState(false);

  // Проверка доступа при загрузке
  const checkAccess = useCallback(async () => {
    try {
      setIsLoading(true);
      const user = getCurrentUser();
      if (!user) {
        setHasAccess(false);
        return;
      }

      // Проверяем подписку
      const subscription = await checkSubscriptionStatus();
      if (subscription && subscription.isActive) {
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      // Проверяем пробный период
      const trialStatus = await getTrialStatus();
      if (trialStatus.trial && trialStatus.trial.isActive) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
        // Показываем модальное окно блокировки только если пользователь уже видел приветствие
        // Если не видел - приветственное окно покажется в App.js
        if (location.pathname !== '/account' && trialStatus.trial && trialStatus.trial.hasSeenWelcome) {
          setTimeout(() => {
            setShowInitialModal(true);
          }, 4000);
        }
      }
    } catch (error) {
      console.error('Ошибка проверки доступа:', error);
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  // Функция для проверки доступа к конкретной функции
  const checkFeatureAccess = useCallback(async () => {
    // Не показываем модальное окно на странице Account
    if (!hasAccess && location.pathname !== '/account') {
      // Проверяем, видел ли пользователь приветствие
      try {
        const trialStatus = await getTrialStatus();
        if (trialStatus.trial && trialStatus.trial.hasSeenWelcome) {
          setShowBlockModal(true);
        }
        // Если не видел приветствие - не показываем блокировку
      } catch (error) {
        console.error('Ошибка проверки статуса пробного периода:', error);
      }
      return false;
    }
    return hasAccess || location.pathname === '/account';
  }, [hasAccess, location.pathname]);

  // Получение текстов для модального окна
  const getTexts = useCallback(() => {
    const isEnglish = i18n.language && i18n.language.startsWith('en');
    return {
      title: isEnglish ? 'Premium Required' : 'Требуется Премиум',
      message: isEnglish 
        ? 'Your trial period has expired. Purchase a premium subscription to continue using all features.'
        : 'Ваш пробный период истек. Приобретите премиум подписку, чтобы продолжить использовать все функции.',
      buyButton: isEnglish ? 'Buy Premium' : 'Купить Премиум',
      closeButton: isEnglish ? 'Close' : 'Закрыть'
    };
  }, [i18n.language]);

  return {
    hasAccess,
    isLoading,
    showBlockModal,
    showInitialModal,
    setShowBlockModal,
    setShowInitialModal,
    checkFeatureAccess,
    getTexts,
    checkAccess
  };
}; 