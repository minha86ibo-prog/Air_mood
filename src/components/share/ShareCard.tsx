import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { AIR_LEVELS } from '../../constants/airLevels';
import { getTodayString } from '../../utils/dateUtils';

const Card = styled.div<{ $level: string }>`
  background: ${({ $level }) => {
    switch ($level) {
      case 'good': return 'linear-gradient(135deg, #BFDFFF 0%, #FFF9F2 100%)';
      case 'moderate': return 'linear-gradient(135deg, #D6D3D1 0%, #FFF9F2 100%)';
      case 'bad': return 'linear-gradient(135deg, #F3E7D9 0%, #D6D3D1 100%)';
      case 'veryBad': return 'linear-gradient(135deg, #EAD7D7 0%, #D6D3D1 100%)';
      default: return 'linear-gradient(135deg, #FFF9F2 0%, #FFF9F2 100%)';
    }
  }};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  aspect-ratio: 4/5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const DateText = styled.div`
  font-family: ${({ theme }) => theme.fonts.en};
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 24px;
  letter-spacing: 1px;
`;

const Emoji = styled.div`
  font-size: 72px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 32px;
`;

const UserMoodRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radius.full};
  backdrop-filter: blur(10px);
`;

const Watermark = styled.div`
  position: absolute;
  bottom: 24px;
  left: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.en};
  font-size: 11px;
  opacity: 0.5;
  letter-spacing: 2px;
  z-index: 1;
`;

export const ShareCard = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { state } = useAppContext();
  const { airLevel, diary, airData } = state;
  const moodEmoji = diary.moodEmoji || '☁️';
  
  return (
    <Card ref={ref} $level={airLevel}>
      <Content>
        <DateText>{getTodayString()}</DateText>
        <Emoji>{AIR_LEVELS[airLevel]?.emoji || '🌥️'}</Emoji>
        <Title>{airData.region} 공기 {AIR_LEVELS[airLevel]?.label || '보통'}</Title>
        <SubText>{AIR_LEVELS[airLevel]?.label || '보통'} 공기에 내 기분은</SubText>
        <UserMoodRow>
          <span>나의 기분</span>
          <span style={{ fontSize: '24px' }}>{moodEmoji}</span>
        </UserMoodRow>
      </Content>
      <Watermark>AIR MOOD DIARY</Watermark>
    </Card>
  );
});

ShareCard.displayName = 'ShareCard';
