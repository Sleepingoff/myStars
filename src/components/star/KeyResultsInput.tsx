import { listenerCount } from 'process';
import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useRef,
} from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import KeyResultsOutput, { ContentsType } from './KeyResultsOutput';

interface KeyResultsInputProps {
  list: ContentsType[];
  onChange: Dispatch<SetStateAction<ContentsType[]>>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    margin-bottom: auto;
  }
  & > :last-child {
    margin-top: 8px;
  }
`;

const KeyResultsInput = ({ list, onChange }: KeyResultsInputProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmitAdd: FormEventHandler = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const inputData = formData.get('keyResults') as string;

    onChange([
      ...list,
      {
        id: list.length,
        contents: inputData,
      },
    ]);
  };

  const handleClickDeleteKeyResults = () => {
    onChange([]);
  };

  return (
    <Container>
      <KeyResultsOutput outputs={list} />
      <Form
        style={{ flexWrap: 'wrap' }}
        ref={formRef}
        onSubmit={handleSubmitAdd}
      >
        <Input type="text" name="keyResults" />
        <Button type="submit">추가</Button>
        <Button type="reset" onClick={handleClickDeleteKeyResults}>
          모두 지우기
        </Button>
      </Form>
    </Container>
  );
};

export default KeyResultsInput;
