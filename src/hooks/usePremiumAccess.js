import { useEffect, useState, useCallback } from 'react';
import { getTrialStatus } from '../services/trial';

export default function usePremiumAccess() {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [trialData, setTrialData] = useState(null);

  const checkAccess = useCallback(async () => {
    setLoading(true);
    try {
      const status = await getTrialStatus();
      setTrialData(status);
      
      console.log('🔒 Проверка доступа usePremiumAccess:', {
        hasActiveSubscription: status.hasActiveSubscription,
        trialIsActive: status.trial?.isActive
      });
      
      if (!status.hasActiveSubscription && (!status.trial?.isActive)) {
        // Блокируем доступ если нет подписки и триал истёк
        setBlocked(true);
        console.log('🔒 Доступ заблокирован: триал истёк и нет подписки');
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