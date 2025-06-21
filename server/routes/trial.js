const express = require('express');
const router = express.Router();
const TrialPeriod = require('../models/TrialPeriod');
const Subscription = require('../models/Subscription');

// CORS middleware для всех роутов trial
router.use((req, res, next) => {
  console.log(`🛣️ Trial route accessed: ${req.method} ${req.originalUrl} - params:`, req.params, 'query:', req.query);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Получение статуса пробного периода
router.get('/status/:userId', async (req, res) => {
  console.log('🎯 Trial status endpoint hit! userId:', req.params.userId, 'query:', req.query);
  try {
    const { userId } = req.params;
    console.log('🔍 Trial status request for userId:', userId);
    
    // Проверяем есть ли активная подписка
    console.log('📊 Checking for active subscription...');
    const activeSubscription = await Subscription.findOne({
      userId: userId,
      status: 'active',
      expiresAt: { $gt: new Date() }
    });
    console.log('📊 Active subscription found:', !!activeSubscription);

    if (activeSubscription) {
      console.log('✅ User has active subscription, returning subscription info');
      return res.json({
        hasActiveSubscription: true,
        subscriptionType: activeSubscription.type,
        expiresAt: activeSubscription.expiresAt
      });
    }

    // Ищем пробный период
    console.log('🔍 Looking for trial period...');
    let trial = await TrialPeriod.findOne({ userId });
    console.log('🔍 Trial found:', !!trial);
    
    if (!trial) {
      // Создаем новый пробный период
      console.log('➕ Creating new trial period...');
      trial = new TrialPeriod({
        userId,
        userInfo: {
          languageCode: req.query.lang || 'ru'
        }
      });
      await trial.save();
      console.log('✅ New trial period created');
    }

    console.log('🔍 Trial object:', {
      userId: trial.userId,
      startDate: trial.startDate,
      endDate: trial.endDate,
      isActive: trial.isActive
    });
    
    let timeLeft, isActive;
    try {
      timeLeft = trial.getFormattedTimeLeft();
      console.log('✅ getFormattedTimeLeft успешно:', timeLeft);
    } catch (error) {
      console.error('❌ Ошибка в getFormattedTimeLeft:', error);
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    try {
      isActive = trial.isTrialActive();
      console.log('✅ isTrialActive успешно:', isActive);
    } catch (error) {
      console.error('❌ Ошибка в isTrialActive:', error);
      isActive = false;
    }
    
    console.log('📊 Trial status:', { isActive, timeLeft });

    let timeLeftMs = 0;
    try {
      timeLeftMs = trial.getTimeLeft();
      console.log('✅ getTimeLeft успешно:', timeLeftMs);
    } catch (error) {
      console.error('❌ Ошибка в getTimeLeft:', error);
      timeLeftMs = 0;
    }

    res.json({
      hasActiveSubscription: false,
      trial: {
        isActive,
        hasSeenWelcome: trial.hasSeenWelcome,
        startDate: trial.startDate,
        endDate: trial.endDate,
        timeLeft,
        timeLeftMs
      }
    });

  } catch (error) {
    console.error('❌ Ошибка получения статуса пробного периода:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Отметка о просмотре приветственного сообщения
router.post('/welcome-seen/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    await TrialPeriod.findOneAndUpdate(
      { userId },
      { hasSeenWelcome: true },
      { upsert: true }
    );

    res.json({ success: true });

  } catch (error) {
    console.error('Ошибка отметки просмотра приветствия:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Проверка доступа к функции
router.get('/check-access/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Проверяем активную подписку
    const activeSubscription = await Subscription.findOne({
      userId: userId,
      status: 'active',
      expiresAt: { $gt: new Date() }
    });

    if (activeSubscription) {
      return res.json({ hasAccess: true, reason: 'subscription' });
    }

    // Проверяем пробный период
    const trial = await TrialPeriod.findOne({ userId });
    
    if (trial && trial.isTrialActive()) {
      return res.json({ hasAccess: true, reason: 'trial' });
    }

    res.json({ hasAccess: false, reason: 'expired' });

  } catch (error) {
    console.error('Ошибка проверки доступа:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router; 