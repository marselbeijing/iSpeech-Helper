import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Switch,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  VolumeUp as VolumeIcon,
  Vibration as VibrationIcon,
  Translate as LanguageIcon,
  ArrowBack,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import { getUserSettings, saveUserSettings } from '../services/storage';
import { useNavigate } from 'react-router-dom';

const Functions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    darkMode: false,
    soundEffects: true,
    vibration: true,
    language: 'ru',
  });

  useEffect(() => {
    // Загрузка настроек из хранилища при монтировании компонента
    const savedSettings = getUserSettings();
    if (savedSettings) {
      setSettings({
        darkMode: savedSettings.darkMode || false,
        soundEffects: savedSettings.soundEnabled || true,
        vibration: savedSettings.vibrationEnabled || true,
        language: 'ru', // По умолчанию русский
      });
    }
  }, []);

  const menuItems = [
    {
      title: 'Темная тема',
      description: 'Включить темный режим интерфейса',
      icon: <DarkModeIcon />,
      value: settings.darkMode,
      onChange: (value) => {
        const newSettings = { ...settings, darkMode: value };
        setSettings(newSettings);
        saveUserSettings({
          ...getUserSettings(),
          darkMode: value
        });
        
        // Отправляем пользовательское событие для обновления темы
        window.dispatchEvent(
          new CustomEvent('themeChanged', {
            detail: { darkMode: value }
          })
        );
      },
      color: '#9c27b0',
    },
    {
      title: 'Звуковые эффекты',
      description: 'Включить звуковые эффекты при взаимодействии',
      icon: <VolumeIcon />,
      value: settings.soundEffects,
      onChange: (value) => {
        const newSettings = { ...settings, soundEffects: value };
        setSettings(newSettings);
        saveUserSettings({
          ...getUserSettings(),
          soundEnabled: value
        });
      },
      color: '#4caf50',
    },
    {
      title: 'Использовать английский язык',
      description: 'Переключить интерфейс на английский язык',
      icon: <LanguageIcon />,
      value: settings.language === 'en',
      onChange: (value) => {
        const newLanguage = value ? 'en' : 'ru';
        const newSettings = { ...settings, language: newLanguage };
        setSettings(newSettings);
        // Примечание: язык пока не сохраняется в хранилище
      },
      color: '#f44336',
    },
  ];

  const handleSettingChange = (item, value) => {
    if (settings.soundEffects) {
      playSound('click');
    }
    item.onChange(value);
  };

  const handleBack = () => {
    playSound('click');
    vibrate('click');
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 3,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
              : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
            border: `1px solid ${theme.palette.divider}`,
            mb: 3,
            width: '90%',
            maxWidth: '100%',
            minWidth: '280px',
            height: 'auto',
            minHeight: '540px',
            maxHeight: '700px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mx: 'auto',
          }}
        >
          {/* Синий заголовок */}
          <Box
            sx={{
              width: '100%',
              background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
              borderRadius: 2,
              mb: 3,
              py: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
            }}
          >
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ 
                color: '#fff',
                fontWeight: 'bold',
                textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                m: 0,
              }}
            >
              Настройки
            </Typography>
          </Box>

          <List sx={{ width: '100%', px: 1 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    py: 2,
                    borderRadius: 3,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'background.paper',
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: item.color,
                      boxShadow: `0 4px 12px 0 ${item.color}20`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                        {item.title}
                      </Typography>
                    } 
                    secondary={
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {item.description}
                      </Typography>
                    } 
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={item.value}
                      onChange={(e) => handleSettingChange(item, e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: item.color,
                          '& + .MuiSwitch-track': {
                            backgroundColor: item.color,
                          },
                        },
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* Кнопка назад */}
          <Button
            variant="contained"
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
              mt: 'auto',
              mb: 2,
            }}
          >
            Назад
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Functions; 