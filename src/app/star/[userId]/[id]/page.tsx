'use client';

import Card from '@/components/Card';
import Schedule from '@/components/Schedule';
import KeyResultsOutput from '@/components/star/KeyResultsOutput';
import { auth, db } from '@/firebase/firebaseConfig';
import { getUserStar } from '@/utils/getUserStar';
import { getUserStars } from '@/utils/getUserStars';
import { DocumentData } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StarData } from '../../new/page';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  & > :last-child {
    flex-basis: 70%;
  }
  & > :first-child {
    flex-basis: 30%;
  }
`;
const StarDetailsPage = () => {
  const pathnames = usePathname().split('/');
  const pathname = pathnames[pathnames.length - 1];

  const [star, setStar] = useState<StarData>();
  useEffect(() => {
    const fetchStars = async () => {
      const user = auth.currentUser;
      if (!user) throw 'fail to get user';
      await getUserStar(user, db, pathname).then((res) => {
        if (!res) throw 'no data';
        const currentStar = res as StarData;
        setStar(currentStar);
      });
    };

    fetchStars();
  }, [pathname]);

  if (!star) {
    return <p>loadings...</p>;
  }
  return (
    <Container>
      <Title>내 STAR 기록</Title>
      <Card title="일정">
        <Schedule date={star.createdAt} schedule={star.schedule} />
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
