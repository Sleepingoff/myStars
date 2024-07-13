import React from 'react';
import CustomTextarea from '../Textarea';

interface ResultsInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ResultsInput = ({ value, onChange }: ResultsInputProps) => {
  return (
    <CustomTextarea
      placeholder="결과를 입력하세요"
      value={value}
      onChange={onChange}
    ></CustomTextarea>
  );
};

export default ResultsInput;
