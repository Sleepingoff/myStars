import { User } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
  Timestamp,
} from 'firebase/firestore';

export const getUserStars = async (user: User, db: Firestore) => {
  try {
    if (!user.uid) throw new Error('User not authenticated');
    const userStarsCollection = collection(db, 'stars', user.uid, 'my');
    const q = query(userStarsCollection);
    const querySnapshot = await getDocs(q);
    const stars = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
    return stars;
  } catch (error) {
    console.log('Error getting user stars: ', error);
    return [];
  }
};
