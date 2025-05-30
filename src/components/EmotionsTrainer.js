import React, { useState, useEffect } from 'react';
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
import PageContainer from './PageContainer';

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
    <PageContainer>
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
          borderRadius: 2,
          mb: 2,
          py: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
        }}
      >
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            color: '#fff',
            fontWeight: 'bold',
            textShadow: '0 2px 8px rgba(0,0,0,0.15)',
            m: 0,
          }}
        >
          {t('emotions_trainer_title')}
        </Typography>
      </Box>

      {currentEmotion && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mb: { xs: 4, sm: 5 },
          flex: 1,
          mt: { xs: 2, sm: 3 }
        }}>
          <Box
            sx={{
              width: { xs: 100, sm: 120 },
              height: { xs: 100, sm: 120 },
              borderRadius: '50%',
              background: currentEmotion.color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: { xs: 1.5, sm: 2 },
              boxShadow: `0 4px 16px 0 ${currentEmotion.color}40`,
              '& > svg': {
                fontSize: { xs: 40, sm: 48 }
              }
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
        </Box>
      )}

      <Typography
        variant="caption"
        align="center"
        sx={{
          display: 'block',
          color: theme.palette.text.primary,
          fontWeight: 500,
          mb: { xs: 1.5, sm: 2 },
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          px: { xs: 1, sm: 2 }
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
          mt: { xs: 1, sm: 1.5 },
          '&:hover': {
            background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)',
          },
        }}
      >
        {t('back')}
      </Button>
    </PageContainer>
  );
};

export default EmotionsTrainer; 