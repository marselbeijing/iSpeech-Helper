import { getCurrentUser } from './telegram';

const API_BASE = process.env.REACT_APP_API_URL || 'https://ispeech-server.vercel.app';

// Получение статуса пробного периода
export const getTrialStatus = async () => {
  try {
    const user = getCurrentUser();
    console.log('🔍 Получение статуса пробного периода для пользователя:', user);
    
    if (!user?.id) {
      console.log('❌ Пользователь не найден, возвращаем демо-статус');
      // Проверяем localStorage для демо-режима
      const hasSeenWelcome = localStorage.getItem('trialWelcomeSeen') === 'true';
      console.log('📱 Demo hasSeenWelcome:', hasSeenWelcome);
      // Возвращаем демо-статус для показа модального окна
      return {
        hasActiveSubscription: false,
        trial: {
          isActive: true,
          hasSeenWelcome: hasSeenWelcome,
          timeLeft: { days: 3, hours: 0, minutes: 0 },
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      };
    }

    const response = await fetch(`${API_BASE}/api/trial/status/${user.id}?lang=${user.language_code || 'ru'}`);
    
    if (!response.ok) {
      console.log('⚠️ Сервер недоступен, возвращаем демо-статус');
      // Fallback для демонстрации
      return {
        hasActiveSubscription: false,
        trial: {
          isActive: true,
          hasSeenWelcome: false,
          timeLeft: { days: 3, hours: 0, minutes: 0 },
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      };
    }

    const result = await response.json();
    console.log('✅ Статус получен с сервера:', result);
    return result;
  } catch (error) {
    console.error('❌ Ошибка получения статуса пробного периода:', error);
    // Возвращаем демо-статус в случае ошибки
    return {
      hasActiveSubscription: false,
      trial: {
        isActive: true,
        hasSeenWelcome: false,
        timeLeft: { days: 3, hours: 0, minutes: 0 },
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    };
  }
};

// Отметка о просмотре приветственного сообщения
export const markWelcomeSeen = async () => {
  try {
    const user = getCurrentUser();
    console.log('✅ Отмечаем просмотр приветствия для пользователя:', user?.id);
    
    if (!user?.id) {
      console.log('❌ Пользователь не найден, сохраняем в localStorage');
      // Fallback - сохраняем в localStorage
      localStorage.setItem('trialWelcomeSeen', 'true');
      return { success: true, method: 'localStorage' };
    }

    const response = await fetch(`${API_BASE}/api/trial/welcome-seen/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.log('⚠️ Сервер недоступен, сохраняем в localStorage');
      // Fallback - сохраняем в localStorage
      localStorage.setItem('trialWelcomeSeen', 'true');
      return { success: true, method: 'localStorage' };
    }

    const result = await response.json();
    console.log('✅ Приветствие отмечено на сервере:', result);
    return result;
  } catch (error) {
    console.error('❌ Ошибка отметки приветствия:', error);
    // Fallback - сохраняем в localStorage
    localStorage.setItem('trialWelcomeSeen', 'true');
    return { success: true, method: 'localStorage' };
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
    trialActive: isEnglish ? 'Free trial active' : 'Бесплатный период активен',
    
    // Новые тексты для модального окна
    freeTrialChip: isEnglish ? '3 days FREE' : '3 дня БЕСПЛАТНО',
    subscriptionNote: isEnglish ? 
      'After the trial period ends, you will need to purchase a subscription to continue using all features' :
      'После окончания пробного периода нужно будет оформить подписку для продолжения использования всех функций'
  };
}; 