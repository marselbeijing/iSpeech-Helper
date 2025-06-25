import { useEffect, useState, useCallback } from 'react';
import { getTrialStatus, isPostponed } from '../services/trial';

export default function usePremiumAccess() {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [trialData, setTrialData] = useState(null);

  const checkAccess = useCallback(async () => {
    setLoading(true);
    try {
      const status = await getTrialStatus();
      setTrialData(status);
      
      // Проверяем отложенное время
      const postponed = isPostponed();
      
      console.log('🔒 Проверка доступа usePremiumAccess:', {
        hasActiveSubscription: status.hasActiveSubscription,
        trialIsActive: status.trial?.isActive,
        postponed: postponed
      });
      
      if (!status.hasActiveSubscription && (!status.trial?.isActive)) {
        // Если модальное окно отложено, не блокируем доступ
        const shouldBlock = !postponed;
        setBlocked(shouldBlock);
        console.log('🔒 Доступ заблокирован:', shouldBlock, 'причина: триал истёк, отложено:', postponed);
      } else {
        setBlocked(false);
        console.log('🔓 Доступ разрешён: есть подписка или активный триал');
      }
    } catch (e) {
      console.error('❌ Ошибка проверки доступа:', e);
      setBlocked(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return { loading, blocked, trialData, checkAccess };
} 