const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Subscription = require('../models/Subscription');

// Инициализация бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Конфигурация подписок
const SUBSCRIPTION_CONFIG = {
  monthly: {
    stars: 299,
    duration: 30, // дней
    title: 'Месячная подписка iSpeech Helper',
    description: 'Доступ ко всем функциям приложения на 1 месяц',
  },
  quarterly: {
    stars: 799,
    duration: 90, // дней
    title: 'Квартальная подписка iSpeech Helper',
    description: 'Доступ ко всем функциям приложения на 3 месяца (скидка 20%)',
  },
  yearly: {
    stars: 1999,
    duration: 365, // дней
    title: 'Годовая подписка iSpeech Helper',
    description: 'Доступ ко всем функциям приложения на 1 год (скидка 40%)',
  },
};

// Конфигурация подписок
const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    id: 'monthly_premium',
    title: 'Месячная подписка Premium',
    description: 'Полный доступ ко всем функциям на 1 месяц',
    amount: 299,
    duration: 30,
  },
  QUARTERLY: {
    id: 'quarterly_premium', 
    title: 'Квартальная подписка Premium',
    description: 'Полный доступ ко всем функциям на 3 месяца (скидка 20%)',
    amount: 699,
    duration: 90,
  },
  YEARLY: {
    id: 'yearly_premium',
    title: 'Годовая подписка Premium', 
    description: 'Полный доступ ко всем функциям на 1 год (скидка 40%)',
    amount: 1999,
    duration: 365,
  },
};

// Создание инвойса
router.post('/create-invoice', async (req, res) => {
  try {
    const { userId, planType, userInfo } = req.body;

    if (!userId || !planType) {
      return res.status(400).json({ 
        error: 'Отсутствуют обязательные поля: userId, planType' 
      });
    }

    const plan = SUBSCRIPTION_PLANS[planType];
    if (!plan) {
      return res.status(400).json({ 
        error: 'Неверный тип подписки' 
      });
    }

    // Создаем уникальный payload
    const payload = JSON.stringify({
      userId: userId,
      planType: planType,
      planId: plan.id,
      timestamp: Date.now(),
    });

    // Отправляем инвойс пользователю через бота (без сохранения в БД для тестирования)
    const bot = req.app.get('telegramBot');
    if (bot) {
      try {
        await bot.sendInvoice(userId, 
          plan.title,
          plan.description,
          payload,
          '', // provider_token - пустой для Telegram Stars
          'XTR', // currency
          [{ label: plan.title, amount: plan.amount }], // prices
          {
            start_parameter: `premium_${planType.toLowerCase()}`,
            photo_url: 'https://i-speech-helper-uce4.vercel.app/assets/telegram-star.png',
            photo_size: 512,
            photo_width: 512,
            photo_height: 512,
            need_name: false,
            need_phone_number: false,
            need_email: false,
            need_shipping_address: false,
            send_phone_number_to_provider: false,
            send_email_to_provider: false,
            is_flexible: false,
          }
        );

        res.json({
          success: true,
          message: 'Инвойс отправлен в чат с ботом',
          plan: {
            title: plan.title,
            amount: plan.amount,
            currency: 'XTR'
          }
        });
      } catch (botError) {
        console.error('Ошибка отправки инвойса через бота:', botError);
        
        // Если чат не найден - это нормально, пользователь еще не писал боту
        if (botError.message.includes('chat not found')) {
          res.json({
            success: true,
            message: 'Инвойс готов. Начните диалог с ботом @iSpeechHelper_bot для получения инвойса.',
            plan: {
              title: plan.title,
              amount: plan.amount,
              currency: 'XTR'
            },
            instruction: 'Напишите боту /start для активации инвойса'
          });
        } else {
          res.status(500).json({
            error: 'Ошибка отправки инвойса через бота',
            details: botError.message
          });
        }
      }
    } else {
      res.status(500).json({
        error: 'Бот недоступен'
      });
    }

  } catch (error) {
    console.error('Ошибка создания инвойса:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: error.message
    });
  }
});

