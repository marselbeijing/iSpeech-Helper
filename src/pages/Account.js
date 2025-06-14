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
  TextField,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  Telegram as TelegramIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { verifyTelegramAuth, getCurrentUser, logout } from '../services/telegram';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import TelegramLogin from '../components/TelegramLogin';
import { checkSubscriptionStatus, purchaseSubscription } from '../services/subscription';
import { useTranslation } from 'react-i18next';
import { getUserSettings, saveUserSettings } from '../services/storage';
import { getReferralStats, getReferralTransactions, generateReferralLink, requestPayout } from '../services/referral';
import ReferralProgram from '../components/ReferralProgram';

const StarIcon = () => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2l3.09 6.26L24 9.27l-5 4.87L20.18 22 14 18.27 7.82 22 9 14.14l-5-4.87 6.91-1.01L14 2z" fill="#FFD600" stroke="#FFC107" strokeWidth="1.5"/>
    </svg>
  </span>
);

const Account = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [settings, setSettings] = useState(getUserSettings());
  const [showCopied, setShowCopied] = useState(false);
  const [showError, setShowError] = useState(false);
  const [referralStats, setReferralStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [payoutStatus, setPayoutStatus] = useState(null);
  const [starsAvailable, setStarsAvailable] = useState(false);

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
  }, [user]);

  useEffect(() => {
    if (user) {
      const loadReferralData = async () => {
        try {
          const stats = await getReferralStats();
          const txHistory = await getReferralTransactions();
          setReferralStats(stats);
          setTransactions(txHistory);
        } catch (error) {
          console.error('Error loading referral data:', error);
        }
      };
      loadReferralData();
    }
  }, [user]);

  useEffect(() => {
    // Проверяем доступность Telegram Stars
    if (window.Telegram?.WebApp?.Stars) {
      setStarsAvailable(true);
    } else {
      setStarsAvailable(false);
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

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveUserSettings(newSettings);
  };

  const generateReferralLink = () => {
    // В реальном приложении здесь будет генерация уникальной ссылки
    return `https://ispeech.app/ref/${settings.userId || 'demo'}`;
  };

  const copyToClipboard = async () => {
    try {
      const link = await generateReferralLink();
      await navigator.clipboard.writeText(link);
      setShowCopied(true);
      playSound('success');
      vibrate('success');
    } catch (err) {
      setShowError(true);
      playSound('error');
      vibrate('error');
    }
  };

  const shareLink = async () => {
    try {
      const link = await generateReferralLink();
      await navigator.share({
        title: 'iSpeech Helper',
        text: t('referral_share_text'),
        url: link,
      });
      playSound('success');
      vibrate('success');
    } catch (err) {
      setShowError(true);
      playSound('error');
      vibrate('error');
    }
  };

  const handleRequestPayout = async () => {
    try {
      const result = await requestPayout();
      setPayoutStatus(result);
      if (result.success) {
        const stats = await getReferralStats();
        setReferralStats(stats);
        playSound('success');
        vibrate('success');
      } else {
        playSound('error');
        vibrate('error');
      }
    } catch (error) {
      console.error('Error requesting payout:', error);
      playSound('error');
      vibrate('error');
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
      paddingBottom: { xs: 0, sm: '72px' },
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Container maxWidth="sm" sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        py: { xs: 0, sm: 2 },
        px: { xs: 0, sm: 2 },
        flex: 1,
        width: '100%',
      }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: 0, sm: 3 },
            background: theme.palette.background.paper,
            border: { xs: 'none', sm: '1px solid' },
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
            width: '100%',
            maxWidth: '100%',
            mx: 0,
            mb: { xs: 0, sm: 2 },
            minHeight: { xs: '100vh', sm: 'auto' },
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
            {t('about_app')}
          </Button>

          {/* Блок подписок */}
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: { xs: 2, sm: 3 },
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
              border: `1px solid ${theme.palette.divider}`,
              mt: 3,
              width: '100%',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
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
                  height: { xs: 'auto', sm: 240 },
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
                  disabled={!starsAvailable || isPurchasing || !user}
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
                  height: { xs: 'auto', sm: 240 },
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
                  disabled={!starsAvailable || isPurchasing || !user}
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
                  height: { xs: 'auto', sm: 240 },
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
                  disabled={!starsAvailable || isPurchasing || !user}
                  sx={{ mt: 2 }}
                  onClick={() => user && handlePurchase('YEARLY')}
                >
                  {isPurchasing ? t('processing') : t('buy')}
                </Button>
              </Box>
            </Box>
          </Box>
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
                {t('about_app')}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph style={{ whiteSpace: 'pre-line' }}>
                {i18n.language === 'ru' && `iSpeech Helper — специализированное приложение для помощи людям с нарушениями речи. Оно создано для улучшения дикции, артикуляции и общего качества речи с помощью набора эффективных упражнений. Основные возможности: 

★ Диафрагмальные дыхательные упражнения — развивают контроль над дыханием, способствуют плавности речи. 
★ Скороговорки — тренируют дикцию, артикуляцию и чёткость произношения. 
★ Тренажёр эмоций — учит выражать чувства голосом, делает речь более выразительной. 
★ Плавное чтение — помогает развить ритм и плавность речи, снижает заикание. 
★ Чтение с метрономом — формирует правильный темп и ритмичность речи. 
★ DAF/MAF — техники обратной аудиосвязи и наложения шума для контроля скорости и плавности речи. 

Преимущества: 
- Регулярные тренировки заметно улучшают разборчивость и выразительность речи. 
- Персональный подбор упражнений под ваши цели. 
- Система прогресса и достижений. 
- Простой и современный интерфейс для всех возрастов. 
- Поддержка русского и английского языков.`}
              </Typography>
            </Paper>
          </Fade>
        </Modal>

        <ReferralProgram />

        <Snackbar
          open={showCopied}
          autoHideDuration={3000}
          onClose={() => setShowCopied(false)}
        >
          <Alert severity="success" onClose={() => setShowCopied(false)}>
            {t('copied_to_clipboard')}
          </Alert>
        </Snackbar>

        <Snackbar
          open={showError}
          autoHideDuration={3000}
          onClose={() => setShowError(false)}
        >
          <Alert severity="error" onClose={() => setShowError(false)}>
            {t('error_occurred')}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Account; 