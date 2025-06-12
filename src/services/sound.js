import { getUserSettings } from './storage';

// Создаем аудио-контекст при необходимости
let audioContext = null;
let isAudioInitialized = false;

// Функция для инициализации аудио-контекста
const initAudioContext = async () => {
  if (!audioContext) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API не поддерживается в этом браузере');
      return false;
    }
  }
  
  // Возобновляем контекст если он приостановлен
  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
    } catch (e) {
      console.warn('Не удалось возобновить AudioContext:', e);
      return false;
    }
  }
  
  isAudioInitialized = true;
  return true;
};

// Простой генератор звукового эффекта
const generateSound = async (type) => {
  // Инициализируем аудио-контекст
  const initialized = await initAudioContext();
  if (!initialized || !audioContext) {
    return;
  }
  
  // Параметры звуков для разных типов
  const options = {
    click: { freq: 800, duration: 0.08, type: 'sine', volume: 0.3 },
    success: { freq: 660, duration: 0.2, type: 'sine', volume: 0.3 },
    error: { freq: 200, duration: 0.2, type: 'sine', volume: 0.3 },
    metronome: { freq: 880, duration: 0.05, type: 'sine', volume: 0.5 }
  };
  
  const sound = options[type] || options.click;
  
  try {
    // Создаем осциллятор и усилитель
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = sound.type;
    oscillator.frequency.value = sound.freq;
    
    gainNode.gain.value = sound.volume;
    
    // Соединяем узлы
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Запускаем и останавливаем звук
    oscillator.start();
    oscillator.stop(audioContext.currentTime + sound.duration);
  } catch (error) {
    console.warn('Ошибка при создании звука:', error);
  }
};

// Функция для воспроизведения звука
export const playSound = async (type) => {
  try {
    // Получаем настройки пользователя
    const settings = getUserSettings();
    
    // Проверяем, включены ли звуковые эффекты
    if (settings && settings.soundEnabled === false) {
      return; // Если звук отключен в настройках, не воспроизводим
    }
    
    await generateSound(type);
  } catch (error) {
    console.warn('Ошибка при воспроизведении звука:', error);
  }
};

// Остановка всех звуков (не требуется для сгенерированных звуков)
export const stopAllSounds = () => {
  // Реализация не требуется, так как звуки генерируются и автоматически останавливаются
};

// Функция для установки громкости (не используется в текущей реализации)
export const setVolume = (volume) => {
  // Сохраняем значение громкости для будущего использования
};

// Функция для отключения звука (не используется в текущей реализации)
export const mute = () => {
  // Отключаем звук
};

// Функция для включения звука (не используется в текущей реализации)
export const unmute = (volume = 1) => {
  // Включаем звук
}; 