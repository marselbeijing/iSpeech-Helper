import usePremiumAccess from '../hooks/usePremiumAccess';
import TrialWelcomeModal from './TrialWelcomeModal';
import { useNavigate } from 'react-router-dom';

const EmotionsTrainer = () => {
  const { blocked, loading, trialData, checkAccess } = usePremiumAccess();
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && blocked) {
      setShowModal(true);
    }
  }, [loading, blocked]);

  if (showModal) {
    return (
      <TrialWelcomeModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onStartTrial={() => setShowModal(false)}
        onBuyPremium={() => {
          setShowModal(false);
          navigate('/account');
        }}
      />
    );
  }

  return (
    // ... existing code ...
  );
};

export default EmotionsTrainer; 