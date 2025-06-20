import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  useTheme,
  LinearProgress
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { getTrialTexts } from '../services/trial';
import { getCurrentUser } from '../services/telegram';
import { useTranslation } from 'react-i18next';

const TrialTimer = ({ trialData, onBuyPremium }) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const user = getCurrentUser();
  const texts = getTrialTexts(user?.language_code || i18n.language);
  
  const [timeLeft, setTimeLeft] = useState(trialData?.timeLeft || { days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!trialData?.isActive) return;

    const timer = setInterval(() => {
      const now = new Date();
      const endDate = new Date(trialData.endDate);
      const totalTime = endDate.getTime() - new Date(trialData.startDate).getTime();
      const remainingTime = endDate.getTime() - now.getTime();

      if (remainingTime <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setProgress(((totalTime - remainingTime) / totalTime) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [trialData]);

  if (!trialData) return null;

  const isExpired = !trialData.isActive || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: isExpired 
          ? `linear-gradient(135deg, ${theme.palette.error.main}15, ${theme.palette.error.dark}15)`
          : `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
        border: `1px solid ${isExpired ? theme.palette.error.main : theme.palette.primary.main}40`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Фоновая анимация */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isExpired 
            ? 'none'
            : `linear-gradient(45deg, ${theme.palette.primary.main}05, transparent, ${theme.palette.secondary.main}05)`,
          animation: isExpired ? 'none' : 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 0.6 }
          }
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimeIcon color={isExpired ? 'error' : 'primary'} />
            <Typography variant="h6" fontWeight="bold" color={isExpired ? 'error' : 'primary'}>
              {isExpired ? texts.trialExpired : texts.trialActive}
            </Typography>
          </Box>
          
          {!isExpired && (
            <Chip
              icon={<StarIcon />}
              label="FREE"
              color="primary"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          )}
        </Box>

        {isExpired ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {texts.subscribeNow}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onBuyPremium}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                fontWeight: 'bold',
                px: 4
              }}
            >
              {texts.buyNowButton}
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {texts.trialTimeLeft}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {timeLeft.days}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {texts.timeUnits?.days || 'дней'}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {timeLeft.hours}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {texts.timeUnits?.hours || 'часов'}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {timeLeft.minutes}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {texts.timeUnits?.minutes || 'минут'}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {timeLeft.seconds}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {texts.timeUnits?.seconds || 'секунд'}
                </Typography>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 2,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 4
                }
              }}
            />

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onBuyPremium}
                sx={{ fontWeight: 'bold' }}
              >
                {texts.buyNowButton}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default TrialTimer; 