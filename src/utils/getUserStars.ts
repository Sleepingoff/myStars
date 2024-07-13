import { auth, db } from '@/firebase/firebaseConfig';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getUserStars = async (user: User) => {
  try {
    if (!user) throw new Error('User not authenticated');

    const q = query(collection(db, 'stars'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    const stars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return stars;
  } catch (error) {
    console.error('Error getting user stars: ', error);
    return [];
  }
};
