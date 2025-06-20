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

const TrialWelcomeModal = ({ open, onClose, onStartTrial, onBuyPremium }) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const user = getCurrentUser();
  const texts = getTrialTexts(user?.language_code || i18n.language);

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
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
          {texts.welcomeTitle}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Chip
            label="3 дня БЕСПЛАТНО"
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
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {texts.trialDescription}
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
          <Typography variant="body2" color="text.secondary">
            После окончания пробного периода нужно будет оформить подписку для продолжения использования всех функций
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, gap: 1, flexDirection: 'column' }}>
        <Button
          onClick={onStartTrial}
          variant="contained"
          size="large"
          fullWidth
          sx={{ 
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            py: 1.5,
            mb: 1
          }}
        >
          {texts.startTrialButton}
        </Button>
        <Button
          onClick={onBuyPremium}
          variant="outlined"
          size="large"
          fullWidth
          sx={{ 
            fontSize: '0.9rem',
            py: 1.5
          }}
        >
          {texts.buyNowButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TrialWelcomeModal; 