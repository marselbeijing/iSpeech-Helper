import React, { useEffect, createContext, useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';
import YandexMetrika from './YandexMetrika';

// Создаем контекст для навигации
const NavigationContext = createContext();

// Хук для использования навигации
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

const Root = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Отслеживаем навигацию между страницами
  useEffect(() => {
    // Можно добавить логику отслеживания навигации здесь при необходимости
  }, [location]);
  
  return (
    <NavigationContext.Provider value={{ navigate }}>
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
        <YandexMetrika />
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
    </NavigationContext.Provider>
  );
};

export default Root; 