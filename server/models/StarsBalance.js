const mongoose = require('mongoose');

const starsBalanceSchema = new mongoose.Schema({
  // ID пользователя
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // Текущий баланс звезд
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  // Общее количество заработанных звезд
  totalEarned: {
    type: Number,
    default: 0,
    min: 0
  },
  // Общее количество потраченных звезд
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  // Количество рефералов
  referralsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  // Дата создания записи
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Дата последнего обновления
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Обновляем updatedAt при каждом сохранении
starsBalanceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('StarsBalance', starsBalanceSchema); 