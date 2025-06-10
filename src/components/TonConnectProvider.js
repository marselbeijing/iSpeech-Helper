import React from 'react';

// Временно отключаем TON Connect до деплоя манифеста
const DISABLE_TON_CONNECT = true;

// TG Analytics интеграция для TON Connect событий (временно отключена)
const useTonConnectAnalytics = () => {
  if (DISABLE_TON_CONNECT) return null;
  
  // TODO: Включить после деплоя манифеста
  return null;
};

// Компонент для отслеживания событий TON Connect
const TonConnectAnalytics = ({ children }) => {
  useTonConnectAnalytics();
  return children;
};

// Провайдер TON Connect с аналитикой (временно отключен)
export const TonConnectProvider = ({ children }) => {
  if (DISABLE_TON_CONNECT) {
    console.log('🔕 TON Connect временно отключен до деплоя манифеста');
    return children;
  }
  
  // TODO: Включить после деплоя манифеста
  return children;
};

// Хук для использования TON Connect с аналитикой (временно отключен)
export const useTonConnect = () => {
  if (DISABLE_TON_CONNECT) {
    return {
      tonConnectUI: null,
      sendTransaction: async () => { throw new Error('TON Connect отключен'); },
      connectWallet: async () => { throw new Error('TON Connect отключен'); },
      disconnect: async () => {},
      connected: false,
      account: null,
      wallet: null
    };
      }
  
  // TODO: Включить после деплоя манифеста
  return {
    tonConnectUI: null,
    sendTransaction: async () => { throw new Error('TON Connect отключен'); },
    connectWallet: async () => { throw new Error('TON Connect отключен'); },
    disconnect: async () => {},
    connected: false,
    account: null,
    wallet: null
  };
};

export default TonConnectProvider; 