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

// === Функции отладки модального окна ===
window.checkModalState = function() {
  const lastShown = localStorage.getItem('trialExpiredModalLastShown');
  const snoozedUntil = localStorage.getItem('trialModalSnoozedUntil');
  const state = {
    lastModalShown: lastShown ? new Date(parseInt(lastShown)).toLocaleString() : 'Никогда',
    snoozedUntil: snoozedUntil ? new Date(parseInt(snoozedUntil)).toLocaleString() : 'Нет',
    canShowModal: !lastShown || (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60) >= 4,
    isModalSnoozed: snoozedUntil && Date.now() < parseInt(snoozedUntil),
    currentTime: new Date().toLocaleString()
  };
  console.table(state);
  return state;
};

window.clearTrialCache = function() {
  localStorage.removeItem('trialExpiredModalLastShown');
  localStorage.removeItem('trialModalSnoozedUntil');
  console.log('Кэш модального окна очищен!');
};

window.forceHideModal = function() {
  const modals = document.querySelectorAll('[role="dialog"], .MuiModal-root');
  modals.forEach(modal => {
    if (modal.style.display !== 'none') {
      modal.style.display = 'none';
      console.log('Скрыто модальное окно:', modal);
    }
  });
  return 'Все модальные окна скрыты принудительно';
};
// === Конец функций отладки ===