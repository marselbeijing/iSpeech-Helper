import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';
import telegramAnalyticsService from '../services/telegramAnalytics';

const Root = () => {
  const theme = useTheme();
  const location = useLocation();
  const [lastPageTime, setLastPageTime] = useState(Date.now());

  // Отслеживание навигации между страницами
  useEffect(() => {
    const currentTime = Date.now();
    const timeSpent = Math.round((currentTime - lastPageTime) / 1000);
    
    // Отслеживаем просмотр страницы
    const pageName = location.pathname === '/' ? 'home' : location.pathname.slice(1);
    
    // Если это не первая страница, отслеживаем время, проведенное на предыдущей
    if (timeSpent > 1) { // Минимум 1 секунда
      telegramAnalyticsService.trackPageView(pageName, timeSpent);
    } else {
      telegramAnalyticsService.trackPageView(pageName);
    }
    
    setLastPageTime(currentTime);
    
    console.log(`📍 Переход на страницу: ${pageName}`);
  }, [location.pathname, lastPageTime]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
        transition: 'background 0.3s ease',
        paddingBottom: '66px',
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
        }}
      >
        <Outlet />
      </Box>
      <NavigationBar />
    </Box>
  );
};

export default Root; 