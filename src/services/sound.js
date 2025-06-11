import { getUserSettings } from './storage';

// Создаем аудио-контекст при необходимости
let audioContext = null;
let isAudioContextReady = false;

// Инициализация AudioContext после пользовательского взаимодействия
const initAudioContext = async () => {
  if (audioContext && isAudioContextReady) {
    return true;
  }

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn('Web Audio API не поддерживается в этом браузере');
      return false;
    }

    audioContext = new AudioContext();
    
    // Если контекст приостановлен, пытаемся его возобновить
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    isAudioContextReady = audioContext.state === 'running';
    return isAudioContextReady;
  } catch (error) {
    console.warn('Ошибка инициализации Audio Context:', error);
    return false;
  }
};

// Простой генератор звукового эффекта
const generateSound = async (type) => {
  const contextReady = await initAudioContext();
  if (!contextReady) {
    return;
  }
  
  try {
    // Параметры звуков для разных типов
    const options = {
      click: { freq: 800, duration: 0.08, type: 'sine', volume: 0.3 },
      success: { freq: 660, duration: 0.2, type: 'sine', volume: 0.3 },
      error: { freq: 200, duration: 0.2, type: 'sine', volume: 0.3 },
      metronome: { freq: 880, duration: 0.05, type: 'sine', volume: 0.5 }
    };
    
    const sound = options[type] || options.click;
    
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
    console.warn('Ошибка генерации звука:', error);
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

// Остановка всех звуков
export const stopAllSounds = () => {
  if (audioContext && audioContext.state === 'running') {
    try {
      audioContext.suspend();
    } catch (error) {
      console.warn('Ошибка при остановке звуков:', error);
    }
  }
};

// Функция для установки громкости
export const setVolume = (volume) => {
  // Сохраняем значение громкости в настройках
  const settings = getUserSettings() || {};
  settings.volume = Math.max(0, Math.min(1, volume));
};

// Функция для отключения звука
export const mute = () => {
  const settings = getUserSettings() || {};
  settings.soundEnabled = false;
};

// Функция для включения звука
export const unmute = () => {
  const settings = getUserSettings() || {};
  settings.soundEnabled = true;
}; 