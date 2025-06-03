import React from 'react';

const AssistantIcon = () => {
  const gradientId = `assistantGradient_${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      style={{ 
        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
        transform: 'translateY(-2px)'
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F0FE" />
          <stop offset="100%" stopColor="#4A90E2" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="13" fill={`url(#${gradientId})`} />
    </svg>
  );
};

export default AssistantIcon; 