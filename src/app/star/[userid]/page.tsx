import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import ProtectedRoute from '@/components/ProtectedRoute';
import Card from '@/components/Card';
import Schedule from '@/components/Schedule';
import { StarData } from '../new/page';
import Link from 'next/link';
import Container from '@/components/Container';
import formatTimestamp from '@/utils/formatTimestamp';

export const generateStaticParams = async () => {
  try {
    const starsSnapshot = await getDocs(collection(db, 'stars'));
    const paths = starsSnapshot.docs.map((doc) => {
      return {
        params: {
          userid: doc.id,
        },
      };
    });
    return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
};

const getUserStars = async (userid: string) => {
  const userStarsCollection = collection(db, 'stars', userid, 'my');
  const q = query(userStarsCollection, orderBy('createdAt'));
  const querySnapshot = await getDocs(q);
  const stars = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    };
  });
  return stars as StarData[];
};

const StarPage = async ({
  params: { userid },
}: {
  params: {
    userid: string;
  };
}) => {
  const stars = await getUserStars(userid);

  if (!stars) {
    return <p>Data not found</p>;
  }

  const currentStars = stars.map((star: StarData) => {
    return {
      ...star,
      createdAt: formatTimestamp(star.createdAt),
    };
  });

  return (
    <ProtectedRoute>
      <Container>
        <h1>My STARs List</h1>
        {currentStars.map((star) => (
          <Link href={`/star/${userid}/${star.id}`} key={star.id}>
            <Card title="일정" style={{ flexDirection: 'column' }}>
              <Schedule date={star.createdAt} schedule={star.schedule} />
            </Card>
          </Link>
        ))}
      </Container>
    </ProtectedRoute>
  );
};

export default StarPage;
