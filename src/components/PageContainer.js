import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const PageContainer = ({ children, maxWidth = "sm", showAnimation = true, ...props }) => {
  const theme = useTheme();

  const containerContent = (
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
      <Container maxWidth={maxWidth} sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        p: { xs: 0, sm: 2 }
      }}>
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
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mx: 'auto',
            ...props.sx
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );

  if (showAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', height: '100%' }}
      >
        {containerContent}
      </motion.div>
    );
  }

  return containerContent;
};

export default PageContainer; 