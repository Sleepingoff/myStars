import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId, id } = context.params as { userId: string; id: string };
  const docRef = doc(db, 'stars', userId, 'my', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      star: docSnap.data(),
    },
  };
};
