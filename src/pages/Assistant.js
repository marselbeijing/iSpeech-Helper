import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import usePremiumAccess from '../hooks/usePremiumAccess';
import TrialWelcomeModal from '../components/TrialWelcomeModal';
import { useNavigate } from 'react-router-dom';
import { setPostponeTime } from '../services/trial';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const AnimatedCircle = styled(Box)`
  background: linear-gradient(-45deg, #FF4A6E, #FFB84A, #32B768, #FF4A6E);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 8s ease infinite;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Assistant = () => {
  const theme = useTheme();
  const { t } = useTranslation();
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
        onPostpone={() => {
          setPostponeTime();
          setShowModal(false);
        }}
        trialExpired={blocked || (trialData?.trial?.isActive === false)}
      />
    );
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 3 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 0, sm: '24px' },
          padding: { xs: '24px', sm: '32px' },
          backgroundColor: theme.palette.background.paper,
          boxShadow: { xs: 'none', sm: '0 4px 20px rgba(0,0,0,0.08)' },
          width: '100%',
          maxWidth: '100%',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <AnimatedCircle
            sx={{
              width: { xs: 200, sm: 240 },
              height: { xs: 200, sm: 240 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4,
            }}
          >
            <Typography 
              variant="h5" 
              color="white"
              sx={{ 
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {t('coming_soon')}
            </Typography>
          </AnimatedCircle>
          <Typography 
            variant="h4" 
            textAlign="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2
            }}
          >
            {t('virtual_assistant')}
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            color="text.secondary"
            sx={{
              maxWidth: 480,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            {t('assistant_description')}
          </Typography>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default Assistant; 