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
  Modal,
  Fade,
  IconButton,
} from '@mui/material';
import {
  Telegram as TelegramIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { verifyTelegramAuth, getCurrentUser, logout } from '../services/telegram';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import TelegramLogin from '../components/TelegramLogin';
import { checkSubscriptionStatus, purchaseSubscription } from '../services/subscription';
import { useTranslation } from 'react-i18next';

const StarIcon = () => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2l3.09 6.26L24 9.27l-5 4.87L20.18 22 14 18.27 7.82 22 9 14.14l-5-4.87 6.91-1.01L14 2z" fill="#FFD600" stroke="#FFC107" strokeWidth="1.5"/>
    </svg>
  </span>
);

const Account = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
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
        
        const widgetDiv = document.getElementById('telegram-login-widget');
        if (widgetDiv) {
          widgetDiv.innerHTML = '';
          widgetDiv.appendChild(script);
        }

        window.onTelegramAuth = async (user) => {
          try {
            const userData = await verifyTelegramAuth(user);
            setUser(userData);
            playSound('success');
            vibrate('success');
          } catch (error) {
            console.error('Ошибка авторизации:', error);
            playSound('error');
            vibrate('error');
          }
        };

        return () => {
          if (widgetDiv) widgetDiv.innerHTML = '';
          delete window.onTelegramAuth;
        };
      }

      // Проверяем статус подписки
      const checkSubscription = async () => {
        const status = await checkSubscriptionStatus();
        setSubscription(status);
      };
      
      if (user) {
        checkSubscription();
      }
    } catch (error) {
      console.error('Ошибка инициализации:', error);
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      playSound('click');
      vibrate('click');
      logout();
      setUser(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const handlePurchase = async (type) => {
    try {
      setIsPurchasing(true);
      const result = await purchaseSubscription(type);
      
      if (result.success) {
        setSubscription(result.subscription);
        playSound('success');
        vibrate('success');
      } else {
        playSound('error');
        vibrate('error');
        // TODO: Показать уведомление об ошибке
      }
    } catch (error) {
      console.error('Ошибка при покупке:', error);
      playSound('error');
      vibrate('error');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default
      }}>
        <Container maxWidth="sm" sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress color="primary" />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      overflowY: 'auto',
      paddingBottom: '72px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Container maxWidth="sm" sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        py: 2,
        flex: 1,
        width: '100%',
      }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: theme.palette.background.paper,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
            width: '100%',
            maxWidth: '100%',
            mx: 0,
            mb: 2,
          }}
        >
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
              
              {/* Статус подписки */}
              {subscription && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Typography 
                    variant="subtitle2" 
                    color={subscription.isActive ? 'success.main' : 'text.secondary'}
                    sx={{ mb: 0.5 }}
                  >
                    {subscription.isActive 
                      ? t('premium_active', { date: new Date(subscription.expiresAt).toLocaleDateString() })
                      : t('no_active_subscription')}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
                  {t('statistics')}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('exercises')}
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      0
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('minutes')}
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
                startIcon={<LogoutIcon fontSize="small" />}
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
                {t('logout')}
              </Button>
            </>
          ) : (
            <TelegramLogin />
          )}
          <Button
            variant="outlined"
            onClick={() => setIsInfoOpen(true)}
            sx={{
              borderRadius: 30,
              px: 4,
              py: 1.2,
              fontWeight: 500,
              fontSize: '1rem',
              mt: 3,
              width: '100%',
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(33, 150, 243, 0.04)',
              },
            }}
          >
            {t('about')}
          </Button>
        </Paper>

        <Modal
          open={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={isInfoOpen}>
            <Paper
              sx={{
                position: 'relative',
                width: '90%',
                maxWidth: 400,
                maxHeight: '80vh',
                overflow: 'auto',
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
            >
              <IconButton
                onClick={() => setIsInfoOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                {t('about')}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                iSpeech Helper — это специализированное приложение для помощи людям с речевыми расстройствами. Оно разработано для улучшения дикции, артикуляции и общего качества речи через комплекс специальных упражнений.
              </Typography>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
                Основные функции:
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                1. Дыхательные упражнения — помогают контролировать дыхание во время речи. Регулярные занятия улучшают выносливость и стабильность голоса.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                2. Тренажер эмоций — учит выражать различные эмоции через голос. Упражнения включают чтение текста с разной интонацией и эмоциональной окраской.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                3. Плавное чтение — помогает развить беглость речи. Текст появляется постепенно, что способствует более размеренному и четкому произношению.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                4. Метроном — тренирует ритмичность речи. Помогает поддерживать постоянный темп и паузы между словами.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                5. Скороговорки — улучшают артикуляцию и четкость произношения сложных звуковых сочетаний.
              </Typography>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
                Специальные функции:
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                DAF (Delayed Auditory Feedback) — задержка слуховой обратной связи. Эта функция создает небольшую задержку между вашей речью и тем, как вы её слышите. Это помогает замедлить речь и сделать её более контролируемой. Рекомендуется начинать с задержки 50-100 мс и постепенно увеличивать до 200 мс.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                MAF (Masking Auditory Feedback) — маскировка слуховой обратной связи. Эта функция добавляет белый шум или другие звуки во время вашей речи, что помогает снизить заикание и улучшить контроль над речью. Начните с низкого уровня шума (20-30%) и постепенно увеличивайте до комфортного уровня.
              </Typography>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
                Как пользоваться:
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Начните с дыхательных упражнений для разминки
                • Выберите любой раздел и следуйте инструкциям на экране
                • При использовании DAF/MAF начните с минимальных настроек
                • Регулярно занимайтесь, начиная с 5-10 минут в день
                • Отслеживайте прогресс в разделе статистики
                • Используйте настройки для персонализации опыта
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                Для достижения наилучших результатов рекомендуется заниматься ежедневно и постепенно увеличивать продолжительность занятий. При использовании DAF/MAF важно найти комфортные настройки, при которых речь становится более плавной и контролируемой.
              </Typography>
            </Paper>
          </Fade>
        </Modal>

        {/* Блок подписок */}
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
            border: `1px solid ${theme.palette.divider}`,
            mt: 2,
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mx: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            {t('premium')}
          </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: '100%',
            justifyContent: 'center',
          }}>
            {/* Месячная подписка */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: theme.palette.divider,
                width: { xs: '100%', sm: '30%' },
                textAlign: 'center',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>{t('month')}</Typography>
                <Typography variant="h4" sx={{ mb: 1, color: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  300 <StarIcon />
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                disabled={isPurchasing || !user}
                sx={{ mt: 2 }}
                onClick={() => user && handlePurchase('MONTHLY')}
              >
                {isPurchasing ? t('processing') : t('buy')}
              </Button>
            </Box>

            {/* Квартальная подписка */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: theme.palette.divider,
                width: { xs: '100%', sm: '30%' },
                textAlign: 'center',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>{t('quarter')}</Typography>
                <Typography variant="h4" sx={{ mb: 1, color: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  720 <StarIcon />
                </Typography>
                <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                  {t('discount_20')}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                disabled={isPurchasing || !user}
                sx={{ mt: 2 }}
                onClick={() => user && handlePurchase('QUARTERLY')}
              >
                {isPurchasing ? t('processing') : t('buy')}
              </Button>
            </Box>

            {/* Годовая подписка */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: theme.palette.divider,
                width: { xs: '100%', sm: '30%' },
                textAlign: 'center',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>{t('year')}</Typography>
                <Typography variant="h4" sx={{ mb: 1, color: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  2160 <StarIcon />
                </Typography>
                <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                  {t('discount_40')}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                disabled={isPurchasing || !user}
                sx={{ mt: 2 }}
                onClick={() => user && handlePurchase('YEARLY')}
              >
                {isPurchasing ? t('processing') : t('buy')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Account; 