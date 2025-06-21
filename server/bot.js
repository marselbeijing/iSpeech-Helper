const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const mongoose = require('mongoose');
const Invoice = require('./models/Invoice');
const Subscription = require('./models/Subscription');
const Referral = require('./models/Referral');
const StarsBalance = require('./models/StarsBalance');
const TrialPeriod = require('./models/TrialPeriod');

class TelegramStarsBot {
  constructor(token) {
    console.log('🤖 Инициализация TelegramStarsBot...');
    console.log('🔑 Токен предоставлен:', token ? 'Да' : 'Нет');
    
    if (!token) {
      console.error('❌ TELEGRAM_BOT_TOKEN не предоставлен');
      throw new Error('TELEGRAM_BOT_TOKEN is required');
    }
    
    this.bot = new TelegramBot(token, { 
      polling: {
        interval: 1000,
        autoStart: true,
        params: {
          timeout: 10
        }
      }
    });
    
    console.log('✅ TelegramBot создан с polling');
    
    // Обработка ошибок polling - минимальное логирование
    this.bot.on('polling_error', (error) => {
      // Игнорируем частые сетевые ошибки
      if (error.code === 'EFATAL' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        return; // Не логируем сетевые ошибки
      }
      
      // Логируем только критические ошибки
      console.error('❌ Критическая ошибка Telegram bot:', error.code, error.message);
    });
    
    // Обработка ошибок webhook
    this.bot.on('webhook_error', (error) => {
      console.error('❌ Telegram webhook error:', error);
    });
    
    // Тест подключения
    this.bot.getMe().then((botInfo) => {
      console.log('✅ Бот успешно подключен:', botInfo.username);
    }).catch((error) => {
      console.error('❌ Ошибка подключения бота:', error.message);
    });
    
    this.setupWebhooks();
    console.log('🔧 Webhook обработчики настроены');
    console.log('🚀 TelegramStarsBot полностью инициализирован');
  }

