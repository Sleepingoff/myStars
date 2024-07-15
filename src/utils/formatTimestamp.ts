import { Timestamp } from 'firebase/firestore';
import { formatDate } from './formatDate';

const formatTimestamp = (timestamp: Timestamp) => {
  const serverDate = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  ).toDate();
  const currentDate = formatDate(serverDate);
  return currentDate;
};

export default formatTimestamp;
