require('dotenv').config();
const mongoose = require('mongoose');
const Subscription = require('./models/Subscription');
const Invoice = require('./models/Invoice');
const StarsBalance = require('./models/StarsBalance');

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI не установлена в .env файле');
    process.exit(1);
  }
  
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Подключение к MongoDB успешно');
}

// Функция для получения всех подписок
async function getAllSubscriptions() {
  console.log('\n📊 АНАЛИЗ ВСЕХ ПОДПИСОК');
  console.log('='.repeat(50));
  
  const subscriptions = await Subscription.find({}).sort({ createdAt: -1 });
  
  if (subscriptions.length === 0) {
    console.log('❌ Подписок пока нет');
    return;
  }
  
  console.log(`📈 Всего подписок в базе: ${subscriptions.length}`);
  
  // Группировка по статусам
  const byStatus = subscriptions.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📊 По статусам:');
  Object.entries(byStatus).forEach(([status, count]) => {
    console.log(`   ${status}: ${count} шт.`);
  });
  
  // Активные подписки
  const active = subscriptions.filter(sub => sub.isActive && sub.expiresAt > new Date());
  console.log(`\n🟢 Активных подписок: ${active.length}`);
  
  if (active.length > 0) {
    console.log('\n🎯 АКТИВНЫЕ ПОЛЬЗОВАТЕЛИ:');
    active.forEach((sub, i) => {
      const daysLeft = Math.ceil((sub.expiresAt - new Date()) / (1000 * 60 * 60 * 24));
      console.log(`${i + 1}. User ${sub.userId} | ${sub.type} | ${daysLeft} дней | ${sub.stars} ⭐`);
    });
  }
  
  // Оплаченные подписки
  const paid = subscriptions.filter(sub => sub.status === 'paid');
  if (paid.length > 0) {
    console.log(`\n💰 Оплаченных подписок: ${paid.length}`);
    const totalRevenue = paid.reduce((sum, sub) => sum + sub.stars, 0);
    console.log(`💎 Общий доход: ${totalRevenue} ⭐ Stars`);
  }
}

// Функция для получения инвойсов
async function getAllInvoices() {
  console.log('\n📋 АНАЛИЗ ИНВОЙСОВ');
  console.log('='.repeat(50));
  
  const invoices = await Invoice.find({}).sort({ createdAt: -1 });
  
  if (invoices.length === 0) {
    console.log('❌ Инвойсов пока нет');
    return;
  }
  
  console.log(`📈 Всего инвойсов: ${invoices.length}`);
  
  // Группировка по статусам
  const byStatus = invoices.reduce((acc, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📊 По статусам:');
  Object.entries(byStatus).forEach(([status, count]) => {
    console.log(`   ${status}: ${count} шт.`);
  });
  
  // Оплаченные инвойсы
  const paid = invoices.filter(inv => inv.status === 'paid');
  if (paid.length > 0) {
    console.log(`\n💰 Оплаченных инвойсов: ${paid.length}`);
    console.log('\n🎯 ДЕТАЛИ ОПЛАЧЕННЫХ ИНВОЙСОВ:');
    paid.forEach((inv, i) => {
      console.log(`${i + 1}. User ${inv.userId} | ${inv.subscriptionType} | ${inv.stars} ⭐`);
      console.log(`   Дата: ${inv.paidAt?.toLocaleString('ru-RU') || 'Не указана'}`);
      console.log(`   Charge ID: ${inv.telegramPaymentChargeId}`);
      console.log('-'.repeat(30));
    });
  }
}

// Функция для получения балансов Stars
async function getStarsBalances() {
  console.log('\n⭐ АНАЛИЗ БАЛАНСОВ STARS');
  console.log('='.repeat(50));
  
  const balances = await StarsBalance.find({}).sort({ totalEarned: -1 });
  
  if (balances.length === 0) {
    console.log('❌ Балансов пока нет');
    return;
  }
  
  console.log(`📈 Пользователей с балансом: ${balances.length}`);
  
  const totalBalance = balances.reduce((sum, bal) => sum + bal.balance, 0);
  const totalEarned = balances.reduce((sum, bal) => sum + bal.totalEarned, 0);
  
  console.log(`💰 Общий баланс всех пользователей: ${totalBalance} ⭐`);
  console.log(`💎 Общий заработок всех пользователей: ${totalEarned} ⭐`);
  
  console.log('\n🎯 ТОП ПОЛЬЗОВАТЕЛЕЙ ПО ЗАРАБОТКУ:');
  balances.slice(0, 10).forEach((bal, i) => {
    console.log(`${i + 1}. User ${bal.userId} | Баланс: ${bal.balance} ⭐ | Заработано: ${bal.totalEarned} ⭐ | Рефералов: ${bal.referralsCount}`);
  });
}

// Функция для поиска пользователя
async function findUser(userId) {
  console.log(`\n🔍 ПОИСК ПОЛЬЗОВАТЕЛЯ: ${userId}`);
  console.log('='.repeat(50));
  
  // Подписки пользователя
  const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 });
  console.log(`📦 Подписок: ${subscriptions.length}`);
  
  if (subscriptions.length > 0) {
    subscriptions.forEach((sub, i) => {
      const status = sub.isActive && sub.expiresAt > new Date() ? '🟢 Активна' : '🔴 Неактивна';
      console.log(`${i + 1}. ${sub.type} | ${sub.stars} ⭐ | ${status}`);
      console.log(`   Создана: ${sub.createdAt.toLocaleString('ru-RU')}`);
      console.log(`   Действует до: ${sub.expiresAt.toLocaleString('ru-RU')}`);
    });
  }
  
  // Инвойсы пользователя
  const invoices = await Invoice.find({ userId }).sort({ createdAt: -1 });
  console.log(`\n📋 Инвойсов: ${invoices.length}`);
  
  if (invoices.length > 0) {
    invoices.forEach((inv, i) => {
      console.log(`${i + 1}. ${inv.subscriptionType} | ${inv.stars} ⭐ | ${inv.status}`);
      if (inv.paidAt) {
        console.log(`   Оплачен: ${inv.paidAt.toLocaleString('ru-RU')}`);
      }
    });
  }
  
  // Баланс Stars
  const balance = await StarsBalance.findOne({ userId });
  if (balance) {
    console.log(`\n⭐ Баланс Stars: ${balance.balance} ⭐`);
    console.log(`💎 Всего заработано: ${balance.totalEarned} ⭐`);
    console.log(`👥 Рефералов: ${balance.referralsCount}`);
  }
}

// Основная функция
async function main() {
  try {
    await connectDB();
    
    const command = process.argv[2];
    const userId = process.argv[3];
    
    switch (command) {
      case 'subscriptions':
        await getAllSubscriptions();
        break;
      case 'invoices':
        await getAllInvoices();
        break;
      case 'balances':
        await getStarsBalances();
        break;
      case 'user':
        if (!userId) {
          console.log('❌ Укажите userId: node admin-tools.js user 123456789');
          process.exit(1);
        }
        await findUser(userId);
        break;
      case 'all':
        await getAllSubscriptions();
        await getAllInvoices();
        await getStarsBalances();
        break;
      default:
        console.log('📋 Доступные команды:');
        console.log('   node admin-tools.js subscriptions  - все подписки');
        console.log('   node admin-tools.js invoices       - все инвойсы');
        console.log('   node admin-tools.js balances       - балансы Stars');
        console.log('   node admin-tools.js user 123456789 - данные пользователя');
        console.log('   node admin-tools.js all            - всё сразу');
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Отключение от MongoDB');
  }
}

main(); 