import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const getTelegramUser = () => {
  if (
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initDataUnsafe &&
    window.Telegram.WebApp.initDataUnsafe.user
  ) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

const TelegramLogin = ({ onAuth }) => {
  const [showWidget, setShowWidget] = useState(false);
  const [tgUser, setTgUser] = useState(null);
  const widgetRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const user = getTelegramUser();
    if (user) {
      setTgUser(user);
      if (onAuth) onAuth(user);
      return;
    }
    setTgUser(null);
  }, [onAuth]);

  const handleTelegramAuth = useCallback((user) => {
    alert('Вы успешно авторизованы через Telegram!');
    if (onAuth) onAuth(user);
  }, [onAuth]);

  useEffect(() => {
    if (!showWidget || tgUser) return;
    const widgetDiv = widgetRef.current;
    if (widgetDiv) widgetDiv.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'iSpeechHelper_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-lang', 'ru');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;

    if (widgetDiv) {
      widgetDiv.appendChild(script);
    }

    window.onTelegramAuth = handleTelegramAuth;

    return () => {
      if (widgetDiv) widgetDiv.innerHTML = '';
      delete window.onTelegramAuth;
    };
  }, [showWidget, tgUser, handleTelegramAuth]);

  if (tgUser) {
    return (
      <div style={{ textAlign: 'center', margin: 24 }}>
        <h2>Вы авторизованы через Telegram</h2>
        <div style={{ margin: 16 }}>
          <img src={tgUser.photo_url} alt="avatar" style={{ width: 64, height: 64, borderRadius: 32 }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 500 }}>{tgUser.first_name} {tgUser.last_name}</div>
        <div style={{ color: '#888', marginBottom: 8 }}>@{tgUser.username}</div>
        <div style={{ color: '#229ED9' }}>ID: {tgUser.id}</div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{t('sign_in_telegram')}</h2>
      {!showWidget && (
        <Button
          variant="contained"
          onClick={() => setShowWidget(true)}
          sx={{
            background: '#229ED9',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 18,
            cursor: 'pointer',
            margin: '24px 0',
            textTransform: 'none',
            '&:hover': {
              background: '#1E8BC3',
            },
          }}
        >
          {t('sign_in_telegram')}
        </Button>
      )}
      <div ref={widgetRef} id="telegram-login-widget" style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }} />
    </div>
  );
};

export default TelegramLogin; 