import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import telegramAnalytics from '@telegram-apps/analytics';
import WebApp from '@twa-dev/sdk';

// Initialize Telegram Analytics ONLY if running inside Telegram
if (WebApp.platform !== 'unknown' && process.env.NODE_ENV === 'production') {
  telegramAnalytics.init({
    token: 'b3a58e2a-d242-4368-a0d7-5421293a525f', // SDK Auth token
    appName: 'iSpeech Helper', // The analytics identifier
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);