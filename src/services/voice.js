import axios from 'axios';

// Инициализация распознавания речи
export const initSpeechRecognition = () => {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    throw new Error('Speech recognition is not supported in this browser');
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = 'ru-RU';
  recognition.continuous = false;
  recognition.interimResults = false;
  
  return recognition;
};

// Функция для проверки и получения голосов
const getVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};

// Временная функция для синтеза речи через встроенный Web Speech API
export const synthesizeSpeech = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!window.speechSynthesis) {
        throw new Error('Speech synthesis is not supported in this browser');
      }

      // Останавливаем все текущие воспроизведения
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Ждем загрузки голосов
      const voices = await getVoices();
      console.log('Доступные голоса для синтеза:', voices);
      
      // Находим русский голос
      const russianVoice = voices.find(voice => 
        voice.lang.includes('ru') || 
        voice.name.toLowerCase().includes('russian')
      );

      if (russianVoice) {
        console.log('Выбран русский голос:', russianVoice);
        utterance.voice = russianVoice;
      } else {
        console.log('Русский голос не найден, используется голос по умолчанию');
      }
      
      utterance.lang = 'ru-RU';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Создаем объект для управления воспроизведением
      const source = {
        start: () => {
          return new Promise((resolveStart) => {
            console.log('Начинаем воспроизведение речи');
            
            utterance.onend = () => {
              console.log('Воспроизведение речи завершено');
              if (source.onended) {
                source.onended();
              }
              resolveStart();
            };

            utterance.onerror = (event) => {
              console.error('Ошибка синтеза речи:', event);
              if (source.onended) {
                source.onended();
              }
              resolveStart();
            };

            window.speechSynthesis.speak(utterance);
          });
        },
        onended: null
      };
      
      resolve(source);
    } catch (error) {
      console.error('Ошибка в synthesizeSpeech:', error);
      reject(error);
    }
  });
};

// Временная функция для анализа текста с заготовленными ответами
export const analyzeText = async (text) => {
  console.log('Анализ текста:', text);
  
  // Простой набор заготовленных ответов для демонстрации
  const responses = [
    "Я вас внимательно слушаю. Расскажите подробнее о вашей проблеме с речью.",
    "Для улучшения дикции я рекомендую начать с дыхательных упражнений. Хотите попробовать?",
    "Давайте поработаем над вашим произношением. Повторяйте за мной...",
    "Отличный прогресс! Продолжайте практиковаться каждый день.",
    "Для этого упражнения важно правильное дыхание. Вдыхайте через нос, выдыхайте через рот.",
    "Я заметил небольшое напряжение в вашем голосе. Давайте сделаем упражнение на расслабление.",
    "Попробуйте говорить медленнее и более четко артикулировать каждый звук."
  ];
  
  // Возвращаем случайный ответ из списка
  const randomIndex = Math.floor(Math.random() * responses.length);
  const response = responses[randomIndex];
  console.log('Выбран ответ:', response);
  return response;
}; 