'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import styled from 'styled-components';
import { auth, db } from '@/firebase/firebaseConfig';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUserStars } from '@/utils/getUserStars';
import Card from '@/components/Card';
import ScheduleInput from '@/components/star/ScheduleInput';
import GoogleCalendar from '@/components/star/GoogleCalendar';
import Schedule from '@/components/Schedule';
import Link from 'next/link';
import { StarData } from '../new/page';

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
  const router = useRouter();
  const [stars, setStars] = useState<DocumentData>();
  const user = auth.currentUser;
  useEffect(() => {
    if (!user) throw 'fail to get user';
    getUserStars(user, db).then((res) => {
      setStars(res);
    });
  }, []);

  if (!stars) {
    return <p>Loading...</p>;
  }
  const handleClickCard = (id: string) => {
    if (!user) return;
    router.push(`/star/${user.uid}/${id}`);
  };

  return (
    <ProtectedRoute>
      <Container>
        <Title>STAR Details</Title>
        {stars.map((star: StarData) => (
          <Card
            onClick={(e) => handleClickCard(star.id)}
            title="일정"
            style={{ flexDirection: 'column' }}
            key={star.id}
          >
            <Schedule date={star.createdAt} schedule={star.schedule} />
          </Card>
        ))}
      </Container>
    </ProtectedRoute>
  );
};

export default StarPage;
