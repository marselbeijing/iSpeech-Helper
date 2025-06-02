import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  increment, 
  serverTimestamp 
} from 'firebase/firestore';
import { getCurrentUser } from './telegram';

// Получение баланса звезд пользователя
export const getStarsBalance = async () => {
  const user = getCurrentUser();
  if (!user) return 0;

  const userRef = doc(db, 'users', user.id.toString());
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return 0;
  }

  return userDoc.data().stars || 0;
};

// Начисление звезд за реферальную покупку
export const addReferralStars = async (amount) => {
  const user = getCurrentUser();
  if (!user) return false;

  const starsAmount = Math.floor(amount * 0.2); // 20% от суммы в звездах

  try {
    const userRef = doc(db, 'users', user.id.toString());
    
    await updateDoc(userRef, {
      stars: increment(starsAmount),
      totalEarnedStars: increment(starsAmount),
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error('Error adding stars:', error);
    return false;
  }
};

// Списание звезд при использовании
export const useStars = async (amount) => {
  const user = getCurrentUser();
  if (!user) return false;

  try {
    const userRef = doc(db, 'users', user.id.toString());
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists() || (userDoc.data().stars || 0) < amount) {
      return false;
    }

    await updateDoc(userRef, {
      stars: increment(-amount),
      starsSpent: increment(amount),
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error('Error using stars:', error);
    return false;
  }
};

// Проверка достаточности звезд для покупки
export const hasEnoughStars = async (amount) => {
  const balance = await getStarsBalance();
  return balance >= amount;
};

// Конвертация суммы в звезды
export const convertToStars = (amount) => {
  return Math.floor(amount * 0.2); // 20% от суммы в звездах
}; 