// Обработка pre_checkout_query
router.post('/pre-checkout', async (req, res) => {
  try {
    const { pre_checkout_query } = req.body;
    
    if (!pre_checkout_query) {
      return res.status(400).json({ error: 'pre_checkout_query обязателен' });
    }

    const { id, from, currency, total_amount, invoice_payload } = pre_checkout_query;

    // Находим инвойс по payload
    const invoice = await Invoice.findOne({ 
      payload: invoice_payload,
      status: 'created'
    });

    if (!invoice) {
      // Отклоняем платеж
      await bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Инвойс не найден или уже оплачен'
      });
      return res.json({ success: false, error: 'Инвойс не найден' });
    }

    // Проверяем соответствие суммы
    if (total_amount !== invoice.stars) {
      await bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Неверная сумма платежа'
      });
      return res.json({ success: false, error: 'Неверная сумма' });
    }

    // Проверяем, не истек ли инвойс
    if (new Date() > invoice.expiresAt) {
      await bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Инвойс истек. Создайте новый.'
      });
      return res.json({ success: false, error: 'Инвойс истек' });
    }

    // Одобряем платеж
    await bot.answerPreCheckoutQuery(id, true);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка pre-checkout:', error);
    res.status(500).json({ error: 'Ошибка обработки pre-checkout' });
  }
});

// Обработка успешного платежа
router.post('/successful-payment', async (req, res) => {
  try {
    const { successful_payment, from } = req.body;
    
    if (!successful_payment || !from) {
      return res.status(400).json({ error: 'Данные о платеже обязательны' });
    }

    const { 
      currency, 
      total_amount, 
      invoice_payload, 
      telegram_payment_charge_id 
    } = successful_payment;

    // Находим инвойс
    const invoice = await Invoice.findOne({ 
      payload: invoice_payload 
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Инвойс не найден' });
    }

    // Обновляем статус инвойса
    invoice.status = 'paid';
    invoice.paidAt = new Date();
    invoice.telegramPaymentChargeId = telegram_payment_charge_id;
    await invoice.save();

    // Создаем подписку
    const config = SUBSCRIPTION_CONFIG[invoice.subscriptionType];
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + config.duration);

    const subscription = new Subscription({
      userId: invoice.userId,
      type: invoice.subscriptionType,
      stars: invoice.stars,
      transactionId: invoice._id.toString(),
      telegramPaymentChargeId: telegram_payment_charge_id,
      invoicePayload: invoice_payload,
      expiresAt,
      status: 'paid',
      isActive: true,
    });

    await subscription.save();

    res.json({
      success: true,
      subscription: {
        type: subscription.type,
        expiresAt: subscription.expiresAt,
        isActive: subscription.isActive,
      },
    });
  } catch (error) {
    console.error('Ошибка обработки успешного платежа:', error);
    res.status(500).json({ error: 'Ошибка обработки платежа' });
  }
});

// Возврат средств
router.post('/refund', async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    if (!userId || !subscriptionId) {
      return res.status(400).json({ error: 'userId и subscriptionId обязательны' });
    }

    // Находим подписку
    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      userId,
      status: 'paid'
    });

    if (!subscription) {
      return res.status(404).json({ error: 'Подписка не найдена' });
    }

    // Выполняем возврат через Telegram Bot API
    await bot.refundStarPayment(
      parseInt(userId),
      subscription.telegramPaymentChargeId
    );

    // Обновляем статус подписки
    subscription.status = 'refunded';
    subscription.isActive = false;
    await subscription.save();

    // Обновляем статус инвойса
    await Invoice.findOneAndUpdate(
      { payload: subscription.invoicePayload },
      { status: 'cancelled' }
    );

    res.json({
      success: true,
      message: 'Возврат выполнен успешно',
    });
  } catch (error) {
    console.error('Ошибка возврата:', error);
    res.status(500).json({ error: 'Ошибка выполнения возврата' });
  }
});

// Получение статуса платежа
router.get('/status/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Инвойс не найден' });
    }

    res.json({
      status: invoice.status,
      createdAt: invoice.createdAt,
      paidAt: invoice.paidAt,
      expiresAt: invoice.expiresAt,
    });
  } catch (error) {
    console.error('Ошибка получения статуса:', error);
    res.status(500).json({ error: 'Ошибка получения статуса' });
  }
});

module.exports = router; 