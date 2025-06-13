import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import telegramAnalytics from '@telegram-apps/analytics';

telegramAnalytics.init({
  token: 'ВАШ_TOKEN', // замените на свой
  appName: 'ВАШ_APP_NAME', // замените на свой
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