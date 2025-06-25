import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccessBlockModal = ({ open, onClose, texts }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBuyPremium = () => {
    onClose();
    navigate('/account');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.error.main}15, ${theme.palette.warning.main}15)`,
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <LockIcon color="error" sx={{ fontSize: '2rem' }} />
          <Typography variant="h5" component="h2" fontWeight="bold" color="error.main">
            {texts.title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {texts.message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, gap: 1, flexDirection: 'column' }}>
        <Button
          onClick={handleBuyPremium}
          variant="contained"
          color="primary"
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
          {texts.buyButton}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onClose}
          sx={{ 
            fontSize: '0.9rem',
            py: 1.5
          }}
        >
          {texts.closeButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccessBlockModal; 