'use client';

import Card from '@/components/Card';
import GoogleCalendar from '@/components/star/GoogleCalendar';
import KeyResultsInput from '@/components/star/KeyResultsInput';
import { ContentsType } from '@/components/star/KeyResultsOutput';
import ObjectiveInput from '@/components/star/ObjectiveInput';
import ProblemInput from '@/components/star/ProblemInput';
import ResultsInput from '@/components/star/ResultsInput';
import ScheduleInput from '@/components/star/ScheduleInput';
import { auth, db } from '@/firebase/firebaseConfig';
import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { useState } from 'react';

import styled from 'styled-components';
import SuccessMeter from '@/components/star/SuccessMeter';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
export interface StarData {
  id: string;
  schedule: string;
  problem: string;
  objective: string;
  keyResults: [{ id: number; contents: string }];
  results: string;
  success: number;
  createdAt: Timestamp;
}
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
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

const SaveButton = styled.button`
  margin-left: auto;
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #357ae8;
  }
`;

const NewStarPage = () => {
  const [schedule, setSchedule] = useState('');
  const [problem, setProblem] = useState('');
  const [objective, setObjective] = useState('');
  const [keyResults, setKeyResults] = useState<ContentsType[]>([]);
  const [results, setResults] = useState('');
  const [success, setSuccess] = useState(50);
  const router = useRouter();
  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert('다시 로그인해주세요');
        router.push('/');
        return;
      }

      const newStar = {
        schedule,
        problem,
        objective,
        keyResults,
        results,
        success,
        userID: user.uid,
        createdAt: serverTimestamp(),
      };
      const collecitonRef = collection(db, 'stars', user.uid, 'my');
      await addDoc(collecitonRef, newStar);
      alert('STAR 기록이 저장되었습니다.');
      router.push(`/star/${user.uid}/${collecitonRef.id}`);
    } catch (error) {
      alert('STAR 기록에 실패했습니다. 잠시후 다시시도해주세요');
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <Container>
        <Card style={{ border: 'none' }}>
          <Title>새로운 STAR 기록 만들기</Title>
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </Card>
        <Card title="일정" style={{ flexDirection: 'column' }}>
          <ScheduleInput value={schedule} onChange={setSchedule} />
          <GoogleCalendar onSelect={setSchedule} />
        </Card>
        <Card title="문제">
          <ProblemInput value={problem} onChange={setProblem} />
        </Card>
        <FlexBox>
          <Card title="목표">
            <ObjectiveInput value={objective} onChange={setObjective} />
          </Card>
          <Card title="성과 지표">
            <KeyResultsInput list={keyResults} onChange={setKeyResults} />
          </Card>
        </FlexBox>
        <Card title="결과" style={{ flexDirection: 'column' }}>
          <SuccessMeter value={success} onChange={setSuccess} />
          <ResultsInput value={results} onChange={setResults} />
        </Card>
      </Container>
    </ProtectedRoute>
  );
};

export default NewStarPage;
