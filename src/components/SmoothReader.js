import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, Button, Slider, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { updateProgress } from '../services/storage';
import { useTranslation } from 'react-i18next';
import stories from '../data/stories';
import { ArrowBack } from '@mui/icons-material';
import usePremiumAccess from '../hooks/usePremiumAccess';
import TrialWelcomeModal from './TrialWelcomeModal';

const MIN_SPEED = 1;
const MAX_SPEED = 100;
const DEFAULT_SPEED = 50;

// Кастомный шарик для Slider (как в Чтении с метрономом)
const CustomThumb = styled('span')(({ theme }) => ({
  width: 24,
  height: 24,
  backgroundColor: '#29b6f6',
  borderRadius: '50%',
  boxShadow: '0 2px 8px 0 #2196f355',
  border: '3px solid #fff',
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
}));

const SmoothReader = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const textBoxRef = useRef(null);
  const lastActiveRef = useRef(null);
  const startTimeRef = useRef(null);
  const navigate = useNavigate();
  const { blocked, loading, trialData, shouldShowModal, hideModal, snoozeModalReminder, tryUseFeature } = usePremiumAccess();
  const [showModal, setShowModal] = useState(false);
  
  // Используем истории в зависимости от текущего языка
  const currentLanguageStories = stories[i18n.language] || stories.en;
  const wordsArr = currentLanguageStories[storyIndex].split(/(\s+)/).filter(Boolean);
  const totalLetters = wordsArr.reduce((acc, part) => acc + (part.trim() ? part.length : 0), 0);

  const getInterval = (speed) => Math.max(30, 1200 - speed * 11.5);

  useEffect(() => {
    if (isPlaying) {
      if (currentIndex >= totalLetters) {
        setIsPlaying(false);
        // Прокрутка вверх после завершения
        setTimeout(() => {
          if (textBoxRef.current) {
            textBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 350);
        return;
      }
      let timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, getInterval(speed));
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [isPlaying, speed, currentIndex, totalLetters]);

  // Прокрутка к текущей букве, если она выходит за пределы окна
  useEffect(() => {
    if (lastActiveRef.current && textBoxRef.current) {
      const el = lastActiveRef.current;
      const box = textBoxRef.current;
      const elRect = el.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      if (elRect.bottom > boxRect.bottom - 8) {
        el.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  // Синхронизируем локальное состояние с хуком
  useEffect(() => {
    setShowModal(shouldShowModal);
  }, [shouldShowModal]);

  const startReading = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const stopReading = () => {
    setIsPlaying(false);
    if (currentIndex >= totalLetters) {
      handleExerciseComplete();
    }
  };

  const generateRandomStory = () => {
    let nextIndex = Math.floor(Math.random() * currentLanguageStories.length);
    // Исключаем повтор текущей истории
    if (nextIndex === storyIndex) {
      nextIndex = (nextIndex + 1) % currentLanguageStories.length;
    }
    setStoryIndex(nextIndex);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    // Проверяем доступ перед использованием функции
    if (!tryUseFeature('play_pause')) {
      return; // Доступ заблокирован, модальное окно уже показано
    }
    
    if (isPlaying) {
      stopReading();
    } else {
      startReading();
    }
  };

  const handleSliderChange = (_, value) => {
    setSpeed(value);
  };

  const handleRandomStory = () => {
    // Проверяем доступ перед использованием функции
    if (!tryUseFeature('random_text')) {
      return; // Доступ заблокирован, модальное окно уже показано
    }
    
    generateRandomStory();
  };

  const handleExerciseComplete = () => {
    updateProgress('smoothReader');
  };

  // Отключаю прокрутку body на время монтирования страницы
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

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
        trialExpired={blocked || (trialData?.trial?.isActive === false)}
      />
    );
  }

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.default
    }}>
      <Container maxWidth="sm" sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p: { xs: 0, sm: 2 }
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: { xs: 0, sm: 3 },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
              border: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
              mb: { xs: 0, sm: 3 },
              width: '100%',
              maxWidth: '100%',
              minWidth: '280px',
              height: { xs: '100vh', sm: 'auto' },
              minHeight: { xs: '100vh', sm: '540px' },
              maxHeight: { xs: '100vh', sm: '700px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              mx: 'auto',
              flex: 1
            }}
          >
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
                {t('smooth_reader_title')}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 2, color: 'text.primary', fontSize: { xs: '0.75rem', sm: '0.82rem' } }}
            >
              {t('smooth_reading_instruction')}
            </Typography>

            <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary"></Typography>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>{t('speed')}:</Typography>
              <Typography variant="caption" color="text.secondary"></Typography>
            </Box>
            <Slider
              value={speed}
              min={MIN_SPEED}
              max={MAX_SPEED}
              onChange={handleSliderChange}
              sx={{
                mb: 2,
                mx: 'auto',
                width: '90%',
                py: 2,
                '& .MuiSlider-rail': {
                  height: 6,
                  borderRadius: 3,
                },
                '& .MuiSlider-track': {
                  height: 6,
                  borderRadius: 3,
                },
              }}
              slots={{ thumb: CustomThumb }}
            />

            <Box
              sx={{
                p: 1.5,
                mb: 3,
                borderRadius: 4,
                background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#fff',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 4px 24px 0 rgba(0,0,0,0.3)' 
                  : '0 4px 24px 0 rgba(60,60,120,0.10)',
                fontSize: 15,
                color: theme.palette.text.primary,
                fontWeight: 500,
                textAlign: 'center',
                minHeight: 40,
                maxHeight: 180,
                overflowY: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                lineHeight: 1.5,
                userSelect: 'none',
                letterSpacing: '-0.01em',
                wordBreak: 'break-word',
                width: '100%',
              }}
              ref={textBoxRef}
            >
              {(() => {
                let letterCount = 0;
                return wordsArr.map((part, i) => {
                  if (part.trim() === '') {
                    // Пробел между словами
                    return <span key={i}>&nbsp;</span>;
                  } else {
                    return (
                      <span key={i} style={{ display: 'inline-block', margin: '0 0.5px', padding: '1px 4px' }}>
                        {Array.from(part).map((char, j) => {
                          const isActive = letterCount < currentIndex;
                          const isLastActive = letterCount === currentIndex - 1;
                          const style = {
                            background: isActive ? 'rgba(33,150,243,0.18)' : 'transparent',
                            color: isActive ? '#1976d2' : theme.palette.text.primary,
                            borderRadius: isActive ? 3 : 0,
                            fontWeight: 500,
                            transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), color 0.4s cubic-bezier(0.4,0,0.2,1)',
                            fontSize: 15,
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-line',
                          };
                          letterCount++;
                          return (
                            <span
                              key={j}
                              style={style}
                              ref={isLastActive ? lastActiveRef : null}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </span>
                    );
                  }
                });
              })()}
            </Box>

            <Typography
              variant="caption"
              align="center"
              sx={{ mb: 2, display: 'block', color: theme.palette.text.primary, fontWeight: 500 }}
            >
              {t('smooth_reader_repeat')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 2,
              }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handlePlayPause}
                  sx={{
                    width: 80,
                    height: 80,
                    minWidth: 0,
                    p: 0,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff3366 0%, #ff5e62 100%)',
                    color: '#fff',
                    boxShadow: '0 4px 16px rgba(255, 51, 102, 0.4)',
                    fontSize: 36,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)',
                    },
                  }}
                >
                  {isPlaying ? <PauseIcon sx={{ fontSize: 48 }} /> : <PlayArrowIcon sx={{ fontSize: 48 }} />}
                </Button>
              </motion.div>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%', mt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRandomStory}
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
                }}
              >
                {t('random_text')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
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
                  mt: 3,
                  mb: 1,
                }}
              >
                {i18n.language === 'ru' ? 'Назад' : 'Back'}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SmoothReader; 