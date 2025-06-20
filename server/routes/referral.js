const express = require('express');
const router = express.Router();
const StarsBalance = require('../models/StarsBalance');
const Referral = require('../models/Referral');

// Получение баланса звезд пользователя
router.get('/balance/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const balance = await StarsBalance.findOne({ userId: userId.toString() });
    
    res.json({
      balance: balance ? balance.balance : 0,
      totalEarned: balance ? balance.totalEarned : 0,
      totalSpent: balance ? balance.totalSpent : 0,
      referralsCount: balance ? balance.referralsCount : 0
    });
    
  } catch (error) {
    console.error('Ошибка получения баланса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Получение статистики рефералов
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Получаем рефералов пользователя
    const referrals = await Referral.find({ referrerId: userId.toString() });
    
    // Группируем по статусам
    const stats = {
      total: referrals.length,
      pending: referrals.filter(r => r.status === 'pending').length,
      activated: referrals.filter(r => r.status === 'activated').length,
      rewarded: referrals.filter(r => r.status === 'rewarded').length,
      totalStarsEarned: referrals.reduce((sum, r) => sum + (r.starsRewarded || 0), 0)
    };
    
    res.json(stats);
    
  } catch (error) {
    console.error('Ошибка получения статистики рефералов:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Получение списка рефералов
router.get('/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const referrals = await Referral.find({ referrerId: userId.toString() })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Referral.countDocuments({ referrerId: userId.toString() });
    
    res.json({
      referrals,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
    
  } catch (error) {
    console.error('Ошибка получения списка рефералов:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router; 