import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, useTheme } from '@mui/material';
import { AccessTime as TimeIcon, Star as StarIcon } from '@mui/icons-material';
import { getCurrentUser } from '../services/telegram';

const TemporaryAccessBanner = ({ temporaryAccessInfo, onUpgrade }) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(temporaryAccessInfo?.hoursLeft || 0);
  const user = getCurrentUser();
  const userLanguage = user?.language_code || 'ru';
  const isEnglish = userLanguage?.startsWith('en');

  useEffect(() => {
    if (!temporaryAccessInfo) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const expiresAt = temporaryAccessInfo.expiresAt.getTime();
      const remaining = Math.max(0, expiresAt - now);
      const hoursLeft = Math.ceil(remaining / (1000 * 60 * 60));
      
      setTimeLeft(hoursLeft);
      
      if (remaining <= 0) {
        clearInterval(timer);
        window.location.reload(); // Перезагружаем страницу когда время истекло
      }
    }, 60000); // Обновляем каждую минуту

    return () => clearInterval(timer);
  }, [temporaryAccessInfo]);

  if (!temporaryAccessInfo || timeLeft <= 0) {
    return null;
  }

  const texts = {
    temporaryAccess: isEnglish ? 'Temporary Access' : 'Временный доступ',
    timeRemaining: isEnglish 
      ? `${timeLeft} hour${timeLeft !== 1 ? 's' : ''} remaining` 
      : `Осталось ${timeLeft} час${timeLeft === 1 ? '' : timeLeft < 5 ? 'а' : 'ов'}`,
    upgradeNow: isEnglish ? 'Upgrade Now' : 'Обновить сейчас',
    description: isEnglish 
      ? 'You have temporary access to all features. Upgrade to keep using them permanently.' 
      : 'У вас есть временный доступ ко всем функциям. Обновитесь, чтобы пользоваться ими постоянно.'
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
        color: 'white',
        p: 1.5,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
        <Chip
          icon={<TimeIcon />}
          label={texts.temporaryAccess}
          size="small"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 'bold'
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {texts.timeRemaining}
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        size="small"
        startIcon={<StarIcon />}
        onClick={onUpgrade}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: theme.palette.warning.dark,
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'white'
          }
        }}
      >
        {texts.upgradeNow}
      </Button>
    </Box>
  );
};

export default TemporaryAccessBanner; 