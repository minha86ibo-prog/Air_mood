import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #FFF9F2 0%, #EFE9E2 100%);
`;

const LogoWrap = styled.div`
  text-align: center;
  animation: pulse 2.5s ease-in-out infinite;
`;

const Emoji = styled.div`
  font-size: 72px;
  margin-bottom: 24px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.05));
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.en};
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 6px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.kr};
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 2px;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 40px;

  span {
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 50%;
    animation: dotBounce 1.4s infinite ease-in-out both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
`;

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <LogoWrap>
        <Emoji>☁️</Emoji>
        <Title>AIR MOOD</Title>
        <Subtitle>오늘의 공기, 그리고 내 기분</Subtitle>
      </LogoWrap>
      <LoadingDots>
        <span /><span /><span />
      </LoadingDots>
    </Container>
  );
}
