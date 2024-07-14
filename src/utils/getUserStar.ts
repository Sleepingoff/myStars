import { User } from 'firebase/auth';
import { Firestore, getDoc, doc } from 'firebase/firestore';

export const getUserStar = async (
  user: User,
  db: Firestore,
  starId: string
) => {
  try {
    if (!user.uid) throw new Error('User not authenticated');
    const userStarDoc = doc(db, 'stars', user.uid, 'my', starId);
    const querySnapshot = await getDoc(userStarDoc);
    const star = querySnapshot.data();
    return star;
  } catch (error) {
    console.log('Error getting user stars: ', error);
    return [];
  }
};
