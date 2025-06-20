const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  // ID пользователя-реферера (кто пригласил)
  referrerId: {
    type: String,
    required: true,
    index: true
  },
  // ID пользователя-рефери (кого пригласили)
  refereeId: {
    type: String,
    required: true,
    index: true
  },
  // Статус реферала
  status: {
    type: String,
    enum: ['pending', 'activated', 'rewarded'],
    default: 'pending'
  },
  // Тип подписки, за которую начислена награда
  subscriptionType: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    default: null
  },
  // Количество звезд, начисленных реферу
  starsRewarded: {
    type: Number,
    default: 0
  },
  // Дата создания реферальной связи
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Дата активации (когда реферал купил подписку)
  activatedAt: {
    type: Date,
    default: null
  },
  // Дата начисления награды
  rewardedAt: {
    type: Date,
    default: null
  }
});

// Составной индекс для предотвращения дублирования
referralSchema.index({ referrerId: 1, refereeId: 1 }, { unique: true });

module.exports = mongoose.model('Referral', referralSchema); 