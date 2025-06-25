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
      if (!status.hasActiveSubscription && (!status.trial?.isActive)) {
        setBlocked(true);
      } else {
        setBlocked(false);
      }
    } catch (e) {
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