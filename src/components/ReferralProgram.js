import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  useTheme
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { generateReferralLink } from '../services/referral';
import { getStarsBalance } from '../services/stars';

const safeT = (t, key) => {
  const value = t(key);
  return value && !value.startsWith(key) ? value : '';
};

const ReferralProgram = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [referralLink, setReferralLink] = useState('');
  const [starsBalance, setStarsBalance] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    const link = await generateReferralLink();
    const balance = await getStarsBalance();
    setReferralLink(link || 'https://ispeech.app/ref/demo');
    setStarsBalance(balance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'iSpeech Helper',
          text: safeT(t, 'referral.shareMessage'),
          url: referralLink
        });
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // Пользователь отменил или запретил шаринг — не выводим ошибку в консоль
          // Можно добавить уведомление, если нужно
          return;
        }
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        mt: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper 
      }}
    >
      <Typography variant="h5" gutterBottom>
        {safeT(t, 'referral.title')}
      </Typography>

      {safeT(t, 'referral.description') && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            {safeT(t, 'referral.description')}
          </Typography>
        </Box>
      )}

      {/* Реферальная ссылка */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={referralLink}
            variant="outlined"
            size="small"
            name="referralLink"
            InputProps={{
              readOnly: true,
              sx: { bgcolor: 'background.default' }
            }}
          />
          <Button
            variant="contained"
            onClick={handleCopy}
            startIcon={<CopyIcon />}
            sx={{ 
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              px: 1.5,
              minWidth: 'auto'
            }}
          >
            {copied ? safeT(t, 'copied') : safeT(t, 'copy')}
          </Button>
          {navigator.share && (
            <Button
              variant="outlined"
              onClick={handleShare}
              startIcon={<ShareIcon />}
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: '0.75rem',
                px: 1.5,
                minWidth: 'auto'
              }}
            >
              {safeT(t, 'share')}
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {safeT(t, 'referral.rewards')}
        </Typography>
        <Typography variant="body2" component="div">
          • 60 ⭐ {safeT(t, 'referral.forMonth')}
          <br />
          • 144 ⭐ {safeT(t, 'referral.forQuarter')}
          <br />
          • 432 ⭐ {safeT(t, 'referral.forYear')}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {safeT(t, 'referral.currentBalance')}
        </Typography>
        <Typography variant="h6" color="primary">
          {starsBalance} ⭐
        </Typography>
      </Box>

      {safeT(t, 'referral.starsUsage') && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {safeT(t, 'referral.starsUsage')}
          </Typography>
        </Box>
      )}
      
      {safeT(t, 'referral.rewardConditions') && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {safeT(t, 'referral.rewardConditions')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ReferralProgram; 