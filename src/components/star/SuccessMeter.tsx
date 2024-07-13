import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import Form from '../Form';

interface ToggleInputProps {
  value: number;
  onChange: (value: number) => void;
}

const Label = styled.label`
  font-size: 1em;
`;

const Output = styled.output`
  font-size: 1.2em;
`;

const RangeInput = styled.input`
  flex-basis: 1;
`;

const SuccessMeter = ({ value, onChange }: ToggleInputProps) => {
  const handleChangeMeter: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputElem = e.target as HTMLInputElement;
    onChange(+inputElem.value);
  };
  return (
    <Form>
      <Label>달성률</Label>
      <RangeInput
        type="range"
        value={value}
        onChange={handleChangeMeter}
        max={100}
      />
      <Output>{value}%</Output>
    </Form>
  );
};

export default SuccessMeter;
