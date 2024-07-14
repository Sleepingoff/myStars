import { formatDate } from '@/utils/formatDate';
import { Timestamp } from 'firebase/firestore';
import styled from 'styled-components';

interface ScheduleProps {
  date: Timestamp;
  schedule: string;
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

const Schedule = ({ date, schedule }: ScheduleProps) => {
  const serverDate = new Timestamp(date.seconds, date.nanoseconds).toDate();
  const currentDate = formatDate(serverDate);

  return (
    <Container>
      <DateComp>{currentDate}</DateComp>
      <span>{schedule}</span>
    </Container>
  );
};

export default Schedule;
