import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 8px;
  & > * {
    flex-shrink: 0;
    margin: 0;
  }
  width: 100%;
`;

export default Form;
