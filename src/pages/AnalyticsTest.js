import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Chip,
  Alert,
  Stack
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import usePremiumAccess from '../hooks/usePremiumAccess';
import TrialWelcomeModal from '../components/TrialWelcomeModal';
import { useNavigate } from 'react-router-dom';
import { getTrialTexts } from '../services/trial';

const AnalyticsTest = () => {
  const [analyticsStatus, setAnalyticsStatus] = useState({
    sdkLoaded: false,
    initialized: false,
    telegramWebApp: false,
    errors: []
  });
  const { blocked, loading, trialData, checkAccess } = usePremiumAccess();
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAnalyticsStatus();
  }, []);

  React.useEffect(() => {
    if (!loading && blocked) {
      setShowModal(true);
    }
  }, [loading, blocked]);

  const checkAnalyticsStatus = () => {
    const status = {
      sdkLoaded: false,
      initialized: false,
      telegramWebApp: false,
      errors: []
    };

    // Проверка загрузки SDK
    if (typeof window.telegramAnalytics !== 'undefined' || typeof telegramAnalytics !== 'undefined') {
      status.sdkLoaded = true;
    } else {
      status.errors.push('SDK не загружен');
    }

    // Проверка Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      status.telegramWebApp = true;
    } else {
      status.errors.push('Telegram WebApp недоступен');
    }

    setAnalyticsStatus(status);
  };

  const runAnalyticsTest = () => {
    console.log('🧪 Запуск тестирования аналитики...');
    
    // Вызываем отладочную функцию
    if (window.checkTelegramAnalytics) {
      window.checkTelegramAnalytics();
    }
    
    // Специальная проверка для Telegram Web
    if (window.testTelegramWeb) {
      window.testTelegramWeb();
    }
    
    // Проверяем сетевые запросы
    console.log('📡 Проверьте вкладку Network в DevTools для исходящих запросов к tganalytics.xyz');
    
    checkAnalyticsStatus();
  };

  const testInTelegramWeb = () => {
    console.log('🌐 Специальный тест для Telegram Web');
    
    // Проверяем контекст Telegram
    const isTelegramContext = window.Telegram && window.Telegram.WebApp;
    console.log('📱 Контекст Telegram:', isTelegramContext ? 'Да' : 'Нет');
    
    if (isTelegramContext) {
      console.log('✅ Приложение запущено в Telegram Web');
      console.log('🔗 URL:', window.location.href);
      console.log('📱 Платформа:', window.Telegram.WebApp.platform);
    } else {
      console.log('⚠️ Приложение НЕ в контексте Telegram');
      console.log('💡 Откройте приложение через бота в Telegram Web');
    }
    
    if (window.testTelegramWeb) {
      window.testTelegramWeb();
    }
  };

  const StatusChip = ({ condition, label }) => (
    <Chip
      icon={condition ? <CheckCircle /> : <Error />}
      label={label}
      color={condition ? 'success' : 'error'}
      variant="outlined"
    />
  );

  if (showModal) {
    return (
      <TrialWelcomeModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onBuyPremium={() => {
          setShowModal(false);
        }}
        trialExpired={blocked || (trialData?.trial?.isActive === false)}
      />
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        🔬 Тест Telegram Analytics
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Статус компонентов
          </Typography>
          
          <Stack spacing={1} sx={{ mb: 2 }}>
            <StatusChip 
              condition={analyticsStatus.sdkLoaded} 
              label="Telegram Analytics SDK" 
            />
            <StatusChip 
              condition={analyticsStatus.telegramWebApp} 
              label="Telegram WebApp" 
            />
          </Stack>

          {analyticsStatus.errors.length > 0 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Обнаружены проблемы:</Typography>
              <ul>
                {analyticsStatus.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Button 
            variant="contained" 
            onClick={runAnalyticsTest}
            fullWidth
            sx={{ mt: 2 }}
          >
            🔄 Обновить проверку
          </Button>

          <Button 
            variant="outlined" 
            onClick={testInTelegramWeb}
            fullWidth
            sx={{ mt: 1 }}
            color="primary"
          >
            🌐 Тест Telegram Web
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Инструкции по тестированию
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Как проверить работу аналитики:</strong>
            </Typography>
          </Alert>

          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Откройте <strong>DevTools</strong> (F12) → вкладка <strong>Console</strong>
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Найдите сообщения с эмодзи 🔍 ✅ ❌ 📊
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Перейдите на вкладку <strong>Network</strong>
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Ищите запросы к <code>tganalytics.xyz</code>
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Выполните команду: <code>checkTelegramAnalytics()</code>
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
              🌐 Для Telegram Web: <code>testTelegramWeb()</code>
            </Typography>
          </Box>

          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>🌐 Telegram Web:</strong> Откройте приложение через вашего бота в web.telegram.org для полного тестирования аналитики
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsTest; 