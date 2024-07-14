'use client';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: #f7f7f7;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  max-width: 600px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #357ae8;
  }
`;

const HomePage = () => {
  return (
    <Container>
      <Title>My STARs에 오신 것을 환영합니다</Title>
      <Subtitle>
        STAR 기법을 사용하여 성과를 체계적으로 정리하고 공유하세요
      </Subtitle>
      <Description>
        <strong>S</strong>: Situation - 상황을 설명합니다.
        <br />
        <strong>T</strong>: Task - 수행한 과제를 설명합니다.
        <br />
        <strong>A</strong>: Action - 행동한 내용을 설명합니다.
        <br />
        <strong>R</strong>: Result - 그 결과를 설명합니다.
        <br />
        <br />
        STAR 기법은 경험과 성과를 효과적으로 전달하는 강력한 도구입니다. Google
        캘린더와 연동하여 성과를 추적하고 다른 사람들과 공유할 수 있습니다.
      </Description>
    </Container>
  );
};

export default HomePage;
