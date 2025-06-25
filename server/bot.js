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
    let lang = 'en';
    if (languageCode && typeof languageCode === 'string' && languageCode.startsWith('ru')) {
      lang = 'ru';
    }
    const isEnglish = lang === 'en';
    return {
      invoiceCreated: isEnglish
        ? `✨ Invoice created! Click the «Pay» button above to complete the payment.`
        : `✨ Инвойс создан! Нажмите кнопку «Pay» выше для оплаты.`,
      subscriptionMenu: isEnglish
        ? `💫 Choose your iSpeech Helper subscription (Full access to all features):\n🔸 1 month — 299 ⭐ (30 days access)\n🔸 3 months — 699 ⭐ (−20%)\n🔸 12 months — 1999 ⭐ (−40%)`
        : `💫 Выберите подписку iSpeech Helper (Полный доступ ко всем функциям):\n🔸 1 месяц — 299 ⭐ (30 дней доступа)\n🔸 3 месяца — 699 ⭐ (−20%)\n🔸 12 месяцев — 1999 ⭐ (−40%)`,
      monthlyButton: isEnglish ? '📅 1 month (299 ⭐)' : '📅 1 месяц (299 ⭐)',
      quarterlyButton: isEnglish ? '📅 3 months (699 ⭐)' : '📅 3 месяца (699 ⭐)',
      yearlyButton: isEnglish ? '📅 12 months (1999 ⭐)' : '📅 12 месяцев (1999 ⭐)',
      openAppButton: isEnglish ? '🚀 Open App' : '🚀 Открыть приложение',
      buyButton: isEnglish ? '💳 Pay' : '💳 Заплатить',
      backButton: isEnglish ? '🔙 Back to selection' : '🔙 Назад к выбору',
      monthlyTitle: isEnglish
        ? `🪄 Premium Monthly Subscription  💰 Price: 299 ⭐ stars  ⏰ Duration: 30 days  📝 Full access to all features for 1 month`
        : `🪄 Месячная подписка Premium  💰 Стоимость: 299 ⭐ звезд  ⏰ Длительность: 30 дней  📝 Полный доступ ко всем функциям на 1 месяц`,
      quarterlyTitle: isEnglish
        ? `🪄 Premium Quarterly Subscription  💰 Price: 699 ⭐ stars  ⏰ Duration: 90 days  📝 Full access to all features for 3 months (20% off)`
        : `🪄 Квартальная подписка Premium  💰 Стоимость: 699 ⭐ звезд  ⏰ Длительность: 90 дней  📝 Полный доступ ко всем функциям на 3 месяца (скидка 20%)`,
      yearlyTitle: isEnglish
        ? `🪄 Premium Annual Subscription  💰 Price: 1999 ⭐ stars  ⏰ Duration: 365 days  📝 Full access to all features for 1 year (40% off)`
        : `🪄 Годовая подписка Premium  💰 Стоимость: 1999 ⭐ звезд  ⏰ Длительность: 365 дней  📝 Полный доступ ко всем функциям на 1 год (скидка 40%)`,
      duration30: isEnglish ? '30 days' : '30 дней',
      duration90: isEnglish ? '90 days' : '90 дней', 
      duration365: isEnglish ? '365 days' : '365 дней',
      description1: isEnglish ? 'Full access to all features for 1 month' : 'Полный доступ ко всем функциям на 1 месяц',
      description3: isEnglish ? 'Full access to all features for 3 months (20% off)' : 'Полный доступ ко всем функциям на 3 месяца (скидка 20%)',
      description12: isEnglish ? 'Full access to all features for 1 year (40% off)' : 'Полный доступ ко всем функциям на 1 год (скидка 40%)',
      cost: isEnglish ? 'Price:' : 'Стоимость:',
      duration: isEnglish ? 'Duration:' : 'Длительность:',
      stars: isEnglish ? 'stars' : 'звезд',
      clickToPay: isEnglish ? 'Click the button below to pay:' : 'Нажмите кнопку ниже для оплаты:',
      paymentSuccess: isEnglish ? '✅ Payment processed successfully!' : '✅ Платеж успешно обработан!',
      subscriptionActivated: isEnglish ? '🎉 Your subscription has been activated!' : '🎉 Ваша подписка активирована!',
      validUntil: isEnglish ? '⏰ Valid until:' : '⏰ Действует до:',
      starsSpent: isEnglish ? '⭐ Stars spent:' : '⭐ Потрачено Stars:',
      allFeaturesAvailable: isEnglish ? 'All app features are now available to you!' : 'Теперь вам доступны все функции приложения!',
      monthly: isEnglish ? 'monthly' : 'месячная',
      quarterly: isEnglish ? 'quarterly' : 'квартальная',
      yearly: isEnglish ? 'annual' : 'годовая',
      invoiceNotFound: isEnglish ? '❌ Error: invoice not found. Please contact support.' : '❌ Ошибка: инвойс не найден. Обратитесь в поддержку.',
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
      welcomeMessage: isEnglish
        ? `🗣 I'm your personal assistant for improving speech and diction. Here you'll find exercises for:\n\n✨ Clear articulation\n🫁 Proper breathing and voice control\n🎯 Confident communication\n🎭 Expressive speech\n🎁 Enjoy a 3-day FREE trial with full access to all features!`
        : `🗣 Я ваш персональный помощник для улучшения речи и дикции. Здесь вас ждут упражнения для:\n\n✨ Четкой артикуляции\n🫁 Правильного дыхания и голоса\n🎯 Уверенной коммуникации\n🎭 Выразительности речи\n🎁 Получите 3 дня БЕСПЛАТНОГО доступа ко всем функциям!`,
      learnAboutSubscriptionButton: isEnglish ? '💫 Learn about subscription' : '💫 Подробнее о подписке',
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
    this.bot.onText(/\/start(.*)/, async (msg) => {
      const chatId = msg.chat.id;
      const startParam = msg.text.split(' ')[1];
      let userLang = 'en';
      // Пытаемся получить язык из сохранённого профиля
      let trialPeriod = await TrialPeriod.findOne({ userId: msg.from.id.toString() });
      if (trialPeriod?.userInfo?.languageCode) {
        userLang = trialPeriod.userInfo.languageCode;
      } else if (msg.from.language_code) {
        userLang = msg.from.language_code.startsWith('ru') ? 'ru' : 'en';
      }
      // Если есть параметр покупки — сразу показываем экран покупки
      if (startParam && startParam.startsWith('buy_')) {
        const planType = startParam.replace('buy_', '');
        await this.sendSubscriptionOffer(chatId, planType, { language_code: userLang });
        return;
      }
      // Если нет параметра — показываем выбор языка
      this.bot.sendMessage(chatId, 'Выберите язык / Choose your language', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Русский', callback_data: 'set_lang_ru_start' },
              { text: 'English', callback_data: 'set_lang_en_start' }
            ]
          ]
        }
      });
    });

    // Обработка выбора языка через inline-кнопки при старте
    this.bot.on('callback_query', async (query) => {
      if (query.data === 'set_lang_en_start' || query.data === 'set_lang_ru_start') {
        const lang = query.data === 'set_lang_en_start' ? 'en' : 'ru';
        await TrialPeriod.findOneAndUpdate(
          { userId: query.from.id.toString() },
          { $set: { 'userInfo.languageCode': lang } },
          { upsert: true }
        );
        const texts = this.getTexts(lang);

        // Проверяем, был ли start-параметр с покупкой
        let startParam = null;
        if (query.message && query.message.reply_to_message && query.message.reply_to_message.text) {
          const parts = query.message.reply_to_message.text.split(' ');
          if (parts.length > 1) startParam = parts[1];
        }
        if (!startParam && query.message && query.message.text) {
          const parts = query.message.text.split(' ');
          if (parts.length > 1) startParam = parts[1];
        }
        if (startParam && startParam.startsWith('buy_')) {
          const planType = startParam.replace('buy_', '');
          await this.sendSubscriptionOffer(query.message.chat.id, planType, { language_code: lang });
        } else {
          // Обычное приветствие с кнопками
          this.bot.sendMessage(query.message.chat.id, texts.welcomeMessage, {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: texts.openAppButton, web_app: { url: process.env.WEBAPP_URL || 'https://i-speech-helper-uce4.vercel.app/' } }
                ],
                [
                  { text: texts.learnAboutSubscriptionButton, callback_data: 'subscription_menu' }
                ]
              ]
            }
          });
        }
        return;
      }
      // ... существующая обработка других callback_query ...
    });

    // Команда /paysupport - обязательная для платежных ботов
    this.bot.onText(/\/paysupport/, async (msg) => {
      const chatId = msg.chat.id;
      const supportMessage = `
🛠 Поддержка по платежам

По вопросам, связанным с платежами и подписками, обращайтесь:
📧 Email: support@ispeechhelper.com
`;
      await this.bot.sendMessage(chatId, supportMessage);
    });

    // Команда /reset_lang для сброса языка
    this.bot.onText(/\/reset_lang/, async (msg) => {
      const userId = msg.from.id.toString();
      try {
        // Удаляем сохраненный язык из базы данных
        await TrialPeriod.findOneAndUpdate(
          { userId: userId },
          { $unset: { 'userInfo.languageCode': '' } }
        );
        
        console.log('🔄 Language reset for user:', userId);
        
        // Отправляем выбор языка заново
        this.bot.sendMessage(msg.chat.id, 'Language reset! Choose your language / Язык сброшен! Выберите язык:', {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Русский', callback_data: 'set_lang_ru_start' },
                { text: 'English', callback_data: 'set_lang_en_start' }
              ]
            ]
          }
        });
      } catch (error) {
        console.error('Error resetting language:', error);
        this.bot.sendMessage(msg.chat.id, 'Error resetting language / Ошибка сброса языка');
      }
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
      await this.sendSubscriptionMenu(msg.chat.id, null, msg.from.id);
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
        await this.sendSubscriptionMenu(chatId, null, from.id);
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
    // Приоритет текущему языку Telegram, а не сохраненному
    let lang = 'en'; // по умолчанию английский
    
    // Сначала проверяем текущий язык Telegram
    if (user.language_code && user.language_code.startsWith('ru')) {
      lang = 'ru';
    }
    
    // Только если нет текущего языка Telegram, берем сохраненный
    if (!user.language_code && user.id) {
      const trial = await TrialPeriod.findOne({ userId: user.id.toString() });
      if (trial?.userInfo?.languageCode) {
        lang = trial.userInfo.languageCode;
      }
    }
    
    console.log('🔍 createInvoice - user.language_code:', user.language_code);
    console.log('🔍 createInvoice - final lang:', lang);
    const texts = this.getTexts(lang);
    
    try {
      // Импортируем модель Invoice напрямую вместо HTTP запроса
      const Invoice = require('./models/Invoice');
      
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
        description: plan.title,
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

      // Отправляем инвойс через Telegram Bot API с динамическим label
      const payLabel = lang === 'ru' ? 'Заплатить' : 'Pay';
      await this.bot.sendInvoice(chatId, plan.title, plan.title,
        payload,
        '', // provider_token пустой для Stars
        'XTR', // Stars
        [{ label: payLabel, amount: plan.amount }]
      );

      // Используем уже объявленную переменную texts
      await this.bot.sendMessage(chatId, texts.invoiceCreated);
      
    } catch (error) {
      console.error('Ошибка создания инвойса:', error);
      const isEnglish = lang === 'en';
      const errorMessage = isEnglish ? 
        '❌ Failed to create invoice. Please try again later or contact support.' :
        '❌ Не удалось создать инвойс. Попробуйте позже или обратитесь в поддержку.';
      await this.bot.sendMessage(chatId, errorMessage);
    }
  }

  async sendSubscriptionMenu(chatId, languageCode, userId) {
    let lang = languageCode;
    if (!lang && userId) {
      const trial = await TrialPeriod.findOne({ userId: userId.toString() });
      if (trial?.userInfo?.languageCode) {
        lang = trial.userInfo.languageCode;
      }
    }
    if (!lang) lang = 'en';
    const texts = this.getTexts(lang);

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
    // Приоритет текущему языку Telegram, а не сохраненному
    let lang = 'en'; // по умолчанию английский
    
    // Сначала проверяем текущий язык Telegram
    if (user.language_code && user.language_code.startsWith('ru')) {
      lang = 'ru';
    }
    
    // Только если нет текущего языка Telegram, берем сохраненный
    if (!user.language_code && user.id) {
      const trial = await TrialPeriod.findOne({ userId: user.id.toString() });
      if (trial?.userInfo?.languageCode) {
        lang = trial.userInfo.languageCode;
      }
    }
    
    console.log('🔍 sendSubscriptionOffer - user.language_code:', user.language_code);
    console.log('🔍 sendSubscriptionOffer - final lang:', lang);
    const texts = this.getTexts(lang);
    
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
      const isEnglish = lang && lang.startsWith('en');
      const errorText = isEnglish ? 
        '❌ Unknown subscription type' : '❌ Неизвестный тип подписки';
      await this.bot.sendMessage(chatId, errorText);
      return;
    }

    const offerMessage = `${plan.title}`;

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

