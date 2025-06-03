import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Assistant = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ 
      py: { xs: 0, sm: 4 }, 
      minHeight: '100vh',
      px: { xs: 0, sm: 2 }
    }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 0, sm: '24px' },
          padding: { xs: '16px', sm: '24px' },
          backgroundColor: theme.palette.background.paper,
          boxShadow: { xs: 'none', sm: '0 4px 20px rgba(0,0,0,0.08)' },
          marginBottom: { xs: 0, sm: '20px' },
          width: '100%',
          maxWidth: '100%',
          height: { xs: '100vh', sm: 'auto' },
          mx: 'auto',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: '#FF4A6E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 3,
            }}
          >
            <Typography variant="h6" color="white">
              {t('coming_soon')}
            </Typography>
          </Box>
          <Typography variant="h5" textAlign="center" gutterBottom>
            {t('virtual_assistant')}
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            {t('assistant_description')}
          </Typography>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default Assistant; 