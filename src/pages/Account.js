import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Avatar,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  Telegram as TelegramIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { verifyTelegramAuth, getCurrentUser, logout } from '../services/telegram';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';

const Account = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Telegram Login Widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'iSpeechHelperBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-lang', 'ru');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
    window.onTelegramAuth = async (user) => {
      try {
        const userData = await verifyTelegramAuth(user);
        setUser(userData);
        playSound('success');
        vibrate('success');
      } catch (error) {
        playSound('error');
        vibrate('error');
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      delete window.onTelegramAuth;
    };
  }, []);

  const handleLogout = () => {
    playSound('click');
    vibrate('click');
    logout();
    setUser(null);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 4, minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4, minHeight: '100vh' }}>
      {/* Основной светлый блок */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: '24px',
          padding: '32px 20px 24px 20px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          maxWidth: 420,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        {/* Синий фон для заголовка */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            borderRadius: '16px',
            textAlign: 'center',
            mb: 3,
            py: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Аккаунт
          </Typography>
        </Box>
        {user ? (
          <>
            <Avatar
              src={user.photoUrl}
              alt={user.firstName}
              sx={{
                width: 96,
                height: 96,
                mx: 'auto',
                mb: 2,
                boxShadow: '0 2px 8px rgba(60,60,120,0.10)',
              }}
            />
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              @{user.username}
            </Typography>
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
                Статистика
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Упражнений
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    0
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Минут практики
                  </Typography>
                  <Typography variant="h6" color="secondary.main">
                    0
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderRadius: 30,
                px: 4,
                py: 1.2,
                fontWeight: 500,
                fontSize: '1rem',
                mt: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.10)',
              }}
            >
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Box sx={{ mb: 3, mt: 2 }}>
              <TelegramIcon sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />
              <Typography variant="body1" color="text.secondary" mb={2}>
                Войдите через Telegram, чтобы пользоваться всеми возможностями
              </Typography>
              <Box id="telegram-login-widget" sx={{ display: 'flex', justifyContent: 'center' }} />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Account; 