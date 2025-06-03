import React from 'react';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const gradientAnimation = keyframes`
  0% { stop-color: #FF4A6E; }
  33% { stop-color: #FFB84A; }
  66% { stop-color: #32B768; }
  100% { stop-color: #FF4A6E; }
`;

const AnimatedSvg = styled('svg')`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  width: 27.6px !important; /* 24px * 1.15 */
  height: 27.6px !important;
  stop {
    animation: ${gradientAnimation} 4s infinite;
    &:nth-of-type(2) {
      animation-delay: -2s;
    }
  }
`;

const AssistantIcon = () => (
  <AnimatedSvg width="27.6" height="27.6" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="assistantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" />
        <stop offset="100%" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#assistantGradient)" />
  </AnimatedSvg>
);

export default AssistantIcon; 