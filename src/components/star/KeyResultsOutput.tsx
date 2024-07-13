import styled from 'styled-components';

export type ContentsType = { id: number; contents: string };

interface KeyResultsOutputProps {
  outputs: ContentsType[];
}
const Ul = styled.ul`
  & > li {
    text-align: left;
  }
  margin-left: 1rem;
`;
const KeyResultsOutput = ({ outputs }: KeyResultsOutputProps) => {
  return (
    <Ul>
      {outputs.map((list) => {
        return <li key={list.id}>{list.contents}</li>;
      })}
    </Ul>
  );
};

export default KeyResultsOutput;
