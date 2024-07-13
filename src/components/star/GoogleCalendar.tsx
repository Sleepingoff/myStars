import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface GoogleCalendarProps {
  onSelect: (value: string) => void;
}

const CustomButton = styled(Button)`
  width: fit-content;
  margin-left: auto;
`;

const GoogleCalendar = ({ onSelect }: GoogleCalendarProps) => {
  const handleSelect = () => {
    // Google Calendar API 연동 로직 추가
    const selectedDate = '2024-07-11'; // 예시 데이터
    onSelect(selectedDate);
  };

  return (
    <CustomButton onClick={handleSelect}>
      Google 캘린더에서 일정 선택
    </CustomButton>
  );
};

export default GoogleCalendar;
