import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Insights as ProgressIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import { useTranslation } from 'react-i18next';

const AssistantIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))' }}>
    <defs>
      <linearGradient id="assistantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8F0FE" />
        <stop offset="100%" stopColor="#4A90E2" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#assistantGradient)" />
  </svg>
);

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    playSound('click');
    vibrate('click');
    navigate(newValue);
  };

  const navItems = [
    { value: '/', icon: <HomeIcon />, label: t('home') },
    { value: '/progress', icon: <ProgressIcon />, label: t('progress') },
    { value: '/assistant', icon: <AssistantIcon />, label: t('virtual_assistant') },
    { value: '/functions', icon: <SettingsIcon />, label: t('settings') },
    { value: '/account', icon: <PersonIcon />, label: t('account') }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: '16px 16px 0 0',
          borderTop: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        }}
      >
        <BottomNavigation
          value={location.pathname}
          onChange={handleChange}
          sx={{
            bgcolor: theme.palette.background.paper,
            height: 62,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '0px 4px',
              margin: '0 2px',
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              transition: 'all 0.2s',
              '&.Mui-selected': {
                fontSize: '0.75rem',
              },
            },
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.value}
              value={item.value}
              icon={item.icon}
              label={item.label}
              sx={{
                '& .MuiBottomNavigationAction-icon': {
                  fontSize: '1.5rem',
                  transition: 'all 0.2s',
                },
                flex: item.value === '/assistant' ? '1.2' : '1',
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </motion.div>
  );
};

export default NavigationBar; 