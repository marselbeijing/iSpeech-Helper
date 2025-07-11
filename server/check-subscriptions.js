require('dotenv').config();
const mongoose = require('mongoose');

// Подключаемся к той же базе данных, что и в продакшене
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-connection-string';

// Модель подписки
const subscriptionSchema = new mongoose.Schema({
  userId: String,
  type: String,
  stars: Number,
  startDate: Date,
  expiresAt: Date,
  isActive: Boolean,
  transactionId: String,
  telegramPaymentChargeId: String,
  invoicePayload: String,
  paymentDate: Date,
  status: String,
}, {
  timestamps: true,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

async function checkSubscriptions() {
  try {
    console.log('🔌 Подключение к MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Подключение успешно!\n');

    // Получаем все оплаченные подписки
    const paidSubscriptions = await Subscription.find({ status: 'paid' })
      .sort({ paymentDate: -1 });

    console.log(`📊 Всего оплаченных подписок: ${paidSubscriptions.length}\n`);
    console.log('='.repeat(60));

    if (paidSubscriptions.length === 0) {
      console.log('❌ Оплаченных подписок пока нет');
      return;
    }

    // Группируем по типам
    const byType = paidSubscriptions.reduce((acc, sub) => {
      acc[sub.type] = (acc[sub.type] || 0) + 1;
      return acc;
    }, {});

    console.log('📈 Статистика по типам подписок:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} шт.`);
    });
    console.log('');

    // Показываем все подписки
    paidSubscriptions.forEach((sub, index) => {
      const isExpired = sub.expiresAt < new Date();
      const status = sub.isActive && !isExpired ? '🟢 Активна' : '🔴 Неактивна';
      
      console.log(`${index + 1}. 👤 User ID: ${sub.userId}`);
      console.log(`   📦 Тип: ${sub.type}`);
      console.log(`   ⭐ Stars: ${sub.stars}`);
      console.log(`   💰 Дата оплаты: ${sub.paymentDate?.toLocaleString('ru-RU') || 'Не указана'}`);
      console.log(`   ⏰ Действует до: ${sub.expiresAt.toLocaleString('ru-RU')}`);
      console.log(`   ${status}`);
      console.log(`   🔑 Transaction ID: ${sub.transactionId}`);
      console.log(`   📱 Telegram Charge ID: ${sub.telegramPaymentChargeId}`);
      console.log('-'.repeat(50));
    });

    // Активные подписки
    const activeSubscriptions = paidSubscriptions.filter(sub => 
      sub.isActive && sub.expiresAt > new Date()
    );

    console.log(`\n🎯 Активных подписок сейчас: ${activeSubscriptions.length}`);
    
    if (activeSubscriptions.length > 0) {
      console.log('\n🟢 Активные пользователи:');
      activeSubscriptions.forEach((sub, index) => {
        const daysLeft = Math.ceil((sub.expiresAt - new Date()) / (1000 * 60 * 60 * 24));
        console.log(`   ${index + 1}. User ${sub.userId} (${sub.type}) - осталось ${daysLeft} дней`);
      });
    }

    // Общая статистика
    const totalStars = paidSubscriptions.reduce((sum, sub) => sum + sub.stars, 0);
    console.log(`\n💰 Общий доход: ${totalStars} ⭐ Stars`);

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Отключение от MongoDB');
  }
}

checkSubscriptions(); 