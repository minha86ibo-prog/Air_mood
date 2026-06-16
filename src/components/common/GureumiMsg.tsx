import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0 32px 0;
  animation: fadeIn 0.5s ease;
`;

const Bubble = styled.div`
  background: white;
  padding: 16px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  font-size: 14px;
  color: #333333;
  font-weight: 500;
  text-align: center;
  position: relative;
  margin-bottom: 12px;
  max-width: 280px;
  line-height: 1.4;
  letter-spacing: -0.3px;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px 8px 0;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

const Image = styled.img`
  width: 120px;
  height: auto;
  cursor: pointer;
  mix-blend-mode: multiply; /* 가짜 투명도(체크무늬) 배경을 숨기기 위한 처리 */
  animation: bounce 2.5s infinite ease-in-out;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

interface Props {
  img: string;
  msg: string;
  onClick?: () => void;
}

export function GureumiMsg({ img, msg, onClick }: Props) {
  return (
    <Container onClick={onClick}>
    </Container>
  );
}
