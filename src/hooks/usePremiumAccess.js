import { useEffect, useState, useCallback } from 'react';
import { getCurrentUser } from '../services/telegram';
import { checkSubscriptionStatus } from '../services/subscription';
import { getTrialStatus } from '../services/trial';

// Функции для управления модальным окном
const setLastModalShown = () => {
  localStorage.setItem('trialExpiredModalLastShown', Date.now().toString());
};

const canShowModal = () => {
  const lastShown = localStorage.getItem('trialExpiredModalLastShown');
  if (!lastShown) return true;
  
  const timeSinceLastShown = Date.now() - parseInt(lastShown);
  const fourHours = 4 * 60 * 60 * 1000; // 4 часа в миллисекундах
  return timeSinceLastShown >= fourHours;
};

// Функция для "отложить напоминание" на определенное время
const snoozeModal = (hours = 8) => {
  const snoozeUntil = Date.now() + (hours * 60 * 60 * 1000);
  localStorage.setItem('trialModalSnoozedUntil', snoozeUntil.toString());
};

const isModalSnoozed = () => {
  const snoozedUntil = localStorage.getItem('trialModalSnoozedUntil');
  if (!snoozedUntil) return false;
  return Date.now() < parseInt(snoozedUntil);
};

// Функция для получения информации о временном доступе
const getTemporaryAccessInfo = () => {
  const snoozedUntil = localStorage.getItem('trialModalSnoozedUntil');
  if (!snoozedUntil) return null;
  
  const timeLeft = parseInt(snoozedUntil) - Date.now();
  if (timeLeft <= 0) return null;
  
  const hoursLeft = Math.ceil(timeLeft / (60 * 60 * 1000));
  return { hoursLeft, expiresAt: new Date(parseInt(snoozedUntil)) };
};

export default function usePremiumAccess() {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [trialData, setTrialData] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const checkAccess = useCallback(async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const [subscriptionStatus, trialStatus] = await Promise.all([
        checkSubscriptionStatus(),
        getTrialStatus()
      ]);

      setTrialData(trialStatus);

      const isBlocked = !subscriptionStatus.isActive && 
                       (!trialStatus.trial?.isActive || trialStatus.trial?.timeLeftMs <= 0);
      
      // Если модальное окно отложено, даём временный доступ
      const hasTemporaryAccess = isModalSnoozed();
      const finalBlocked = isBlocked && !hasTemporaryAccess;
      
      setBlocked(finalBlocked);

      // Показываем модальное окно только при первом запуске приложения
      if (isInitialLoad && finalBlocked && canShowModal()) {
        setShouldShowModal(true);
        setLastModalShown();
      }
      
      setIsInitialLoad(false);

    } catch (error) {
      console.error('Ошибка проверки доступа:', error);
    } finally {
      setLoading(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  // Функция для показа модального окна при попытке использовать премиум-функции
  const triggerModalOnAction = () => {
    if (blocked && !isModalSnoozed() && canShowModal()) {
      setShouldShowModal(true);
      setLastModalShown();
      return true; // Показали модальное окно
    }
    return false; // Не показали модальное окно
  };

  // Функция для скрытия модального окна
  const hideModal = () => {
    setShouldShowModal(false);
  };

  // Функция для "отложить напоминание"
  const snoozeModalReminder = (hours = 8) => {
    snoozeModal(hours);
    setShouldShowModal(false);
  };

  return { 
    loading, 
    blocked, 
    shouldShowModal, 
    hideModal,
    snoozeModalReminder,
    trialData,
    checkAccess,
    getTemporaryAccessInfo,
    hasTemporaryAccess: isModalSnoozed(),
    triggerModalOnAction
  };
} 