import { useEffect, useState, useCallback } from 'react';
import { getTrialStatus } from '../services/trial';
import { getCurrentUser } from '../services/telegram';
import { getUserSubscriptionStatus, getTrialData } from '../services/api';

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

// Функции для отладки - очистка кэша
const clearTrialCacheDebug = () => {
  console.log('🧹 Очистка кэша пробного периода...');
  
  const keysToRemove = [
    'trialExpiredModalLastShown',
    'trialModalSnoozedUntil'
  ];
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`✅ Удален ключ: ${key}`);
  });
  
  console.log('🎉 Кэш очищен! Перезагрузите страницу для применения изменений.');
  return 'Кэш очищен! Перезагрузите страницу.';
};

const resetModalSettingsDebug = () => {
  clearTrialCacheDebug();
  console.log('🔄 Перезагружаем страницу...');
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

// Добавляем функции в глобальную область видимости для отладки
if (typeof window !== 'undefined') {
  window.clearTrialCache = clearTrialCacheDebug;
  window.resetModalSettings = resetModalSettingsDebug;
  console.log('🛠️ Функции отладки загружены: clearTrialCache() и resetModalSettings()');
  
  console.log('🛠️ Функции отладки уже загружены в index.js');
}

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

      const [status, trial] = await Promise.all([
        getUserSubscriptionStatus(user.id),
        getTrialData(user.id)
      ]);

      setTrialData(trial);

      const isBlocked = !status.hasActiveSubscription && 
                       (!trial.trial?.isActive || false);
      
      // Если модальное окно отложено, даём временный доступ
      const hasTemporaryAccess = isModalSnoozed();
      const finalBlocked = isBlocked && !hasTemporaryAccess;
      
      setBlocked(finalBlocked);

      // НЕ показываем модальное окно автоматически!
      // Оно будет показано только при попытке использовать функции

    } catch (error) {
      console.error('Ошибка проверки доступа:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  // Функция для попытки использовать функцию
  const tryUseFeature = (featureName) => {
    console.log(`🎯 Попытка использовать функцию: ${featureName}`);
    const hasSnooze = isModalSnoozed();
    const canShow = canShowModal();
    console.log(`📊 Состояние доступа:`, { blocked, loading, hasTemporaryAccess: hasSnooze, canShowModal: canShow });

    // Если есть временный доступ (snooze) — разрешаем доступ
    if (hasSnooze) {
      return true;
    }

    // Если заблокировано и можно показать модалку (cooldown прошёл)
    if (blocked && canShow) {
      setShouldShowModal(true);
      setLastModalShown(); // Запоминаем время показа
      return false;
    }

    // Если заблокировано, но cooldown не прошёл — просто запрещаем доступ, не показываем окно
    if (blocked && !canShow) {
      return false;
    }

    // Доступ разрешён
    return true;
  };

  // Функция для скрытия модального окна
  const hideModal = () => {
    console.log('🔒 Скрываем модальное окно');
    setShouldShowModal(false);
  };

  // Функция для "отложить напоминание"
  const snoozeModalReminder = (hours = 8) => {
    console.log(`⏰ Откладываем модальное окно на ${hours} часов`);
    snoozeModal(hours);
    setShouldShowModal(false);
    // Перезапускаем проверку доступа после отложения
    checkAccess();
  };

  // Функция для принудительного скрытия модального окна (для отладки)
  const forceHideModal = () => {
    console.log('🔧 Принудительно скрываем модальное окно');
    setShouldShowModal(false);
    return 'Модальное окно скрыто принудительно';
  };

  // Добавляем функцию отладки в глобальную область видимости
  if (typeof window !== 'undefined' && !window.forceHideModal) {
    window.forceHideModal = forceHideModal;
    console.log('🛠️ Функция отладки загружена: forceHideModal()');
  }

  return { 
    loading, 
    blocked, 
    shouldShowModal, 
    hideModal,
    snoozeModalReminder,
    trialData,
    checkAccess,
    tryUseFeature, // Новая функция для проверки доступа к функциям
    getTemporaryAccessInfo,
    hasTemporaryAccess: isModalSnoozed()
  };
} 