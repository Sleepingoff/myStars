import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomTextarea from '../Textarea';

interface ScheduleInputProps {
  value: string;
  onChange: (value: string) => void;
}
const Container = styled.div`
  text-align: left;
  padding: 20px;
  border-left: 4px solid #999;
  color: #333;
  margin-bottom: 20px;
  & > * {
    margin-left: 0;
  }
`;

const DateComp = styled.p`
  text-align: left;
  margin-bottom: 10px;
`;

const ScheduleInput = ({ value, onChange }: ScheduleInputProps) => {
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    setToday(date.toLocaleDateString('ko-KR', options));
  }, []);

  return (
    <Container>
      <DateComp>{today}</DateComp>
      <CustomTextarea
        value={value}
        onChange={onChange}
        placeholder="일정을 입력하세요"
      />
    </Container>
  );
};

export default ScheduleInput;
