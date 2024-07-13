'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import GoogleCalendar from '@/components/star/GoogleCalendar';
import KeyResultsInput from '@/components/star/KeyResultsInput';
import { ContentsType } from '@/components/star/KeyResultsOutput';
import ObjectiveInput from '@/components/star/ObjectiveInput';
import ProblemInput from '@/components/star/ProblemInput';
import ResultsInput from '@/components/star/ResultsInput';
import ScheduleInput from '@/components/star/ScheduleInput';
import { db } from '@/firebase/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore/lite';
import { useState } from 'react';

import styled from 'styled-components';
import SuccessMeter from '@/components/star/SuccessMeter';

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
    flex-basis: 1;
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
  const [summary, setSummary] = useState('');

  const handleSave = async () => {
    const newStar = {
      schedule,
      problem,
      objective,
      keyResults,
      results,
      success,
      summary,
      createdAt: serverTimestamp(),
    };

    const collectionRef = addDoc(collection(db, 'stars'), newStar);
    alert('STAR 기록이 저장되었습니다.');
  };

  return (
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
  );
};

export default NewStarPage;
