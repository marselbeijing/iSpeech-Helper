// Функция для отправки данных в Telegram WebApp
export const sendData = (data) => {
  if (window.Telegram?.WebApp?.sendData) {
    try {
      window.Telegram.WebApp.sendData(JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn('Error sending data to Telegram:', error);
      return false;
    }
  }
  
  // Если функция недоступна (например, при локальной разработке)
  return false;
}; 