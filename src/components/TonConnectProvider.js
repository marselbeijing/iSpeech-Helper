import React, { createContext, useContext, useEffect, useState } from 'react';
import { TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';

const TonConnectContext = createContext();

// Конфигурация TON Connect
const manifestUrl = 'https://i-speech-helper-uce4.vercel.app/tonconnect-manifest.json';

// TG Analytics интеграция для TON Connect событий
const useTonConnectAnalytics = () => {
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (!tonConnectUI || !window.telegramAnalytics) return;

    // Отслеживание событий подключения
    const unsubscribeStatusChange = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        // Успешное подключение
        window.telegramAnalytics.trackConnectionCompleted({
          wallet_address: wallet.account.address,
          wallet_type: wallet.device.appName,
          wallet_version: wallet.device.appVersion,
          auth_type: wallet.account.chain === '-239' ? 0 : 1, // 0 - ton_addr, 1 - ton_proof
          custom_data: {
            ton_connect_sdk_lib: '@tonconnect/sdk@3.0.5',
            ton_connect_ui_lib: '@tonconnect/ui-react@2.0.5'
          }
        });
      } else {
        // Отключение
        window.telegramAnalytics.trackDisconnection();
      }
    });

    // Отслеживание событий транзакций
    const unsubscribeModal = tonConnectUI.onModalStateChange((state) => {
      if (state === 'opened') {
        window.telegramAnalytics.trackConnectionStarted({
          custom_data: {
            ton_connect_sdk_lib: '@tonconnect/sdk@3.0.5',
            ton_connect_ui_lib: '@tonconnect/ui-react@2.0.5'
          }
        });
      }
    });

    return () => {
      unsubscribeStatusChange();
      unsubscribeModal();
    };
  }, [tonConnectUI]);

  return tonConnectUI;
};

// Компонент для отслеживания событий TON Connect
const TonConnectAnalytics = ({ children }) => {
  useTonConnectAnalytics();
  return children;
};

// Провайдер TON Connect с аналитикой
export const TonConnectProvider = ({ children }) => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <TonConnectAnalytics>
        {children}
      </TonConnectAnalytics>
    </TonConnectUIProvider>
  );
};

// Хук для использования TON Connect с аналитикой
export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  
  const sendTransaction = async (transaction) => {
    try {
      // Отправляем событие о начале транзакции
      if (window.telegramAnalytics) {
        window.telegramAnalytics.track('transaction-sent-for-signature', {
          custom_data: {
            ton_connect_sdk_lib: '@tonconnect/sdk@3.0.5',
            ton_connect_ui_lib: '@tonconnect/ui-react@2.0.5'
          }
        });
      }

      const result = await tonConnectUI.sendTransaction(transaction);
      
      // Событие успешной подписи
      if (window.telegramAnalytics) {
        window.telegramAnalytics.track('transaction-signed', {
          is_success: true,
          custom_data: {
            ton_connect_sdk_lib: '@tonconnect/sdk@3.0.5',
            ton_connect_ui_lib: '@tonconnect/ui-react@2.0.5'
          }
        });
      }

      return result;
    } catch (error) {
      // Событие ошибки подписи
      if (window.telegramAnalytics) {
        window.telegramAnalytics.track('transaction-signing-failed', {
          is_success: false,
          error_message: error.message || 'Transaction signing failed',
          error_code: error.code || null,
          custom_data: {
            ton_connect_sdk_lib: '@tonconnect/sdk@3.0.5',
            ton_connect_ui_lib: '@tonconnect/ui-react@2.0.5'
          }
        });
      }
      throw error;
    }
  };

  const connectWallet = async () => {
    try {
      if (window.telegramAnalytics) {
        window.telegramAnalytics.trackConnectionStarted({
          custom_data: {
            ton_connect_sdk_lib: '@tonconnect/sdk@3.0.5',
            ton_connect_ui_lib: '@tonconnect/ui-react@2.0.5'
          }
        });
      }

      await tonConnectUI.connectWallet();
    } catch (error) {
      if (window.telegramAnalytics) {
        window.telegramAnalytics.trackConnectionError({
          message: error.message || 'Connection failed',
          code: error.code || null
        });
      }
      throw error;
    }
  };

  const disconnect = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  return {
    tonConnectUI,
    sendTransaction,
    connectWallet,
    disconnect,
    connected: tonConnectUI?.connected || false,
    account: tonConnectUI?.account || null,
    wallet: tonConnectUI?.wallet || null
  };
};

export default TonConnectProvider; 