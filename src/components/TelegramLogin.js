import React, { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
=======
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)

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

<<<<<<< HEAD
const TelegramLogin = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [tgUser, setTgUser] = useState(null);
  const widgetRef = useRef(null);
  const { t } = useTranslation();
=======
const TelegramLogin = ({ onAuth }) => {
  const [showWidget, setShowWidget] = useState(false);
  const [tgUser, setTgUser] = useState(null);
  const widgetRef = useRef(null);
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)

  useEffect(() => {
    const user = getTelegramUser();
    if (user) {
      setTgUser(user);
<<<<<<< HEAD
=======
      if (onAuth) onAuth(user);
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)
      return;
    }
    setTgUser(null);
  }, []);

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

    window.onTelegramAuth = (user) => {
      alert('Вы успешно авторизованы через Telegram!');
<<<<<<< HEAD
=======
      if (onAuth) onAuth(user);
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)
    };

    return () => {
      if (widgetDiv) widgetDiv.innerHTML = '';
      delete window.onTelegramAuth;
    };
<<<<<<< HEAD
  }, [showWidget, tgUser]);
=======
  }, [showWidget, tgUser, onAuth]);
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)

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
<<<<<<< HEAD
      <h2>{t('sign_in_telegram')}</h2>
      {!showWidget && (
        <Button
          variant="contained"
          onClick={() => setShowWidget(true)}
          sx={{
=======
      <h2>Войти через Telegram</h2>
      {!showWidget && (
        <button
          style={{
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)
            background: '#229ED9',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 18,
            cursor: 'pointer',
            margin: '24px 0',
<<<<<<< HEAD
            textTransform: 'none',
            '&:hover': {
              background: '#1E8BC3',
            },
          }}
        >
          {t('sign_in_telegram')}
        </Button>
=======
          }}
          onClick={() => setShowWidget(true)}
        >
          Войти через Telegram
        </button>
>>>>>>> 0ea33bd (Добавлена техподдержка с ссылкой на Telegram)
      )}
      <div ref={widgetRef} id="telegram-login-widget" style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }} />
    </div>
  );
};

export default TelegramLogin; 