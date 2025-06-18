import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';

const Root = () => {
  const theme = useTheme();
  const location = useLocation();
  
  // Отслеживаем навигацию между страницами
  useEffect(() => {
    // Можно добавить логику отслеживания навигации здесь при необходимости
  }, [location]);
  
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