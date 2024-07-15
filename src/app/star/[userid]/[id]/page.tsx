import Card from '@/components/Card';
import Container from '@/components/Container';
import FlexBox from '@/components/FlexBox';
import Schedule from '@/components/Schedule';
import KeyResultsOutput from '@/components/star/KeyResultsOutput';
import { db } from '@/firebase/firebaseConfig';
import formatTimestamp from '@/utils/formatTimestamp';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { StarData } from '../../new/page';

export const generateStaticParams = async () => {
  try {
    const starsSnapshot = await getDocs(collection(db, 'stars'));
    const paths = starsSnapshot.docs.map((doc) => {
      return doc.id;
    });

    const userStarSnapshot = paths.map(async (path) => {
      const snapshot = await getDocs(collection(db, 'stars', path, 'my'));
      return snapshot.docs.map((doc) => {
        return {
          params: {
            id: doc.id,
            userid: path,
          },
        };
      });
    });
    return userStarSnapshot;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const getUserStar = async (userid: string, id: string) => {
  const userStarDoc = doc(db, 'stars', userid, 'my', id);
  const querySnapshot = await getDoc(userStarDoc);
  const star = querySnapshot.data();
  return star as StarData;
};
const StarDetailsPage = async ({
  params: { userid, id },
}: {
  params: { userid: string; id: string };
}) => {
  const star = await getUserStar(userid, id);

  if (!star) {
    return <p>Data not found</p>;
  }

  const date = formatTimestamp(star.createdAt);

  return (
    <Container>
      <h1>내 STAR 기록</h1>
      <Card title="일정">
        <Schedule date={date} schedule={star.schedule} />
      </Card>
      <Card title="문제">
        <p>Problem: {star.problem}</p>
      </Card>
      <FlexBox>
        <Card title="목표">
          <p>Objective: {star.objective}</p>
        </Card>
        <Card title="성과 지표">
          <KeyResultsOutput outputs={star.keyResults} />
        </Card>
      </FlexBox>
      <Card title="결과" style={{ flexDirection: 'column' }}>
        <p>달성률 {star.success}</p>
        <p>{star.results}</p>
      </Card>
    </Container>
  );
};

export default StarDetailsPage;
