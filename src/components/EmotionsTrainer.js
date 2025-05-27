import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
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

const EmotionsTrainer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isStarted, setIsStarted] = useState(true);

  React.useEffect(() => {
    getRandomEmotionAndPhrase();
    // eslint-disable-next-line
  }, []);

  const handleStartTraining = () => {
    setIsStarted(true);
    getRandomEmotionAndPhrase();
    playSound('click');
    vibrate('click');
  };

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
    { name: t('emotion_joy'), icon: <SentimentVerySatisfied sx={{ fontSize: 48 }} />, color: '#32B768' },
    { name: t('emotion_calm'), icon: <SentimentSatisfied sx={{ fontSize: 48 }} />, color: '#5B7CFF' },
    { name: t('emotion_sad'), icon: <SentimentDissatisfied sx={{ fontSize: 48 }} />, color: '#8B5CF6' },
    { name: t('emotion_angry'), icon: <SentimentVeryDissatisfied sx={{ fontSize: 48 }} />, color: '#FF4A6E' },
    { name: t('emotion_surprised'), icon: <EmojiEmotions sx={{ fontSize: 48 }} />, color: '#FFB84A' },
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
      backgroundColor: theme.palette.background.default
    }}>
      <Container maxWidth="sm" sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            p: { xs: 2, sm: 4 },
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            maxWidth: 420,
            mx: 'auto',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Синий заголовок */}
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderRadius: '16px',
              textAlign: 'center',
              mb: 3,
              py: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {t('emotions_trainer_title')}
            </Typography>
          </Box>

          {/* Всегда показываем тренажёр */}
          {currentEmotion && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: currentEmotion.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  boxShadow: `0 4px 16px 0 ${currentEmotion.color}40`,
                  fontSize: 64,
                }}
              >
                {currentEmotion.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ color: currentEmotion.color, mb: 1 }}>
                {currentEmotion.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  px: 1,
                  py: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.03)',
                  boxShadow: '0 2px 8px 0 rgba(60,60,120,0.06)',
                  mb: 2,
                }}
              >
                "{currentPhrase}"
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={handleNextClick}
            startIcon={<Refresh />}
            sx={{
              borderRadius: 30,
              px: 2.5,
              py: 1,
              fontWeight: 500,
              fontSize: '0.95rem',
              minWidth: 0,
              width: 'auto',
              alignSelf: 'center',
              background: 'linear-gradient(135deg, #ff3366 0%, #ff5e62 100%)',
              color: '#fff',
              boxShadow: '0 8px 32px 0 rgba(255, 74, 110, 0.3)',
              mb: 2,
              '&:hover': {
                background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)',
              },
            }}
          >
            {t('next_phrase')}
          </Button>
          {/* Короткая инструкция */}
          <Typography
            variant="caption"
            align="center"
            sx={{
              display: 'block',
              color: theme.palette.text.primary,
              fontWeight: 500,
              mb: 2,
            }}
          >
            {t('emotions_trainer_instruction')}
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackClick}
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: 30,
              px: 2.5,
              py: 1,
              fontWeight: 500,
              fontSize: '0.95rem',
              minWidth: 0,
              width: 'auto',
              alignSelf: 'center',
              background: 'linear-gradient(135deg, #ff3366 0%, #ff5e62 100%)',
              color: '#fff',
              boxShadow: '0 8px 32px 0 rgba(255, 74, 110, 0.3)',
              mt: 1.5,
              '&:hover': {
                background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)',
              },
            }}
          >
            {t('back')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmotionsTrainer; 