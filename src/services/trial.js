import { getCurrentUser } from './telegram';

const API_BASE = process.env.REACT_APP_API_URL || 'https://ispeech-backend.onrender.com';

// Ключи для localStorage
const TRIAL_START_DATE_KEY = 'trialStartDate';
const TRIAL_WELCOME_SEEN_KEY = 'trialWelcomeSeen';

// Функция для получения или создания даты начала пробного периода
const getTrialStartDate = () => {
  let startDate = localStorage.getItem(TRIAL_START_DATE_KEY);
  
  if (!startDate) {
    // Если даты нет, создаем новую
    startDate = new Date().toISOString();
    localStorage.setItem(TRIAL_START_DATE_KEY, startDate);
    console.log('🆕 Создана новая дата начала пробного периода:', startDate);
  } else {
    console.log('📅 Найдена существующая дата начала пробного периода:', startDate);
  }
  
  return startDate;
};

// Функция для расчета оставшегося времени пробного периода
const calculateTrialTimeLeft = (startDate) => {
  const start = new Date(startDate);
  const end = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 дня
  const now = new Date();
  
  const timeLeftMs = end.getTime() - now.getTime();
  
  if (timeLeftMs <= 0) {
    return {
      isActive: false,
      timeLeft: { days: 0, hours: 0, minutes: 0 },
      timeLeftMs: 0,
      endDate: end.toISOString()
    };
  }
  
  const days = Math.floor(timeLeftMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeLeftMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeLeftMs % (60 * 60 * 1000)) / (60 * 1000));
  
  return {
    isActive: true,
    timeLeft: { days, hours, minutes },
    timeLeftMs,
    endDate: end.toISOString()
  };
};

// Получение статуса пробного периода
export const getTrialStatus = async () => {
  try {
    const user = getCurrentUser();
    console.log('🔍 Получение статуса пробного периода для пользователя:', user);
    
    // В development режиме используем только локальные данные
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Development mode: используем только локальные данные');
      
      const startDate = getTrialStartDate();
      const trialInfo = calculateTrialTimeLeft(startDate);
      const hasSeenWelcome = localStorage.getItem(TRIAL_WELCOME_SEEN_KEY) === 'true';
      
      console.log('📱 Локальный пробный период (development):', {
        startDate,
        hasSeenWelcome,
        isActive: trialInfo.isActive,
        timeLeft: trialInfo.timeLeft
      });
      
      return {
        hasActiveSubscription: false,
        trial: {
          isActive: trialInfo.isActive,
          hasSeenWelcome: hasSeenWelcome,
          startDate: startDate,
          endDate: trialInfo.endDate,
          timeLeft: trialInfo.timeLeft,
          timeLeftMs: trialInfo.timeLeftMs
        }
      };
    }
    
    if (!user?.id) {
      console.log('❌ Пользователь не найден, используем локальный пробный период');
      
      // Получаем или создаем дату начала пробного периода
      const startDate = getTrialStartDate();
      const trialInfo = calculateTrialTimeLeft(startDate);
      
      // Проверяем, видел ли пользователь приветствие
      const hasSeenWelcome = localStorage.getItem(TRIAL_WELCOME_SEEN_KEY) === 'true';
      
      console.log('📱 Локальный пробный период:', {
        startDate,
        hasSeenWelcome,
        isActive: trialInfo.isActive,
        timeLeft: trialInfo.timeLeft
      });
      
      return {
        hasActiveSubscription: false,
        trial: {
          isActive: trialInfo.isActive,
          hasSeenWelcome: hasSeenWelcome,
          startDate: startDate,
          endDate: trialInfo.endDate,
          timeLeft: trialInfo.timeLeft,
          timeLeftMs: trialInfo.timeLeftMs
        }
      };
    }

    const url = `${API_BASE}/api/trial/status/${user.id}?lang=${user.language_code || 'ru'}`;
    console.log('🌐 Запрос к серверу:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('📡 Ответ сервера:', response.status, response.statusText);
    
    if (!response.ok) {
      console.log('⚠️ API недоступен (статус:', response.status + '), используем локальный пробный период');
      
      // Fallback - используем локальный пробный период
      const startDate = getTrialStartDate();
      const trialInfo = calculateTrialTimeLeft(startDate);
      const hasSeenWelcome = localStorage.getItem(TRIAL_WELCOME_SEEN_KEY) === 'true';
      
      return {
        hasActiveSubscription: false,
        trial: {
          isActive: trialInfo.isActive,
          hasSeenWelcome: hasSeenWelcome,
          startDate: startDate,
          endDate: trialInfo.endDate,
          timeLeft: trialInfo.timeLeft,
          timeLeftMs: trialInfo.timeLeftMs
        }
      };
    }

    const result = await response.json();
    console.log('✅ Статус получен с сервера:', result);
    return result;
  } catch (error) {
    console.error('❌ Ошибка получения статуса пробного периода:', error);
    
    // Fallback - используем локальный пробный период
    const startDate = getTrialStartDate();
    const trialInfo = calculateTrialTimeLeft(startDate);
    const hasSeenWelcome = localStorage.getItem(TRIAL_WELCOME_SEEN_KEY) === 'true';
    
    return {
      hasActiveSubscription: false,
      trial: {
        isActive: trialInfo.isActive,
        hasSeenWelcome: hasSeenWelcome,
        startDate: startDate,
        endDate: trialInfo.endDate,
        timeLeft: trialInfo.timeLeft,
        timeLeftMs: trialInfo.timeLeftMs
      }
    };
  }
};

