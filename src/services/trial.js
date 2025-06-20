import { getCurrentUser } from './telegram';

const API_BASE = process.env.REACT_APP_API_URL || 'https://ispeech-server.vercel.app';

// Получение статуса пробного периода
export const getTrialStatus = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      throw new Error('User not found');
    }

    const response = await fetch(`${API_BASE}/api/trial/status/${user.id}?lang=${user.language_code || 'ru'}`);
    if (!response.ok) {
      throw new Error('Failed to fetch trial status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching trial status:', error);
    throw error;
  }
};

// Отметка о просмотре приветственного сообщения
export const markWelcomeSeen = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      throw new Error('User not found');
    }

    const response = await fetch(`${API_BASE}/api/trial/welcome-seen/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to mark welcome as seen');
    }

    return await response.json();
  } catch (error) {
    console.error('Error marking welcome as seen:', error);
    throw error;
  }
};

// Проверка доступа к функции
export const checkAccess = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      return { hasAccess: false, reason: 'no_user' };
    }

    const response = await fetch(`${API_BASE}/api/trial/check-access/${user.id}`);
    if (!response.ok) {
      throw new Error('Failed to check access');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking access:', error);
    return { hasAccess: false, reason: 'error' };
  }
};

// Форматирование времени для отображения
export const formatTimeLeft = (timeLeft) => {
  if (!timeLeft) return '0д 0ч 0м';
  
  const { days, hours, minutes } = timeLeft;
  
  if (days > 0) {
    return `${days}д ${hours}ч ${minutes}м`;
  } else if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
};

// Локализованные тексты для пробного периода
export const getTrialTexts = (language = 'ru') => {
  const isEnglish = language === 'en' || language?.startsWith('en');
  
  return {
    welcomeTitle: isEnglish ? 'Welcome to iSpeech Helper!' : 'Добро пожаловать в iSpeech Helper!',
    trialDescription: isEnglish ? 
      'You can use the app for FREE for 3 days with full access to all features!' :
      'Вы можете пользоваться приложением БЕСПЛАТНО 3 дня с полным доступом ко всем функциям!',
    premiumFeatures: isEnglish ? 'Premium features include:' : 'В премиум подписку входит:',
    feature1: isEnglish ? '🎯 All speech exercises' : '🎯 Все упражнения для речи',
    feature2: isEnglish ? '🫁 Breathing exercises' : '🫁 Дыхательные упражнения', 
    feature3: isEnglish ? '🎭 Tongue twisters' : '🎭 Скороговорки',
    feature4: isEnglish ? '📚 Reading exercises' : '📚 Упражнения для чтения',
    feature5: isEnglish ? '🎨 Emotions trainer' : '🎨 Тренажер эмоций',
    feature6: isEnglish ? '📊 Progress tracking' : '📊 Отслеживание прогресса',
    startTrialButton: isEnglish ? 'Start Free Trial' : 'Начать бесплатный период',
    buyNowButton: isEnglish ? 'Buy Premium' : 'Купить Премиум',
    trialTimeLeft: isEnglish ? 'Trial time left:' : 'Осталось пробного времени:',
    trialExpired: isEnglish ? 'Trial period expired' : 'Пробный период истек',
    subscribeNow: isEnglish ? 'Subscribe now to continue using all features' : 'Оформите подписку, чтобы продолжить пользоваться всеми функциями',
    trialActive: isEnglish ? 'Free trial active' : 'Бесплатный период активен'
  };
}; 