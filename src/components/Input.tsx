import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'number';
  onChange?: ChangeEventHandler;
}

const CustomInput = styled.input`
  font-size: 1.2rem;
  margin: 4px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
`;

const Input = ({ type, onChange, ...props }: InputProps) => {
  const [value, setValue] = useState('');

  const handleChangeInput: ChangeEventHandler = (e) => {
    const inputElem = e.target as HTMLInputElement;
    setValue(inputElem.value);
    if (onChange) onChange(e);
  };
  return (
    <CustomInput
      {...props}
      value={value}
      type={type}
      onChange={handleChangeInput}
    />
  );
};

export default Input;
