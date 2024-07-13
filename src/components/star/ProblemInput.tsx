import React from 'react';
import CustomTextarea from '../Textarea';

interface ProblemInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ProblemInput = ({ value, onChange }: ProblemInputProps) => {
  return (
    <CustomTextarea
      placeholder="어떤 문제가 있나요?"
      value={value}
      onChange={onChange}
    ></CustomTextarea>
  );
};

export default ProblemInput;
