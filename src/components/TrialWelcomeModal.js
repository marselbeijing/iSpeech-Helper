import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getTrialTexts } from '../services/trial';
import { getCurrentUser } from '../services/telegram';

const TrialWelcomeModal = ({ open, onClose, onStartTrial, onBuyPremium, trialExpired, onSnooze }) => {
  const theme = useTheme();
  
  console.log('DEBUG: до useTranslation');
  const { i18n } = useTranslation();
  console.log('DEBUG: после useTranslation');
  
  // Определяем язык: тестовый язык > язык пользователя > язык i18n
  const testLanguage = localStorage.getItem('testLanguage');
  let user = null;
  try {
    user = getCurrentUser();
  } catch (e) {
    console.error('Error getting user:', e);
    user = null;
  }
  const userLanguage = testLanguage || user?.language_code || i18n.language || 'ru';
  console.log('DEBUG: testLanguage', testLanguage);
  
  // Логируем для отладки
  React.useEffect(() => {
    if (open) {
      console.log('🌐 Язык модального окна:', {
        testLanguage,
        userLanguage: user?.language_code,
        i18nLanguage: i18n.language,
        finalLanguage: userLanguage,
        isEnglish: userLanguage?.startsWith('en')
      });
    }
  }, [open, testLanguage, user?.language_code, i18n.language, userLanguage]);

  let texts = {};
  try {
    texts = getTrialTexts(userLanguage);
  } catch (e) {
    console.error('Error in getTrialTexts:', e, userLanguage);
    texts = {};
  }

  const handleBuyPremiumClick = () => {
    onClose(); // Закрываем модальное окно
    if (onBuyPremium) {
      onBuyPremium(); // Вызываем переданную функцию
    }
  };

  const isEnglish = userLanguage?.startsWith('en');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        textAlign: 'center', 
        pb: 1, 
        width: '100%',
        px: 3
      }}>
        <Typography 
          variant="h5" 
          component="h2" 
          fontWeight="bold" 
          color="primary" 
          sx={{ 
            width: '100%', 
            textAlign: 'center',
            lineHeight: 1.2
          }}
        >
          {trialExpired ? texts.trialExpired : texts.welcomeTitle}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          {!trialExpired && (
            <Chip
              label={texts.freeTrialChip}
              color="primary"
              size="large"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white'
              }}
            />
          )}
          <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
            {trialExpired ? texts.subscribeNow : texts.trialDescription}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom color="primary" fontWeight="bold" sx={{ textAlign: 'center', mb: 2 }}>
          {texts.premiumFeatures}
        </Typography>

        <List dense sx={{ mb: 2 }}>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText 
              primary={texts.feature1}
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText 
              primary={texts.feature2}
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText 
              primary={texts.feature3}
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText 
              primary={texts.feature4}
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText 
              primary={texts.feature5}
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText 
              primary={texts.feature6}
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
        </List>

        <Box sx={{ 
          p: 2, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {texts.subscriptionNote}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        flexDirection: 'column', 
        gap: 2, 
        p: 3, 
        pt: 0 
      }}>
        {!trialExpired && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onStartTrial}
            size="large"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              fontSize: '1.1rem',
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            {texts.startTrial}
          </Button>
        )}
        
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onBuyPremium}
          size="large"
          sx={{
            fontSize: '1.1rem',
            py: 1.5,
            fontWeight: 'bold'
          }}
        >
          {texts.buyPremium}
        </Button>
        
        {trialExpired && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              if (onSnooze) {
                onSnooze(8); // Отложить на 8 часов
              }
              onClose();
            }}
            size="medium"
            sx={{
              fontSize: '0.9rem',
              py: 1,
              opacity: 0.8
            }}
                     >
             {isEnglish ? 'Remind me later (8 hours)' : 'Напомнить позже (8 часов)'}
           </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TrialWelcomeModal; 