import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ title, sx = {} }) => {
  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
        borderRadius: 2,
        mb: 2,
        py: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
        ...sx
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
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader; 