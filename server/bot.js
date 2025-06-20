const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const Invoice = require('./models/Invoice');
const Subscription = require('./models/Subscription');

class TelegramStarsBot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
    this.setupWebhooks();
    console.log('TelegramStarsBot инициализирован с токеном:', token ? 'Да' : 'Нет');
  }

  setupWebhooks() {
    // Обработка pre_checkout_query
    this.bot.on('pre_checkout_query', async (query) => {
      try {
        await this.handlePreCheckoutQuery(query);
      } catch (error) {
        console.error('Ошибка обработки pre_checkout_query:', error);
        await this.bot.answerPreCheckoutQuery(query.id, false, {
          error_message: 'Произошла ошибка при обработке платежа'
        });
      }
    });

    // Обработка успешного платежа
    this.bot.on('message', async (msg) => {
      if (msg.successful_payment) {
        try {
          await this.handleSuccessfulPayment(msg);
        } catch (error) {
          console.error('Ошибка обработки successful_payment:', error);
        }
      }
    });

    // Обработка callback_query (inline кнопки)
    this.bot.on('callback_query', async (query) => {
      try {
        await this.handleCallbackQuery(query);
      } catch (error) {
        console.error('Ошибка обработки callback_query:', error);
        await this.bot.answerCallbackQuery(query.id, {
          text: 'Произошла ошибка. Попробуйте еще раз.',
          show_alert: true
        });
      }
    });

    // Команда /start
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      
      // Проверяем, есть ли параметр start
      const startParam = msg.text.split(' ')[1];
      
      if (startParam && startParam.startsWith('buy_')) {
        // Если пришли с параметром покупки, сразу показываем предложение
        const planType = startParam.replace('buy_', '');
        await this.sendSubscriptionOffer(chatId, planType, msg.from);
        return;
      }
      
      const welcomeMessage = `
👋 Привет! Добро пожаловать в iSpeech Helper!

🗣 Я ваш персональный помощник для улучшения речи и дикции. Здесь вы найдете эффективные упражнения для развития:

✨ Четкой артикуляции и произношения
🫁 Правильного дыхания и голоса  
🎯 Уверенности в общении
🎭 Выразительности речи

Готовы начать тренировки? Нажмите кнопку ниже!
      `;

      await this.bot.sendMessage(chatId, welcomeMessage, {
        reply_markup: {
          inline_keyboard: [
            [{
              text: '🚀 Открыть приложение',
              web_app: { url: process.env.WEBAPP_URL || 'https://i-speech-helper-uce4.vercel.app/' }
            }],
            [{
              text: '💫 Узнать о подписке',
              callback_data: 'subscription_menu'
            }]
          ]
        }
      });
    });

    // Команда /paysupport - обязательная для платежных ботов
    this.bot.onText(/\/paysupport/, async (msg) => {
      const chatId = msg.chat.id;
      const supportMessage = `
🛠 Поддержка по платежам

По вопросам, связанным с платежами и подписками, обращайтесь:
📧 Email: support@ispeechhelper.com
💬 Telegram: @ispeechhelper_support

Мы ответим в течение 24 часов.

⚠️ Внимание: Поддержка Telegram не сможет помочь с вопросами по платежам в этом боте.
      `;

      await this.bot.sendMessage(chatId, supportMessage);
    });

    // Команды покупки подписок
    this.bot.onText(/\/buy_monthly/, async (msg) => {
      await this.sendSubscriptionOffer(msg.chat.id, 'monthly', msg.from);
    });

    this.bot.onText(/\/buy_quarterly/, async (msg) => {
      await this.sendSubscriptionOffer(msg.chat.id, 'quarterly', msg.from);
    });

    this.bot.onText(/\/buy_yearly/, async (msg) => {
      await this.sendSubscriptionOffer(msg.chat.id, 'yearly', msg.from);
    });

    // Команда для выбора подписки
    this.bot.onText(/\/subscribe/, async (msg) => {
      await this.sendSubscriptionMenu(msg.chat.id);
    });
  }

  async handlePreCheckoutQuery(query) {
    const { id, from, currency, total_amount, invoice_payload } = query;

    console.log('Pre-checkout query received:', {
      queryId: id,
      userId: from.id,
      amount: total_amount,
      payload: invoice_payload
    });

    // Находим инвойс по payload
    const invoice = await Invoice.findOne({ 
      payload: invoice_payload,
      status: 'created'
    });

    if (!invoice) {
      console.log('Invoice not found for payload:', invoice_payload);
      await this.bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Инвойс не найден или уже оплачен. Создайте новый.'
      });
      return;
    }

    // Проверяем соответствие суммы
    if (total_amount !== invoice.stars) {
      console.log('Amount mismatch:', { expected: invoice.stars, received: total_amount });
      await this.bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Неверная сумма платежа'
      });
      return;
    }

    // Проверяем, не истек ли инвойс
    if (new Date() > invoice.expiresAt) {
      console.log('Invoice expired:', invoice.expiresAt);
      await this.bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Инвойс истек. Создайте новый.'
      });
      return;
    }

    // Проверяем соответствие пользователя
    if (invoice.userId !== from.id.toString()) {
      console.log('User ID mismatch:', { expected: invoice.userId, received: from.id });
      await this.bot.answerPreCheckoutQuery(id, false, {
        error_message: 'Этот инвойс создан для другого пользователя'
      });
      return;
    }

    // Одобряем платеж
    console.log('Pre-checkout approved for:', invoice_payload);
    await this.bot.answerPreCheckoutQuery(id, true);
  }

  async handleSuccessfulPayment(msg) {
    const { successful_payment, from, chat } = msg;
    const { 
      currency, 
      total_amount, 
      invoice_payload, 
      telegram_payment_charge_id 
    } = successful_payment;

    console.log('Successful payment received:', {
      userId: from.id,
      amount: total_amount,
      payload: invoice_payload,
      chargeId: telegram_payment_charge_id
    });

    // Находим инвойс
    const invoice = await Invoice.findOne({ 
      payload: invoice_payload 
    });

    if (!invoice) {
      console.error('Invoice not found for successful payment:', invoice_payload);
      await this.bot.sendMessage(chat.id, 
        '❌ Ошибка: инвойс не найден. Обратитесь в поддержку.'
      );
      return;
    }

    // Обновляем статус инвойса
    invoice.status = 'paid';
    invoice.paidAt = new Date();
    invoice.telegramPaymentChargeId = telegram_payment_charge_id;
    await invoice.save();

    // Создаем подписку
    const SUBSCRIPTION_CONFIG = {
      monthly: { duration: 30 },
      quarterly: { duration: 90 },
      yearly: { duration: 365 },
    };

    const config = SUBSCRIPTION_CONFIG[invoice.subscriptionType];
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + config.duration);

    // Деактивируем старые подписки пользователя
    await Subscription.updateMany(
      { userId: invoice.userId, isActive: true },
      { isActive: false }
    );

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

    // Отправляем подтверждение пользователю
    const subscriptionNames = {
      monthly: 'месячная',
      quarterly: 'квартальная', 
      yearly: 'годовая'
    };

    const confirmationMessage = `
✅ Платеж успешно обработан!

🎉 Ваша ${subscriptionNames[invoice.subscriptionType]} подписка активирована!
⏰ Действует до: ${expiresAt.toLocaleDateString('ru-RU')}
⭐ Потрачено Stars: ${total_amount}

Теперь вам доступны все функции приложения!
    `;

    await this.bot.sendMessage(chat.id, confirmationMessage, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: '🚀 Открыть приложение',
            web_app: { url: process.env.WEBAPP_URL || 'https://i-speech-helper-uce4.vercel.app/' }
          }]
        ]
      }
    });

    console.log('Subscription created successfully:', {
      userId: invoice.userId,
      type: invoice.subscriptionType,
      expiresAt
    });
  }

  // Метод для настройки webhook (вызывается при запуске сервера)
  async setWebhook(webhookUrl) {
    try {
      await this.bot.setWebHook(`${webhookUrl}/api/telegram/webhook`);
      console.log('Webhook установлен:', `${webhookUrl}/api/telegram/webhook`);
    } catch (error) {
      console.error('Ошибка установки webhook:', error);
    }
  }

  // Метод для обработки webhook запросов
  processUpdate(update) {
    this.bot.processUpdate(update);
  }

  async handleCallbackQuery(query) {
    const { id, data, from, message } = query;
    const chatId = message.chat.id;

    console.log('Callback query received:', { data, userId: from.id });

    // Отвечаем на callback query
    await this.bot.answerCallbackQuery(id);

    if (data === 'subscription_menu') {
      await this.sendSubscriptionMenu(chatId);
    } else if (data.startsWith('buy_')) {
      const planType = data.replace('buy_', '');
      await this.sendSubscriptionOffer(chatId, planType, from);
    } else if (data.startsWith('pay_')) {
      const planType = data.replace('pay_', '');
      await this.createInvoice(chatId, planType, from);
    }
  }

  async createInvoice(chatId, planType, user) {
    try {
      // Импортируем модель Invoice напрямую вместо HTTP запроса
      const Invoice = require('./models/Invoice');
      
      const PLANS = {
        monthly: { title: 'Месячная подписка Premium', amount: 299 },
        quarterly: { title: 'Квартальная подписка Premium', amount: 699 },
        yearly: { title: 'Годовая подписка Premium', amount: 1999 }
      };

      const plan = PLANS[planType];
      if (!plan) {
        throw new Error('Неизвестный тип подписки');
      }

      // Создаем инвойс напрямую
      const payload = `invoice_${Date.now()}_${user.id}_${planType}`;
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 30); // 30 минут на оплату

      const invoice = new Invoice({
        userId: user.id.toString(),
        subscriptionType: planType,
        stars: plan.amount,
        title: plan.title,
        description: `Подписка iSpeech Helper - ${plan.title}`,
        payload: payload,
        status: 'created',
        expiresAt: expiresAt,
        userInfo: {
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username
        }
      });

      await invoice.save();
      console.log('Инвойс создан:', { payload, userId: user.id, planType });

      // Отправляем инвойс через Telegram Bot API
      await this.bot.sendInvoice(chatId, plan.title, `Подписка iSpeech Helper - ${plan.title}`,
        payload,
        '', // provider_token пустой для Stars
        'XTR', // Stars
        [{ label: plan.title, amount: plan.amount }]
      );

      await this.bot.sendMessage(chatId, 
        '✨ Инвойс создан! Нажмите кнопку "Заплатить" выше для оплаты.'
      );
      
    } catch (error) {
      console.error('Ошибка создания инвойса:', error);
      await this.bot.sendMessage(chatId, 
        '❌ Не удалось создать инвойс. Попробуйте позже или обратитесь в поддержку.'
      );
    }
  }

  async sendSubscriptionMenu(chatId) {
    const menuMessage = `
💫 Выберите подписку iSpeech Helper:

🔸 Месячная подписка - 299 ⭐ звезд
   Полный доступ на 30 дней

🔸 Квартальная подписка - 699 ⭐ звезд  
   Полный доступ на 90 дней (скидка 20%)

🔸 Годовая подписка - 1999 ⭐ звезд
   Полный доступ на 365 дней (скидка 40%)

Выберите подходящий вариант:
    `;

    await this.bot.sendMessage(chatId, menuMessage, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: '📅 Месячная (299 ⭐)',
            callback_data: 'buy_monthly'
          }],
          [{
            text: '📅 Квартальная (699 ⭐)',
            callback_data: 'buy_quarterly'
          }],
          [{
            text: '📅 Годовая (1999 ⭐)',
            callback_data: 'buy_yearly'
          }],
          [{
            text: '🚀 Открыть приложение',
            web_app: { url: process.env.WEBAPP_URL || 'https://i-speech-helper-uce4.vercel.app/' }
          }]
        ]
      }
    });
  }

  async sendSubscriptionOffer(chatId, planType, user) {
    const PLANS = {
      monthly: {
        title: 'Месячная подписка Premium',
        amount: 299,
        duration: '30 дней',
        description: 'Полный доступ ко всем функциям на 1 месяц'
      },
      quarterly: {
        title: 'Квартальная подписка Premium',
        amount: 699,
        duration: '90 дней',
        description: 'Полный доступ ко всем функциям на 3 месяца (скидка 20%)'
      },
      yearly: {
        title: 'Годовая подписка Premium',
        amount: 1999,
        duration: '365 дней',
        description: 'Полный доступ ко всем функциям на 1 год (скидка 40%)'
      }
    };

    const plan = PLANS[planType];
    if (!plan) {
      await this.bot.sendMessage(chatId, '❌ Неизвестный тип подписки');
      return;
    }

    const offerMessage = `
💫 ${plan.title}

💰 Стоимость: ${plan.amount} ⭐ звезд
⏰ Длительность: ${plan.duration}
📝 ${plan.description}

Нажмите кнопку ниже для оплаты:
    `;

    await this.bot.sendMessage(chatId, offerMessage, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: `💳 Купить за ${plan.amount} ⭐`,
            callback_data: `pay_${planType}`
          }],
          [{
            text: '🔙 Назад к выбору',
            callback_data: 'subscription_menu'
          }]
        ]
      }
    });
  }
}

module.exports = TelegramStarsBot; 