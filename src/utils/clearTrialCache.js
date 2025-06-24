// Утилита для очистки кэша пробного периода
export const clearTrialCache = () => {
  console.log('🧹 Очистка кэша пробного периода...');
  
  // Очищаем все ключи, связанные с пробным периодом
  const keysToRemove = [
    'trialExpiredModalLastShown',
    'trialModalSnoozedUntil'
  ];
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`✅ Удален ключ: ${key}`);
  });
  
  console.log('🎉 Кэш очищен! Модальное окно будет показываться только при попытке использовать премиум-функции.');
};

// Функция для сброса всех настроек модального окна
export const resetModalSettings = () => {
  clearTrialCache();
  
  // Принудительно перезагружаем страницу для применения изменений
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}; 