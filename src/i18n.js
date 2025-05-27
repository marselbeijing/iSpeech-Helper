import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';

// Get saved language from localStorage or use browser language
const savedLang = localStorage.getItem('lang');
const browserLang = navigator.language.split('-')[0];
const defaultLang = savedLang || (browserLang === 'ru' ? 'ru' : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n; 