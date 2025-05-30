import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { PlayArrow, Pause, ArrowBack } from '@mui/icons-material';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import { useNavigate } from 'react-router-dom';
import { updateProgress } from '../services/storage';
import { useTranslation } from 'react-i18next';
import PageContainer from './PageContainer';

const BreathingExercises = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale'); // inhale, hold, exhale, rest
  const [totalCycles] = useState(5);
  const { t, i18n } = useTranslation();

  const phases = useMemo(() => ({
    inhale: { duration: 4, label: t('breathing_inhale') },
    hold: { duration: 4, label: t('breathing_hold') },
    exhale: { duration: 6, label: t('breathing_exhale') },
    rest: { duration: 0, label: '' }, // Скрытая фаза отдыха
  }), [t]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        const phaseOrder = ['inhale', 'hold', 'exhale', 'rest'];
        const currentIndex = phaseOrder.indexOf(currentPhase);
        const nextPhase = phaseOrder[(currentIndex + 1) % phaseOrder.length];
        
        setCurrentPhase(nextPhase);
      }, phases[currentPhase].duration * 1000);
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase, phases, totalCycles]);

  const startExercise = useCallback(() => {
    setIsPlaying(true);
    setCurrentPhase('inhale');
    playSound('click');
    vibrate('click');
  }, []);

  const stopExercise = useCallback(() => {
    setIsPlaying(false);
    setCurrentPhase('inhale');
    playSound('click');
    vibrate('click');
    handleExerciseComplete();
  }, []);

  // Цвета для разных фаз
  const getColors = useCallback((phase) => {
    switch (phase) {
      case 'inhale':
        return {
          primary: '#3f51b5',
          secondary: '#6573c3',
          glow: 'rgba(63, 81, 181, 0.4)',
        };
      case 'hold':
        return {
          primary: '#ff9800',
          secondary: '#ffac33',
          glow: 'rgba(255, 152, 0, 0.4)',
        };
      case 'exhale':
        return {
          primary: '#4caf50',
          secondary: '#6fbf73',
          glow: 'rgba(76, 175, 80, 0.4)',
        };
      case 'rest':
      default:
        return {
          primary: '#3f51b5',
          secondary: '#6573c3',
          glow: 'rgba(63, 81, 181, 0.4)',
        };
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
    playSound('click');
    vibrate('click');
  };

  const handleExerciseComplete = () => {
    updateProgress('breathing');
  };

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
          {t('breathing_exercise_title')}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={4}>
            <Box sx={{ p: 0.5, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 700, 
                fontSize: i18n.language === 'ru' ? 9 : 11, 
                letterSpacing: 1, 
                color: theme.palette.mode === 'dark' ? '#fff' : '#222'
              }}>
                {t('breathing_inhale')}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  height: 4,
                  borderRadius: 6,
                  my: 0.5,
                  width: '100%',
                  backgroundColor: '#e0e0e0',
                  overflow: 'hidden',
                  mx: 'auto',
                }}
              >
                {isPlaying && currentPhase === 'inhale' && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: phases.inhale.duration,
                      ease: 'linear',
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      backgroundColor: '#ff3366',
                      borderRadius: 6,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ 
                fontSize: 12,
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'inherit'
              }}>4с</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ p: 0.5, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 700, 
                fontSize: i18n.language === 'ru' ? 9 : 11, 
                letterSpacing: 1, 
                color: theme.palette.mode === 'dark' ? '#fff' : '#222'
              }}>
                {t('breathing_hold')}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  height: 4,
                  borderRadius: 6,
                  my: 0.5,
                  width: '100%',
                  backgroundColor: '#e0e0e0',
                  overflow: 'hidden',
                  mx: 'auto',
                }}
              >
                {isPlaying && currentPhase === 'hold' && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: phases.hold.duration,
                      ease: 'linear',
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      backgroundColor: '#ff3366',
                      borderRadius: 6,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ 
                fontSize: 12,
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'inherit'
              }}>4с</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ p: 0.5, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 700, 
                fontSize: i18n.language === 'ru' ? 9 : 11, 
                letterSpacing: 1, 
                color: theme.palette.mode === 'dark' ? '#fff' : '#222'
              }}>
                {t('breathing_exhale')}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  height: 4,
                  borderRadius: 6,
                  my: 0.5,
                  width: '100%',
                  backgroundColor: '#e0e0e0',
                  overflow: 'hidden',
                  mx: 'auto',
                }}
              >
                {isPlaying && currentPhase === 'exhale' && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: phases.exhale.duration,
                      ease: 'linear',
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      backgroundColor: '#ff3366',
                      borderRadius: 6,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ 
                fontSize: 12,
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'inherit'
              }}>6с</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Анимация круга по центру */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <Box sx={{ position: 'relative', width: 180, height: 180 }}>
          {/* Фоновая подсветка */}
          <motion.div
            animate={{
              boxShadow: isPlaying 
                ? `0 0 30px 10px ${getColors(currentPhase).glow}` 
                : '0 0 30px 10px rgba(255, 51, 102, 0.2)',
              scale: isPlaying 
                ? (currentPhase === 'inhale' ? [1, 1.05, 1] :
                  currentPhase === 'hold' ? [1, 1.05, 1, 1.05, 1] :
                  currentPhase === 'exhale' ? [1, 0.95, 1] : 1)
                : 1,
            }}
            transition={{
              duration: isPlaying ? phases[currentPhase].duration : 2,
              repeat: isPlaying ? (currentPhase === 'hold' ? 3 : 0) : Infinity,
              repeatType: 'reverse',
              ease: isPlaying 
                ? (currentPhase === 'inhale' ? 'easeOut' : 
                  currentPhase === 'exhale' ? 'easeIn' : 'easeInOut')
                : 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              zIndex: 1,
            }}
          />
          {/* Внешний круг */}
          <motion.div
            animate={{
              scale: isPlaying 
                ? (currentPhase === 'inhale' ? [1, 1.2] :
                  currentPhase === 'hold' ? 1.2 :
                  currentPhase === 'exhale' ? [1.2, 1] : 1)
                : 1,
              opacity: isPlaying ? [0.3, 0.8] : 0.8,
              borderColor: isPlaying 
                ? getColors(currentPhase).primary 
                : '#fff',
            }}
            transition={{
              duration: isPlaying ? phases[currentPhase].duration : 3,
              ease: isPlaying 
                ? (currentPhase === 'inhale' ? 'easeOut' : 
                  currentPhase === 'exhale' ? 'easeIn' : 'linear')
                : 'easeInOut',
              repeat: !isPlaying ? Infinity : 0,
              repeatType: 'reverse',
            }}
            style={{
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              border: `8px solid ${isPlaying ? getColors(currentPhase).primary : theme.palette.mode === 'dark' ? '#555' : '#fff'}`,
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          {/* Центральный текст */}
          <Box
            sx={{
              position: 'absolute',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {!isPlaying ? (
              <Typography 
                variant="h6"
                sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  px: 2,
                  textShadow: theme.palette.mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {t('breathing_press_start')}
              </Typography>
            ) : (
              <Typography 
                variant="h6"
                sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  fontWeight: 800,
                  textShadow: theme.palette.mode === 'dark' 
                    ? '0 1px 4px rgba(0,0,0,0.5)' 
                    : '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {phases[currentPhase].label}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 2,
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={isPlaying ? stopExercise : startExercise}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff3366 0%, #ff5e62 100%)',
              color: '#fff',
              boxShadow: '0 8px 32px 0 rgba(255, 74, 110, 0.3)',
              fontSize: 40,
              minWidth: 0,
              p: 0,
              '&:hover': { background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)' },
            }}
          >
            {isPlaying ? <Pause sx={{ fontSize: 48 }} /> : <PlayArrow sx={{ fontSize: 48 }} />}
          </Button>
        </motion.div>
      </Box>

      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={handleBack}
        sx={{
          backgroundColor: '#ff3366',
          color: '#fff',
          borderRadius: 30,
          fontWeight: 500,
          fontSize: '0.95rem',
          minWidth: 0,
          width: 'auto',
          alignSelf: 'center',
          mt: 1,
          px: 3,
          py: 1.2,
          '&:hover': {
            backgroundColor: '#e0294d',
          },
        }}
      >
        {t('back')}
      </Button>
    </PageContainer>
  );
};

export default React.memo(BreathingExercises); 