  // Функция для получения локализованных текстов
  getTexts(languageCode) {
    const isEnglish = languageCode === 'en' || (languageCode && languageCode.startsWith('en'));
    
    return {
      invoiceCreated: isEnglish ? 
        '✨ Invoice created! Click the "Pay" button above to pay.' :
        '✨ Инвойс создан! Нажмите кнопку "Заплатить" выше для оплаты.',
      
      subscriptionMenu: `💫 Выберите подписку iSpeech Helper (Полный доступ ко всем функциям):

🔸 1 месяц — 299 ⭐ (30 дней доступа)
🔸 3 месяца — 699 ⭐ (−20%)
🔸 12 месяцев — 1999 ⭐ (−40%)

💫 Choose your iSpeech Helper subscription (Full access to all features):
🔸 1 month — 299 ⭐ (30 days access)
🔸 3 months — 699 ⭐ (−20%)
🔸 12 months — 1999 ⭐ (−40%)`,
      
      monthlyButton: '📅 1 month (299 ⭐)',
      quarterlyButton: '📅 3 months (699 ⭐)',
      yearlyButton: '📅 12 months (1999 ⭐)',
      openAppButton: '🚀 Open App',
      
      buyButton: isEnglish ? 'Buy for' : 'Купить за',
      backButton: isEnglish ? '🔙 Back to selection' : '🔙 Назад к выбору',
      
      monthlyTitle: `💫 Месячная подписка Premium 
💰 Стоимость: 299 ⭐ звезд 
⏰ Длительность: 30 дней 
📝 Полный доступ ко всем функциям на 1 месяц

💫 Premium Monthly Subscription
💰 Price: 299 ⭐ stars
⏰ Duration: 30 days
📝 Full access to all features for 1 month`,
      quarterlyTitle: isEnglish ? 'Quarterly Premium Subscription' : 'Квартальная подписка Premium',
      yearlyTitle: isEnglish ? 'Annual Premium Subscription' : 'Годовая подписка Premium',
      
      duration30: isEnglish ? '30 days' : '30 дней',
      duration90: isEnglish ? '90 days' : '90 дней', 
      duration365: isEnglish ? '365 days' : '365 дней',
      
      description1: isEnglish ? 'Full access to all features for 1 month' : 'Полный доступ ко всем функциям на 1 месяц',
      description3: isEnglish ? 'Full access to all features for 3 months (20% discount)' : 'Полный доступ ко всем функциям на 3 месяца (скидка 20%)',
      description12: isEnglish ? 'Full access to all features for 1 year (40% discount)' : 'Полный доступ ко всем функциям на 1 год (скидка 40%)',
      
      cost: isEnglish ? 'Cost:' : 'Стоимость:',
      duration: isEnglish ? 'Duration:' : 'Длительность:',
      stars: isEnglish ? 'stars' : 'звезд',
      clickToPay: isEnglish ? 'Click the button below to pay:' : 'Нажмите кнопку ниже для оплаты:',
      
      // Сообщения об успешной оплате
      paymentSuccess: isEnglish ? '✅ Payment processed successfully!' : '✅ Платеж успешно обработан!',
      subscriptionActivated: isEnglish ? '🎉 Your subscription has been activated!' : '🎉 Ваша подписка активирована!',
      validUntil: isEnglish ? '⏰ Valid until:' : '⏰ Действует до:',
      starsSpent: isEnglish ? '⭐ Stars spent:' : '⭐ Потрачено Stars:',
      allFeaturesAvailable: isEnglish ? 'All app features are now available to you!' : 'Теперь вам доступны все функции приложения!',
      
      monthly: isEnglish ? 'monthly' : 'месячная',
      quarterly: isEnglish ? 'quarterly' : 'квартальная',
      yearly: isEnglish ? 'annual' : 'годовая',
      
      invoiceNotFound: isEnglish ? '❌ Error: invoice not found. Please contact support.' : '❌ Ошибка: инвойс не найден. Обратитесь в поддержку.',
      
      // Реферальные сообщения
      newReferralTitle: isEnglish ? '🎉 You have a new referral!' : '🎉 У вас новый реферал!',
      newReferralText: isEnglish ? 'A user joined using your link. When they purchase a subscription, you will receive a bonus in stars!' : 'Пользователь присоединился по вашей ссылке. Когда он купит подписку, вы получите бонус в звездах!',
      bonusesForSubs: isEnglish ? '⭐ Bonuses for subscriptions:' : '⭐ Бонусы за подписки:',
      monthlyBonus: isEnglish ? '• Monthly: 60 ⭐ (20% of 299)' : '• Месячная: 60 ⭐ (20% от 299)',
      quarterlyBonus: isEnglish ? '• Quarterly: 140 ⭐ (20% of 699)' : '• Квартальная: 140 ⭐ (20% от 699)',
      yearlyBonus: isEnglish ? '• Annual: 400 ⭐ (20% of 1999)' : '• Годовая: 400 ⭐ (20% от 1999)',
      
      congratsBonus: isEnglish ? '🎉 Congratulations! You received a bonus!' : '🎉 Поздравляем! Вы получили бонус!',
      referralBought: isEnglish ? 'Your referral bought a' : 'Ваш реферал купил',
      youReceived: isEnglish ? 'You received:' : 'Вы получили:',
      currentBalanceCheck: isEnglish ? '💰 You can check your current balance in the app in the "Referral Program" section.' : '💰 Ваш текущий баланс можно посмотреть в приложении в разделе "Партнерская программа".',
      
      subscriptionNames: {
        monthly: isEnglish ? 'monthly' : 'месячную',
        quarterly: isEnglish ? 'quarterly' : 'квартальную', 
        yearly: isEnglish ? 'annual' : 'годовую'
      },
      welcomeMessage: `🗣 Я ваш персональный помощник для улучшения речи и дикции. Здесь вас ждут упражнения для:

✨ Четкой артикуляции
🫁 Правильного дыхания и голоса
🎯 Уверенной коммуникации
🎭 Выразительности речи
🎁 Получите 3 дня БЕСПЛАТНОГО доступа ко всем функциям!

🗣 I'm your personal assistant for improving speech and diction. Here you'll find exercises for:

✨ Clear articulation
🫁 Proper breathing and voice control
🎯 Confident communication
🎭 Expressive speech
🎁 Enjoy a 3-day FREE trial with full access to all features!`,
      learnAboutSubscriptionButton: '💫 Learn about subscription',
    };
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
      console.log('📨 Получена команда /start от пользователя:', msg.from.id, 'в чате:', chatId);
      
      // Проверяем, есть ли параметр start
      const startParam = msg.text.split(' ')[1];
      console.log('🔍 Параметр start:', startParam);
      
      if (startParam && startParam.startsWith('buy_')) {
        // Если пришли с параметром покупки, сразу показываем предложение
        const planType = startParam.replace('buy_', '');
        console.log('💳 Прямая покупка:', planType);
        await this.sendSubscriptionOffer(chatId, planType, msg.from);
        return;
      }
      
      // Обработка реферальных ссылок
      if (startParam && startParam.startsWith('ref_')) {
        const referrerId = startParam.replace('ref_', '');
        console.log('👥 Реферальная ссылка от:', referrerId);
        await this.handleReferral(chatId, msg.from.id, referrerId);
      }

      // Создаем или проверяем пробный период для пользователя
      try {
        let trialPeriod = await TrialPeriod.findOne({ userId: msg.from.id.toString() });
        
        if (!trialPeriod) {
          // Создаем новый пробный период
          const startDate = new Date();
          trialPeriod = new TrialPeriod({
            userId: msg.from.id.toString(),
            startDate: startDate,
            endDate: new Date(startDate.getTime() + (3 * 24 * 60 * 60 * 1000)), // 3 дня
            userInfo: {
              firstName: msg.from.first_name,
              lastName: msg.from.last_name,
              username: msg.from.username,
              languageCode: msg.from.language_code
            }
          });
          await trialPeriod.save();
          console.log('✅ Создан пробный период для пользователя:', msg.from.id, 'до:', trialPeriod.endDate);
        } else {
          console.log('ℹ️ Пробный период уже существует для пользователя:', msg.from.id);
        }
      } catch (error) {
        console.error('❌ Ошибка создания пробного периода:', error);
      }
      
      // Определяем язык пользователя
      const texts = this.getTexts(msg.from.language_code);
      console.log('DEBUG BUTTONS:', texts.openAppButton, texts.learnAboutSubscriptionButton);
      console.log('DEBUG LANGUAGE:', msg.from.language_code);
      await this.bot.sendMessage(chatId, texts.welcomeMessage, {
        reply_markup: {
          inline_keyboard: [
            [{
              text: texts.openAppButton,
              web_app: { url: process.env.WEBAPP_URL || 'https://i-speech-helper-uce4.vercel.app/' }
            }],
            [{
              text: texts.learnAboutSubscriptionButton,
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
      const lang = msg.from.language_code || 'ru';
      await this.sendSubscriptionMenu(msg.chat.id, lang);
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
      const texts = this.getTexts(from.language_code);
      await this.bot.sendMessage(chat.id, texts.invoiceNotFound);
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
    const texts = this.getTexts(from.language_code);
    
    const subscriptionName = texts[invoice.subscriptionType]; // monthly, quarterly, yearly

    const confirmationMessage = `
${texts.paymentSuccess}

🎉 ${texts.subscriptionActivated.replace('Your', `Your ${subscriptionName}`).replace('Ваша', `Ваша ${subscriptionName}`)}
${texts.validUntil} ${expiresAt.toLocaleDateString('ru-RU')}
${texts.starsSpent} ${total_amount}

${texts.allFeaturesAvailable}
    `;

    await this.bot.sendMessage(chat.id, confirmationMessage, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: texts.openAppButton,
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

    // Обрабатываем реферальную награду
    await this.processReferralReward(invoice.subscriptionType, invoice.userId);
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

    console.log('🔘 Callback query получен:', { 
      data, 
      userId: from.id, 
      chatId,
      messageId: message.message_id 
    });

    try {
      // Отвечаем на callback query
      await this.bot.answerCallbackQuery(id);
      console.log('✅ Callback query отвечен');

      if (data === 'subscription_menu') {
        console.log('📋 Показываем меню подписок');
        await this.sendSubscriptionMenu(chatId, from.language_code);
      } else if (data.startsWith('buy_')) {
        const planType = data.replace('buy_', '');
        console.log('💰 Показываем предложение подписки:', planType);
        await this.sendSubscriptionOffer(chatId, planType, from);
      } else if (data.startsWith('pay_')) {
        const planType = data.replace('pay_', '');
        console.log('💳 Создаем инвойс для:', planType);
        await this.createInvoice(chatId, planType, from);
      } else {
        console.log('❓ Неизвестный callback data:', data);
      }
    } catch (error) {
      console.error('❌ Ошибка в handleCallbackQuery:', error);
      await this.bot.answerCallbackQuery(id, {
        text: 'Произошла ошибка. Попробуйте еще раз.',
        show_alert: true
      });
    }
  }

  async createInvoice(chatId, planType, user) {
    try {
      // Импортируем модель Invoice напрямую вместо HTTP запроса
      const Invoice = require('./models/Invoice');
      
      const texts = this.getTexts(user.language_code);
      
      const PLANS = {
        monthly: { title: texts.monthlyTitle, amount: 299 },
        quarterly: { title: texts.quarterlyTitle, amount: 699 },
        yearly: { title: texts.yearlyTitle, amount: 1999 }
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

      // Используем уже объявленную переменную texts
      await this.bot.sendMessage(chatId, texts.invoiceCreated);
      
    } catch (error) {
      console.error('Ошибка создания инвойса:', error);
      const isEnglish = user.language_code && user.language_code.startsWith('en');
      const errorMessage = isEnglish ? 
        '❌ Failed to create invoice. Please try again later or contact support.' :
        '❌ Не удалось создать инвойс. Попробуйте позже или обратитесь в поддержку.';
      await this.bot.sendMessage(chatId, errorMessage);
    }
  }

  async sendSubscriptionMenu(chatId, languageCode = 'ru') {
    const texts = this.getTexts(languageCode);

    await this.bot.sendMessage(chatId, texts.subscriptionMenu, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: texts.monthlyButton,
            callback_data: 'buy_monthly'
          }],
          [{
            text: texts.quarterlyButton,
            callback_data: 'buy_quarterly'
          }],
          [{
            text: texts.yearlyButton,
            callback_data: 'buy_yearly'
          }],
          [{
            text: texts.openAppButton,
            web_app: { url: process.env.WEBAPP_URL || 'https://i-speech-helper-uce4.vercel.app/' }
          }]
        ]
      }
    });
  }

  async sendSubscriptionOffer(chatId, planType, user) {
    const texts = this.getTexts(user.language_code);
    
    const PLANS = {
      monthly: {
        title: texts.monthlyTitle,
        amount: 299,
        duration: texts.duration30,
        description: texts.description1
      },
      quarterly: {
        title: texts.quarterlyTitle,
        amount: 699,
        duration: texts.duration90,
        description: texts.description3
      },
      yearly: {
        title: texts.yearlyTitle,
        amount: 1999,
        duration: texts.duration365,
        description: texts.description12
      }
    };

    const plan = PLANS[planType];
    if (!plan) {
      const isEnglish = user.language_code && user.language_code.startsWith('en');
      const errorText = isEnglish ? 
        '❌ Unknown subscription type' : '❌ Неизвестный тип подписки';
      await this.bot.sendMessage(chatId, errorText);
      return;
    }

    const offerMessage = `
💫 ${plan.title}

💰 ${texts.cost} ${plan.amount} ⭐ ${texts.stars}
⏰ ${texts.duration} ${plan.duration}
📝 ${plan.description}

${texts.clickToPay}
    `;

    await this.bot.sendMessage(chatId, offerMessage, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: `💳 ${texts.buyButton} ${plan.amount} ⭐`,
            callback_data: `pay_${planType}`
          }],
          [{
            text: texts.backButton,
            callback_data: 'subscription_menu'
          }]
        ]
      }
    });
  }

  // Методы реферальной системы
  async handleReferral(chatId, refereeId, referrerId) {
    try {
      // Проверяем, что пользователь не пытается пригласить себя
      if (refereeId.toString() === referrerId.toString()) {
        return;
      }

      // Проверяем, не был ли уже создан реферал
      const existingReferral = await Referral.findOne({
        referrerId: referrerId.toString(),
        refereeId: refereeId.toString()
      });

      if (existingReferral) {
        return; // Реферал уже существует
      }

      // Создаем новый реферал
      const referral = new Referral({
        referrerId: referrerId.toString(),
        refereeId: refereeId.toString(),
        status: 'pending'
      });

      await referral.save();
      console.log('Реферал создан:', { referrerId, refereeId });

      // Отправляем уведомление рефереру
      try {
        // Получаем информацию о рефере для определения языка
        const referrer = await this.bot.getChat(referrerId);
        const referrerLang = referrer.language_code || 'ru';
        const texts = this.getTexts(referrerLang);

        const message = `
${texts.newReferralTitle}

${texts.newReferralText}

${texts.bonusesForSubs}
${texts.monthlyBonus}
${texts.quarterlyBonus}
${texts.yearlyBonus}
        `;

        await this.bot.sendMessage(referrerId, message);
      } catch (error) {
        console.log('Не удалось отправить уведомление рефереру:', error.message);
      }

    } catch (error) {
      console.error('Ошибка обработки реферала:', error);
    }
  }

  async processReferralReward(subscriptionType, userId) {
    try {
      // Находим реферал, где текущий пользователь является рефери
      const referral = await Referral.findOne({
        refereeId: userId.toString(),
        status: 'pending'
      });

      if (!referral) {
        return; // Реферал не найден
      }

      // Рассчитываем награду (20% от стоимости подписки)
      const rewards = {
        monthly: 60,   // 20% от 299
        quarterly: 140, // 20% от 699
        yearly: 400    // 20% от 1999
      };

      const starsReward = rewards[subscriptionType];
      if (!starsReward) {
        return;
      }

      // Обновляем реферал
      referral.status = 'rewarded';
      referral.subscriptionType = subscriptionType;
      referral.starsRewarded = starsReward;
      referral.activatedAt = new Date();
      referral.rewardedAt = new Date();
      await referral.save();

      // Обновляем баланс реферера
      await this.updateStarsBalance(referral.referrerId, starsReward);

      // Отправляем уведомление рефереру
      try {
        // Получаем информацию о рефере для определения языка
        const referrer = await this.bot.getChat(referral.referrerId);
        const referrerLang = referrer.language_code || 'ru';
        const texts = this.getTexts(referrerLang);

        const message = `
${texts.congratsBonus}

${texts.referralBought} ${texts.subscriptionNames[subscriptionType]} subscription.
${texts.youReceived} ${starsReward} ⭐ stars

${texts.currentBalanceCheck}
        `;

        await this.bot.sendMessage(referral.referrerId, message);
      } catch (error) {
        console.log('Не удалось отправить уведомление о награде:', error.message);
      }

      console.log('Реферальная награда начислена:', {
        referrerId: referral.referrerId,
        refereeId: referral.refereeId,
        subscriptionType,
        starsReward
      });

    } catch (error) {
      console.error('Ошибка обработки реферальной награды:', error);
    }
  }

  async updateStarsBalance(userId, starsToAdd) {
    try {
      let balance = await StarsBalance.findOne({ userId: userId.toString() });
      
      if (!balance) {
        balance = new StarsBalance({
          userId: userId.toString(),
          balance: starsToAdd,
          totalEarned: starsToAdd,
          referralsCount: 1
        });
      } else {
        balance.balance += starsToAdd;
        balance.totalEarned += starsToAdd;
        balance.referralsCount += 1;
      }
      
      await balance.save();
      console.log('Баланс звезд обновлен:', { userId, newBalance: balance.balance });
      
    } catch (error) {
      console.error('Ошибка обновления баланса звезд:', error);
    }
  }

  async getUserStarsBalance(userId) {
    try {
      const balance = await StarsBalance.findOne({ userId: userId.toString() });
      return balance ? balance.balance : 0;
    } catch (error) {
      console.error('Ошибка получения баланса звезд:', error);
      return 0;
    }
  }
}

module.exports = TelegramStarsBot; 