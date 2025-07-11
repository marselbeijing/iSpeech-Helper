const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Invoice = require('../models/Invoice');
const StarsBalance = require('../models/StarsBalance');

// Получение статистики подписок
router.get('/stats', async (req, res) => {
  try {
    // Подписки
    const subscriptions = await Subscription.find({});
    const activeSubscriptions = subscriptions.filter(sub => 
      sub.isActive && sub.expiresAt > new Date()
    );
    const paidSubscriptions = subscriptions.filter(sub => sub.status === 'paid');
    
    // Инвойсы
    const invoices = await Invoice.find({});
    const paidInvoices = invoices.filter(inv => inv.status === 'paid');
    
    // Балансы
    const balances = await StarsBalance.find({});
    const totalBalance = balances.reduce((sum, bal) => sum + bal.balance, 0);
    const totalEarned = balances.reduce((sum, bal) => sum + bal.totalEarned, 0);
    
    // Общий доход
    const totalRevenue = paidSubscriptions.reduce((sum, sub) => sum + sub.stars, 0);
    
    // Группировка по типам подписок
    const subscriptionTypes = paidSubscriptions.reduce((acc, sub) => {
      acc[sub.type] = (acc[sub.type] || 0) + 1;
      return acc;
    }, {});

    res.json({
      subscriptions: {
        total: subscriptions.length,
        active: activeSubscriptions.length,
        paid: paidSubscriptions.length,
        byType: subscriptionTypes
      },
      invoices: {
        total: invoices.length,
        paid: paidInvoices.length,
        created: invoices.filter(inv => inv.status === 'created').length
      },
      revenue: {
        totalStars: totalRevenue,
        referralBalance: totalBalance,
        referralEarned: totalEarned
      },
      users: {
        withBalance: balances.length,
        totalReferrals: balances.reduce((sum, bal) => sum + bal.referralsCount, 0)
      }
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Получение списка всех подписок
router.get('/subscriptions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const subscriptions = await Subscription.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Subscription.countDocuments();
    
    const formattedSubscriptions = subscriptions.map(sub => ({
      id: sub._id,
      userId: sub.userId,
      type: sub.type,
      stars: sub.stars,
      status: sub.status,
      isActive: sub.isActive,
      createdAt: sub.createdAt,
      expiresAt: sub.expiresAt,
      isExpired: sub.expiresAt < new Date(),
      daysLeft: Math.ceil((sub.expiresAt - new Date()) / (1000 * 60 * 60 * 24)),
      transactionId: sub.transactionId
    }));
    
    res.json({
      subscriptions: formattedSubscriptions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    res.status(500).json({ error: 'Failed to get subscriptions' });
  }
});

// Получение списка всех инвойсов
router.get('/invoices', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const invoices = await Invoice.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Invoice.countDocuments();
    
    const formattedInvoices = invoices.map(inv => ({
      id: inv._id,
      userId: inv.userId,
      subscriptionType: inv.subscriptionType,
      stars: inv.stars,
      status: inv.status,
      payload: inv.payload,
      createdAt: inv.createdAt,
      paidAt: inv.paidAt,
      expiresAt: inv.expiresAt,
      telegramPaymentChargeId: inv.telegramPaymentChargeId
    }));
    
    res.json({
      invoices: formattedInvoices,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting invoices:', error);
    res.status(500).json({ error: 'Failed to get invoices' });
  }
});

// Получение информации о конкретном пользователе
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Подписки пользователя
    const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 });
    
    // Инвойсы пользователя
    const invoices = await Invoice.find({ userId }).sort({ createdAt: -1 });
    
    // Баланс Stars
    const balance = await StarsBalance.findOne({ userId });
    
    const activeSubscription = subscriptions.find(sub => 
      sub.isActive && sub.expiresAt > new Date()
    );
    
    res.json({
      userId,
      subscriptions: subscriptions.map(sub => ({
        id: sub._id,
        type: sub.type,
        stars: sub.stars,
        status: sub.status,
        isActive: sub.isActive,
        createdAt: sub.createdAt,
        expiresAt: sub.expiresAt,
        isExpired: sub.expiresAt < new Date(),
        daysLeft: Math.ceil((sub.expiresAt - new Date()) / (1000 * 60 * 60 * 24))
      })),
      invoices: invoices.map(inv => ({
        id: inv._id,
        subscriptionType: inv.subscriptionType,
        stars: inv.stars,
        status: inv.status,
        createdAt: inv.createdAt,
        paidAt: inv.paidAt
      })),
      balance: balance ? {
        balance: balance.balance,
        totalEarned: balance.totalEarned,
        referralsCount: balance.referralsCount
      } : null,
      hasActiveSubscription: !!activeSubscription,
      activeSubscription: activeSubscription ? {
        type: activeSubscription.type,
        expiresAt: activeSubscription.expiresAt,
        daysLeft: Math.ceil((activeSubscription.expiresAt - new Date()) / (1000 * 60 * 60 * 24))
      } : null
    });
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Получение топ пользователей по доходу
router.get('/top-users', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Группируем подписки по пользователям
    const userRevenue = await Subscription.aggregate([
      { $match: { status: 'paid' } },
      { $group: {
        _id: '$userId',
        totalStars: { $sum: '$stars' },
        subscriptionsCount: { $sum: 1 },
        lastSubscription: { $max: '$createdAt' }
      }},
      { $sort: { totalStars: -1 } },
      { $limit: limit }
    ]);
    
    res.json({
      topUsers: userRevenue.map(user => ({
        userId: user._id,
        totalStars: user.totalStars,
        subscriptionsCount: user.subscriptionsCount,
        lastSubscription: user.lastSubscription
      }))
    });
  } catch (error) {
    console.error('Error getting top users:', error);
    res.status(500).json({ error: 'Failed to get top users' });
  }
});

module.exports = router; 