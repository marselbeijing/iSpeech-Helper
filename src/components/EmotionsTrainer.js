import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import {
  ArrowBack,
  EmojiEmotions,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  SentimentDissatisfied,
  Refresh,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import usePremiumAccess from '../hooks/usePremiumAccess';
import TrialWelcomeModal from './TrialWelcomeModal';
import { getTrialTexts } from '../services/trial';

const EmotionsTrainer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [currentPhrase, setCurrentPhrase] = useState('');

  const { blocked, loading, trialData, checkAccess } = usePremiumAccess();
  const [showModal, setShowModal] = useState(false);

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
        onBuyPremium={() => {
          setShowModal(false);
        }}
        trialExpired={blocked || (trialData?.trial?.isActive === false)}
      />
    );
  }

  React.useEffect(() => {
    getRandomEmotionAndPhrase();
    // eslint-disable-next-line
  }, []);

  const getRandomEmotionAndPhrase = () => {
    const randomEmotionIndex = Math.floor(Math.random() * emotions.length);
    const randomPhraseIndex = Math.floor(Math.random() * phrases.length);
    setCurrentEmotion(emotions[randomEmotionIndex]);
    setCurrentPhrase(phrases[randomPhraseIndex]);
  };

  const handleNextClick = () => {
    getRandomEmotionAndPhrase();
    playSound('click');
    vibrate('click');
  };

  const handleBackClick = () => {
    playSound('click');
    vibrate('click');
    navigate('/');
  };

  const emotions = [
    { name: t('emotion_joy'), icon: <SentimentVerySatisfied sx={{ fontSize: { xs: 101, sm: 121 } }} />, color: '#32B768' },
    { name: t('emotion_calm'), icon: <SentimentSatisfied sx={{ fontSize: { xs: 101, sm: 121 } }} />, color: '#5B7CFF' },
    { name: t('emotion_sad'), icon: <SentimentDissatisfied sx={{ fontSize: { xs: 101, sm: 121 } }} />, color: '#8B5CF6' },
    { name: t('emotion_angry'), icon: <SentimentVeryDissatisfied sx={{ fontSize: { xs: 101, sm: 121 } }} />, color: '#FF4A6E' },
    { name: t('emotion_surprised'), icon: <EmojiEmotions sx={{ fontSize: { xs: 101, sm: 121 } }} />, color: '#FFB84A' },
  ];

  const phrases = [
    t('emotion_phrase_1'),
    t('emotion_phrase_2'),
    t('emotion_phrase_3'),
    t('emotion_phrase_4'),
    t('emotion_phrase_5'),
    t('emotion_phrase_6'),
    t('emotion_phrase_7'),
    t('emotion_phrase_8'),
    t('emotion_phrase_9'),
    t('emotion_phrase_10'),
  ];

  return (
    <Box sx={{ 
      height: '100vh', 
      width: '100%', 
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm" sx={{ 
        height: '100vh', 
        minHeight: '100vh',
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        p: { xs: 0, sm: 0 },
        width: '100%',
        maxWidth: '100%',
      }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: '0px', sm: '24px' },
            p: { xs: 2, sm: 4 },
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            width: '100%',
            height: '100vh',
            minHeight: '100vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            mb: { xs: 0, sm: 0 },
            pb: { xs: 18, sm: 12 },
          }}
        >
          {/* Синий заголовок */}
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderRadius: { xs: '12px', sm: '16px' },
              textAlign: 'center',
              mb: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              {t('emotions_trainer_title')}
            </Typography>
          </Box>

          {/* Всегда показываем тренажёр */}
          {currentEmotion && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              mb: { xs: 6, sm: 7 },
              flex: 1,
              mt: { xs: 2, sm: 3 }
            }}>
              <Box
                sx={{
                  width: { xs: 196, sm: 235 },
                  height: { xs: 196, sm: 235 },
                  borderRadius: '50%',
                  background: currentEmotion.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: { xs: 1.5, sm: 2 },
                  boxShadow: `0 10px 40px 0 ${currentEmotion.color}40`,
                }}
              >
                {currentEmotion.icon}
              </Box>
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ 
                  color: currentEmotion.color, 
                  mb: 1,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
              >
                {currentEmotion.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.6,
                  px: { xs: 1, sm: 2 },
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.03)',
                  boxShadow: '0 2px 8px 0 rgba(60,60,120,0.06)',
                  mb: { xs: 1.5, sm: 2 },
                  mx: { xs: 1, sm: 2 }
                }}
              >
                "{currentPhrase}"
              </Typography>
            </Box>
          )}
          
          <Box sx={{ mb: { xs: 0, sm: 1 } }}>
            <Button
              variant="contained"
              onClick={handleNextClick}
              startIcon={<Refresh />}
              sx={{
                borderRadius: 30,
                px: { xs: 2, sm: 2.5 },
                py: { xs: 0.75, sm: 1 },
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '0.95rem' },
                minWidth: 0,
                width: 'auto',
                alignSelf: 'center',
                background: 'linear-gradient(135deg, #ff3366 0%, #ff5e62 100%)',
                color: '#fff',
                boxShadow: '0 8px 32px 0 rgba(255, 74, 110, 0.3)',
                mb: { xs: 1.5, sm: 2 },
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)',
                },
              }}
            >
              {t('next_phrase')}
            </Button>
            <Typography
              variant="caption"
              align="center"
              sx={{
                display: "block",
                color: theme.palette.text.primary,
                fontWeight: 500,
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                px: { xs: 1, sm: 2 }
              }}
            >
              {t("emotions_trainer_instruction")}
            </Typography>
            
            <Button
              variant="contained"
              onClick={handleBackClick}
              startIcon={<ArrowBack />}
              sx={{
                py: 1,
                px: 2.5,
                borderRadius: 30,
                fontWeight: 500,
                fontSize: '0.95rem',
                minWidth: 0,
                width: 'auto',
                alignSelf: 'center',
                backgroundColor: '#ff3366',
                '&:hover': {
                  backgroundColor: '#e0294d',
                },
                mt: 1,
                mb: 1,
              }}
            >
              {i18n.language === 'ru' ? 'Назад' : 'Back'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmotionsTrainer; 