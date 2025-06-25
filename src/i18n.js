import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';

// Get saved language from localStorage or default to English
const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
const defaultLang = savedLang || 'en'; // По умолчанию английский

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    lng: defaultLang,
    fallbackLng: 'en', // Fallback тоже английский
    interpolation: { escapeValue: false }
  });

export default i18n;
