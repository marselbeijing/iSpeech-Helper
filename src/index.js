import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

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