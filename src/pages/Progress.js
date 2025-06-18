import React from 'react';
import {
  Container,
  Typography,
  Box,
  useTheme,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ArrowBack, RestartAlt } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import ProgressCounter from '../components/ProgressCounter';
import { getUserStats, saveUserStats, DEFAULT_STATS } from '../services/storage';
import { useTranslation } from 'react-i18next';

const Progress = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const progressData = getUserStats();
  const { t } = useTranslation();
  const [resetDialogOpen, setResetDialogOpen] = React.useState(false);
  
  const handleBack = () => {
    playSound('click');
    vibrate('click');
    navigate('/');
  };

  const handleResetProgress = () => {
    playSound('click');
    vibrate('click');
    setResetDialogOpen(true);
  };

  const handleConfirmReset = () => {
    saveUserStats({ ...DEFAULT_STATS });
    setResetDialogOpen(false);
    window.location.reload(); // Перезагружаем страницу для обновления данных
  };

  const handleCancelReset = () => {
    setResetDialogOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: { xs: 0, sm: 4 },
      height: '100vh',
      overflowY: 'auto',
      px: { xs: 0, sm: 2 }
    }}>
      {/* Основной контейнер */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 0, sm: '24px' },
          padding: { xs: '16px', sm: '24px' },
          backgroundColor: theme.palette.background.paper,
          boxShadow: { xs: 'none', sm: '0 4px 20px rgba(0,0,0,0.08)' },
          marginBottom: { xs: 0, sm: '20px' },
          width: '100%',
          maxWidth: '100%',
          mx: 'auto',
        }}
      >
        {/* Заголовок внутри основного блока */}
        {/* Удаляю кнопку 'Назад' и синие заголовки 'Статистика' и 'Достижения' */}
        {/* <Typography 
          variant="h5" 
          component="h1" 
          fontWeight="bold" 
          textAlign="center"
          color="primary"
          mb={3}
        >
          Ваш прогресс
        </Typography> */}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ProgressCounter showDetails={true} />
        </Box>

        {/* Кнопка назад внутри основного блока */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4, mb: { xs: 8, sm: 2 } }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<RestartAlt />}
            onClick={handleResetProgress}
            sx={{
              py: { xs: 0.75, sm: 1 },
              px: { xs: 2, sm: 2.5 },
              borderRadius: 30,
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '0.95rem' },
              minWidth: 0,
              width: 'auto',
              alignSelf: 'center',
              backgroundColor: '#ff3366',
              '&:hover': {
                backgroundColor: '#e0294d',
              },
            }}
          >
            {t('reset_progress')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={handleBack}
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
            {t('back')}
          </Button>
        </Box>
      </Paper>

      {/* Диалог подтверждения сброса */}
      <Dialog
        open={resetDialogOpen}
        onClose={handleCancelReset}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {t('reset_progress_confirmation')}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {t('reset_progress_warning')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={handleCancelReset}
            variant="outlined"
            sx={{
              borderRadius: 30,
              px: 3,
            }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleConfirmReset}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 30,
              px: 3,
              backgroundColor: '#ff3366',
              '&:hover': {
                backgroundColor: '#e0294d',
              },
            }}
          >
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Progress; 