import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import telegramAnalytics from '@telegram-apps/analytics';

telegramAnalytics.init({
  token: process.env.REACT_APP_TG_ANALYTICS_TOKEN,
  appName: 'ispeechhelper',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Подавление предупреждений о TIMEOUT
window.addEventListener('error', function(event) {
  if (event.message && event.message.includes('TIMEOUT')) {
    // Не выводим в консоль
    event.preventDefault();
    return;
  }
});

// Подавление ошибок MetaMask extension not found
window.addEventListener('error', function(event) {
  if (event.message && event.message.includes('MetaMask extension not found')) {
    event.preventDefault();
    return;
  }
});