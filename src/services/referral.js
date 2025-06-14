import { db } from './firebase';
import { getCurrentUser } from './telegram';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { addReferralStars } from './stars';

// Ключ для хранения реферальных данных
const REFERRAL_STORAGE_KEY = 'ispeech_referral_data';

// Получение реферальных данных пользователя
export const getReferralData = async () => {
  const user = getCurrentUser();
  if (!user) return null;

  const userRef = doc(db, 'users', user.id.toString());
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const initialData = {
      userId: user.id,
      referralCode: generateReferralCode(user.id),
      referrals: [],
      totalStars: 0,
      totalReferrals: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(userRef, initialData);
    return initialData;
  }

  return userDoc.data();
};

// Генерация уникального реферального кода
const generateReferralCode = (userId) => {
  return `REF${userId}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

// Получение статистики рефералов
export const getReferralStats = async () => {
  const data = await getReferralData();
  if (!data) return null;

  const referralsQuery = query(
    collection(db, 'referrals'),
    where('referrerId', '==', data.userId)
  );
  const referralsSnapshot = await getDocs(referralsQuery);
  
  const activeReferrals = referralsSnapshot.docs.filter(doc => doc.data().isActive).length;

  return {
    totalReferrals: referralsSnapshot.size,
    activeReferrals,
    totalStars: data.totalStars || 0
  };
};

// Добавление новой транзакции
export const addReferralTransaction = async (referralId, amount) => {
  const user = getCurrentUser();
  if (!user) return false;

  try {
    const userRef = doc(db, 'users', user.id.toString());
    
    // Создаем транзакцию
    const transactionRef = collection(db, 'transactions');
    await addDoc(transactionRef, {
      referrerId: user.id,
      referralId,
      amount,
      stars: Math.floor(amount * 0.2),
      status: 'completed',
      createdAt: serverTimestamp()
    });

    // Начисляем звезды рефереру
    await addReferralStars(amount);

    return true;
  } catch (error) {
    console.error('Error adding transaction:', error);
    return false;
  }
};

// Получение истории транзакций
export const getReferralTransactions = async () => {
  const user = getCurrentUser();
  if (!user) return [];

  try {
    const transactionsQuery = query(
      collection(db, 'transactions'),
      where('referrerId', '==', user.id)
    );
    const snapshot = await getDocs(transactionsQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate().toISOString()
    })).sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
};

// Генерация реферальной ссылки
export const generateReferralLink = async () => {
  const data = await getReferralData();
  if (!data) return '';

  return `https://ispeech.app/ref/${data.referralCode}`;
};

// Проверка существования реферального кода
export const checkReferralCode = async (code) => {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      where('referralCode', '==', code)
    );
    const snapshot = await getDocs(usersQuery);
    
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking referral code:', error);
    return false;
  }
};

// Проверка, использовал ли пользователь уже реферальный код
export const hasUsedReferralCode = async (userId) => {
  try {
    const referralsQuery = query(
      collection(db, 'referrals'),
      where('referralId', '==', userId)
    );
    const snapshot = await getDocs(referralsQuery);
    
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking used referral:', error);
    return false;
  }
};

// Активация реферального кода
export const activateReferralCode = async (code) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Пользователь не авторизован'
      };
    }

    // Проверяем, не использовал ли пользователь уже реферальный код
    const hasUsed = await hasUsedReferralCode(user.id);
    if (hasUsed) {
      return {
        success: false,
        message: 'Вы уже использовали реферальный код'
      };
    }

    // Проверяем существование кода
    const usersQuery = query(
      collection(db, 'users'),
      where('referralCode', '==', code)
    );
    const snapshot = await getDocs(usersQuery);
    
    if (snapshot.empty) {
      return {
        success: false,
        message: 'Недействительный реферальный код'
      };
    }

    const referrer = snapshot.docs[0];
    
    // Проверяем, не пытается ли пользователь активировать свой собственный код
    if (referrer.data().userId === user.id) {
      return {
        success: false,
        message: 'Нельзя использовать собственный реферальный код'
      };
    }

    // Создаем запись о реферале
    const referralDoc = await addDoc(collection(db, 'referrals'), {
      referrerId: referrer.data().userId,
      referralId: user.id,
      isActive: true,
      createdAt: serverTimestamp(),
      activatedAt: null,
      status: 'pending'
    });

    // Обновляем статистику реферера
    const referrerRef = doc(db, 'users', referrer.data().userId.toString());
    await updateDoc(referrerRef, {
      totalReferrals: increment(1),
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: 'Реферальный код успешно активирован',
      referralId: referralDoc.id
    };
  } catch (error) {
    console.error('Error activating referral code:', error);
    return {
      success: false,
      message: 'Ошибка при активации кода'
    };
  }
};

// Активация реферальной подписки после оплаты
export const activateReferralSubscription = async (referralId, subscriptionType) => {
  try {
    const referralRef = doc(db, 'referrals', referralId);
    const referralDoc = await getDoc(referralRef);

    if (!referralDoc.exists()) {
      throw new Error('Реферал не найден');
    }

    const referralData = referralDoc.data();
    
    // Обновляем статус реферала
    await updateDoc(referralRef, {
      status: 'active',
      activatedAt: serverTimestamp(),
      subscriptionType
    });

    // Начисляем комиссию рефереру
    await addReferralTransaction(
      referralData.referralId,
      getSubscriptionAmount(subscriptionType)
    );

    return true;
  } catch (error) {
    console.error('Error activating referral subscription:', error);
    return false;
  }
};

// Получение суммы подписки
const getSubscriptionAmount = (type) => {
  const prices = {
    MONTHLY: 299,
    QUARTERLY: 799,
    YEARLY: 1999
  };
  return prices[type] || 0;
};

// Запрос выплаты
export const requestPayout = async () => {
  const user = getCurrentUser();
  if (!user) return {
    success: false,
    message: 'Пользователь не авторизован'
  };

  try {
    const userRef = doc(db, 'users', user.id.toString());
    const userData = await getDoc(userRef);

    if (!userData.exists() || userData.data().pendingPayouts < 100) {
      return {
        success: false,
        message: 'Минимальная сумма для вывода - 100 рублей'
      };
    }

    // Создаем заявку на выплату
    await addDoc(collection(db, 'payouts'), {
      userId: user.id,
      amount: userData.data().pendingPayouts,
      status: 'pending',
      createdAt: serverTimestamp()
    });

    // Обновляем баланс пользователя
    await updateDoc(userRef, {
      pendingPayouts: 0,
      paidOut: increment(userData.data().pendingPayouts),
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: 'Заявка на выплату создана'
    };
  } catch (error) {
    console.error('Error requesting payout:', error);
    return {
      success: false,
      message: 'Ошибка при создании заявки на выплату'
    };
  }
}; 