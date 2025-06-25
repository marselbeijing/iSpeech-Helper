import { useEffect, useState, useCallback } from 'react';
import { getTrialStatus } from '../services/trial';
import { getCurrentUser } from '../services/telegram';
import { checkSubscriptionStatus } from '../services/subscription';

// Функции для управления частотой показа модального окна
const MODAL_COOLDOWN_HOURS = 4; // Не показывать чаще 1 раза в 4 часа

const getLastModalShown = () => {
  const lastShown = localStorage.getItem('trialExpiredModalLastShown');
  return lastShown ? parseInt(lastShown) : 0;
};

const setLastModalShown = () => {
  localStorage.setItem('trialExpiredModalLastShown', Date.now().toString());
};

const canShowModal = () => {
  const lastShown = getLastModalShown();
  const hoursSinceLastShown = (Date.now() - lastShown) / (1000 * 60 * 60);
  return hoursSinceLastShown >= MODAL_COOLDOWN_HOURS;
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
  
  const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));
  return { hoursLeft, expiresAt: new Date(parseInt(snoozedUntil)) };
};

export default function usePremiumAccess() {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [trialData, setTrialData] = useState(null);

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

      // Адаптируем данные под ожидаемую структуру
      const hasActiveSubscription = subscriptionStatus?.isActive || trialStatus?.hasActiveSubscription || false;
      const trialActive = trialStatus?.trial?.isActive || false;
      const trialExpired = !trialActive;

      const isBlocked = !hasActiveSubscription && trialExpired;
      
      // Если модальное окно отложено, даём временный доступ
      const hasTemporaryAccess = isModalSnoozed();
      const finalBlocked = isBlocked && !hasTemporaryAccess;
      
      setBlocked(finalBlocked);

      // Логика показа модального окна с ограничением частоты
      if (isBlocked && !hasTemporaryAccess && canShowModal()) {
        setShouldShowModal(true);
        setLastModalShown();
      }

    } catch (error) {
      console.error('Ошибка проверки доступа:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

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
    hasTemporaryAccess: isModalSnoozed()
  };
} 