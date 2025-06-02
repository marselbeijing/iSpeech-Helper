import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';

const Root = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
        transition: 'background 0.3s ease',
        paddingBottom: '56px',
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