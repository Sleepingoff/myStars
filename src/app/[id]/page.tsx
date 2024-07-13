'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, doc, DocumentData, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { auth, db } from '@/firebase/firebaseConfig';
import { getUserStars } from '@/utils/getUserStars';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const StarDetails = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StarPage = () => {
  const pathname = usePathname();
  const [star, setStar] = useState<DocumentData>();

  useEffect(() => {
    if (pathname) {
      const user = auth.currentUser;
      if (!user) throw 'error';
      setStar(getUserStars(user));
      console.log(star);
    }
  }, [pathname]);

  if (!star) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>STAR Details</Title>
      <StarDetails>
        <h2>Objective: {star.objective}</h2>
        <p>Problem: {star.problem}</p>
        <p>Schedule: {star.schedule}</p>
        <p>Key Results: {star.keyResults}</p>
        <p>Results: {star.results}</p>
        <p>Success: {star.success}</p>
      </StarDetails>
    </Container>
  );
};

export default StarPage;
