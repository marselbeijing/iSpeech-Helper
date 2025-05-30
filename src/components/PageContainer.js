import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const PageContainer = ({ children, title, maxWidth = 'sm' }) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      overflow: 'auto',
      backgroundColor: theme.palette.background.default,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <Container 
        maxWidth={maxWidth} 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 0, sm: 2 },
          overflow: 'auto'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            width: '100%', 
            minHeight: '100vh',
            display: 'flex', 
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: { xs: 0, sm: 3 },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
              border: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
              mb: { xs: 0, sm: 3 },
              width: '100%',
              maxWidth: '100%',
              minWidth: '280px',
              height: { xs: '100vh', sm: 'auto' },
              minHeight: { xs: '100vh', sm: '540px' },
              maxHeight: { xs: '100vh', sm: '700px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              mx: 'auto',
              flex: 1,
              overflow: 'auto',
              pb: { xs: 8, sm: 4 } // Добавляем отступ снизу для навигационной панели
            }}
          >
            {children}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PageContainer; 