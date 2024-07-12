import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';
interface CardProps {
  children: ReactNode;
  title?: string;
  style?: CSSProperties;
}
const CustomCard = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 32px 16px;
  margin: 4px;
  margin-top: 1.5em;
`;

const CardTitle = styled.span`
  position: absolute;
  top: -1em;
  border-radius: 99999px;
  background-color: pink;
  padding: 0.5em 1em;
`;

const Card = ({ children, style, title }: CardProps) => {
  return (
    <CustomCard style={style}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </CustomCard>
  );
};

export default Card;
