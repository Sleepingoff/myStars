'use client';

import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  & > :last-child {
    flex-basis: 70%;
  }
  & > :first-child {
    flex-basis: 30%;
  }
`;

export default FlexBox;
