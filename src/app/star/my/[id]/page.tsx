'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';
import { auth, db } from '@/firebase/firebaseConfig';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUserStars } from '@/utils/getUserStars';
import { StarData } from '../../new/page';
import Card from '@/components/Card';
import ScheduleInput from '@/components/star/ScheduleInput';
import GoogleCalendar from '@/components/star/GoogleCalendar';
import Schedule from '@/components/Schedule';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const StarPage = () => {
  const pathname = usePathname().split('/')[2];
  const [stars, setStars] = useState<DocumentData>();

  useEffect(() => {
    if (pathname) {
      const user = auth.currentUser;
      if (!user) throw 'fail to get user';
      getUserStars(user, db).then((res) => {
        setStars(res);
      });
    }
  }, [pathname]);

  // console.log(star);
  if (!stars) {
    return <p>Loading...</p>;
  }

  return (
    <ProtectedRoute>
      <Container>
        <Title>STAR Details</Title>
        {stars.map((star: StarData) => (
          <Card key={star.id} title="일정" style={{ flexDirection: 'column' }}>
            <Schedule date={star.createdAt} schedule={star.schedule} />
          </Card>
        ))}
      </Container>
    </ProtectedRoute>
  );
};

export default StarPage;
