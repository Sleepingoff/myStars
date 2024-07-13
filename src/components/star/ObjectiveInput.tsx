import React from 'react';
import CustomTextarea from '../Textarea';

interface ObjectiveInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ObjectiveInput: React.FC<ObjectiveInputProps> = ({ value, onChange }) => {
  return (
    <CustomTextarea
      placeholder="목표를 입력하세요"
      value={value}
      onChange={onChange}
    ></CustomTextarea>
  );
};

export default ObjectiveInput;
