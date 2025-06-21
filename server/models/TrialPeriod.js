const mongoose = require('mongoose');

const trialPeriodSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  hasSeenWelcome: {
    type: Boolean,
    default: false
  },
  userInfo: {
    firstName: String,
    lastName: String,
    username: String,
    languageCode: String
  }
}, {
  timestamps: true
});

// Автоматически устанавливаем дату окончания (3 дня от старта)
trialPeriodSchema.pre('save', function(next) {
  if (this.isNew && !this.endDate) {
    // Убеждаемся что startDate установлена
    if (!this.startDate) {
      this.startDate = new Date();
    }
    this.endDate = new Date(this.startDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 дня
    console.log('🕒 Auto-setting endDate:', this.endDate, 'for startDate:', this.startDate);
  }
  next();
});

// Метод для проверки активности пробного периода
trialPeriodSchema.methods.isTrialActive = function() {
  return this.isActive && new Date() < this.endDate;
};

// Метод для получения оставшегося времени в миллисекундах
trialPeriodSchema.methods.getTimeLeft = function() {
  const now = new Date();
  const timeLeft = this.endDate.getTime() - now.getTime();
  return Math.max(0, timeLeft);
};

// Метод для получения оставшегося времени в удобном формате
trialPeriodSchema.methods.getFormattedTimeLeft = function() {
  const timeLeft = this.getTimeLeft();
  if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
  
  return { days, hours, minutes, seconds };
};

module.exports = mongoose.model('TrialPeriod', trialPeriodSchema); 