import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import telegramAnalytics from '@telegram-apps/analytics';

// Инициализируем Telegram Analytics только если есть токен
const analyticsToken = process.env.REACT_APP_TG_ANALYTICS_TOKEN;
if (analyticsToken && analyticsToken !== 'undefined') {
  try {
    telegramAnalytics.init({
      token: analyticsToken,
      appName: 'ispeechhelper',
    });
  } catch (error) {
    console.warn('Telegram Analytics не инициализирован:', error.message);
  }
} else {
  console.log('Telegram Analytics токен не найден, пропускаем инициализацию');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Подавление различных ошибок
window.addEventListener('error', function(event) {
  const message = event.message || '';
  
  // Подавляем ошибки, которые не критичны для работы приложения
  if (
    message.includes('TIMEOUT') ||
    message.includes('MetaMask extension not found') ||
    message.includes('Token is not provided') ||
    message.includes('ChromeTransport')
  ) {
    event.preventDefault();
    return;
  }
});

// Подавление unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  const reason = event.reason?.message || event.reason || '';
  
  if (
    reason.includes('MetaMask') ||
    reason.includes('Token is not provided') ||
    reason.includes('ChromeTransport')
  ) {
    event.preventDefault();
    return;
  }
});