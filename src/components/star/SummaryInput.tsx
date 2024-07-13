import React from 'react';

interface SummaryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SummaryInput = ({ value, onChange }: SummaryInputProps) => {
  return (
    <div>
      <label>요약 입력:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SummaryInput;