// Отметка о просмотре приветственного сообщения
export const markWelcomeSeen = async () => {
  try {
    const user = getCurrentUser();
    console.log('✅ Отмечаем просмотр приветствия для пользователя:', user?.id);
    
    // Всегда сохраняем в localStorage для надежности
    localStorage.setItem(TRIAL_WELCOME_SEEN_KEY, 'true');
    
    if (!user?.id) {
      console.log('❌ Пользователь не найден, используем только localStorage');
      return { success: true, method: 'localStorage' };
    }

    const response = await fetch(`${API_BASE}/api/trial/welcome-seen/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.log('⚠️ Сервер недоступен, используем localStorage');
      return { success: true, method: 'localStorage' };
    }

    const result = await response.json();
    console.log('✅ Приветствие отмечено на сервере:', result);
    return result;
  } catch (error) {
    console.error('❌ Ошибка отметки приветствия:', error);
    return { success: true, method: 'localStorage' };
  }
};

// Функция для сброса пробного периода (для тестирования)
export const resetTrialPeriod = async () => {
  try {
    localStorage.removeItem(TRIAL_START_DATE_KEY);
    localStorage.removeItem(TRIAL_WELCOME_SEEN_KEY);
    console.log('🔄 Локальный пробный период сброшен');
    
    // Принудительно создаем новую дату начала пробного периода
    const newStartDate = new Date().toISOString();
    localStorage.setItem(TRIAL_START_DATE_KEY, newStartDate);
    console.log('🆕 Создана новая дата начала пробного периода:', newStartDate);
    
    // Сброс на сервере только в production
    if (process.env.NODE_ENV === 'production') {
      const user = getCurrentUser();
      if (user?.id) {
        try {
          const response = await fetch(`${API_BASE}/api/trial/reset/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ Пробный период сброшен на сервере:', result);
          } else {
            console.log('⚠️ Не удалось сбросить пробный период на сервере');
          }
        } catch (error) {
          console.log('⚠️ Ошибка сброса пробного периода на сервере:', error);
        }
      }
    } else {
      console.log('🔧 Development mode: пропускаем серверный сброс');
    }
  } catch (error) {
    console.error('❌ Ошибка при сбросе пробного периода:', error);
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
export const getTrialTexts = (language = 'en') => {
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
      'После окончания пробного периода нужно будет оформить подписку для продолжения использования всех функций',
    
    // Единицы времени для таймера
    timeUnits: {
      days: isEnglish ? 'days' : 'дней',
      hours: isEnglish ? 'hours' : 'часов', 
      minutes: isEnglish ? 'minutes' : 'минут',
      seconds: isEnglish ? 'seconds' : 'секунд'
    }
  };
}; 