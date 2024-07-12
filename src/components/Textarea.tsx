import React, { ChangeEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface CustomTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
}

const Textarea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 1.2em;
  color: #333;
  line-height: 1.5;
  flex-basis: 100%;
  text-align: left;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  value,
  onChange,
  placeholder,
  style,
}) => {
  const textareaRef = useRef(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current as HTMLTextAreaElement;
    textarea.style.height = textarea.scrollHeight + 'px';
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default CustomTextarea;
