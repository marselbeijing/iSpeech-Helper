import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import telegramAnalytics from '@telegram-apps/analytics';

// Initialize analytics before the app renders
const SDK_AUTH_TOKEN = 'eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9pU3BlZWNoSGVscGVyX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2ktc3BlZWNoLWhlbHBlci11Y2U0LnZlcmNlbC5hcHAifQ==!xnr1GO/F3uekQi8c2s7KcdMvjEP35yprm/UWP9Z7q4A=';

try {
  if (window.Telegram?.WebApp?.initData) {
    telegramAnalytics.init({
      token: SDK_AUTH_TOKEN,
      appName: 'ispeech_helper'
    });
    console.log('Telegram Analytics SDK initialized successfully from index.js.');
  } else {
    console.log('Not in Telegram environment, skipping analytics initialization.');
  }
} catch (error) {
  console.error('Failed to initialize Telegram Analytics SDK in index.js:', error);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);