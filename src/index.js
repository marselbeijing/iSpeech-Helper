import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

// Analytics уже инициализируется в сервисе

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// Подавление различных ошибок
window.addEventListener('error', function(event) {
  const message = event.message || '';
  
  // Подавляем ошибки, которые не критичны для работы приложения
  if (
    message.includes('TIMEOUT') ||
    message.includes('TelegramClient') ||
    message.includes('_updateLoop') ||
    message.includes('Not connected') ||
    message.includes('Connection closed while receiving data') ||
    message.includes('Время ожидания запроса истекло') ||
    message.includes('MetaMask extension not found') ||
    message.includes('Token is not provided') ||
    message.includes('ChromeTransport') ||
    message.includes('chrome runtime disconnected') ||
    message.includes('chrome.runtime') ||
    message.includes('Extension context invalidated')
  ) {
    event.preventDefault();
    return;
  }
});

// Подавление необработанных promise rejection'ов
window.addEventListener('unhandledrejection', function(event) {
  const message = event.reason?.message || event.reason || '';
  
  if (
    typeof message === 'string' && (
      message.includes('TIMEOUT') ||
      message.includes('TelegramClient') ||
      message.includes('Not connected') ||
      message.includes('Connection closed') ||
      message.includes('Время ожидания запроса истекло')
    )
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
    reason.includes('ChromeTransport') ||
    reason.includes('chrome runtime disconnected') ||
    reason.includes('chrome.runtime') ||
    reason.includes('Extension context invalidated') ||
    reason.includes('TIMEOUT') ||
    reason.includes('TelegramClient') ||
    reason.includes('_updateLoop')
  ) {
    event.preventDefault();
    return;
  }
});