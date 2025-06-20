const express = require('express');
const router = express.Router();
const TrialPeriod = require('../models/TrialPeriod');
const Subscription = require('../models/Subscription');

// Получение статуса пробного периода
router.get('/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Проверяем есть ли активная подписка
    const activeSubscription = await Subscription.findOne({
      userId: userId,
      status: 'active',
      expiresAt: { $gt: new Date() }
    });

    if (activeSubscription) {
      return res.json({
        hasActiveSubscription: true,
        subscriptionType: activeSubscription.type,
        expiresAt: activeSubscription.expiresAt
      });
    }

    // Ищем пробный период
    let trial = await TrialPeriod.findOne({ userId });
    
    if (!trial) {
      // Создаем новый пробный период
      trial = new TrialPeriod({
        userId,
        userInfo: {
          languageCode: req.query.lang || 'ru'
        }
      });
      await trial.save();
    }

    const timeLeft = trial.getFormattedTimeLeft();
    const isActive = trial.isTrialActive();

    res.json({
      hasActiveSubscription: false,
      trial: {
        isActive,
        hasSeenWelcome: trial.hasSeenWelcome,
        startDate: trial.startDate,
        endDate: trial.endDate,
        timeLeft,
        timeLeftMs: trial.getTimeLeft()
      }
    });

  } catch (error) {
    console.error('Ошибка получения статуса пробного периода:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
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