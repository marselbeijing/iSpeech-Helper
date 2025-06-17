import WebApp from '@twa-dev/sdk';

// Инициализация платежей
export const initPayments = () => {
  try {
    if (window.Telegram?.WebApp?.initData) {
      // Проверяем поддержку платежей
      if (window.Telegram.WebApp.isVersionAtLeast('6.0')) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error initializing payments:', error);
    return false;
  }
};

// Создание платежа
export const createPayment = async (amount, title, description) => {
  try {
    if (!initPayments()) {
      throw new Error('Payments are not supported');
    }

    const payment = {
      title,
      description,
      payload: {
        amount,
        currency: 'STARS',
        product_id: `product_${Date.now()}`,
      },
    };

    // Отправляем запрос на создание платежа
    const result = await window.Telegram.WebApp.showPopup({
      title: 'Подтверждение платежа',
      message: `Вы хотите купить "${title}" за ${amount} STARS?`,
      buttons: [
        { id: 'confirm', type: 'ok' },
        { id: 'cancel', type: 'cancel' },
      ],
    });

    if (result === 'confirm') {
      // Здесь должна быть интеграция с вашим бэкендом
      // для создания реального платежа
      return payment;
    }

    return null;
  } catch (error) {
    console.error('Error creating payment:', error);
    return null;
  }
};

// Проверка статуса платежа
export const checkPaymentStatus = async (paymentId) => {
  try {
    // Здесь должна быть интеграция с вашим бэкендом
    // для проверки статуса платежа
    return {
      status: 'pending',
      paymentId,
    };
  } catch (error) {
    console.error('Error checking payment status:', error);
    return null;
  }
};

// Обработка успешного платежа
export const handleSuccessfulPayment = (payment) => {
  try {
    // Здесь должна быть логика после успешного платежа
    return true;
  } catch (error) {
    console.error('Error handling successful payment:', error);
    return false;
  }
}; 