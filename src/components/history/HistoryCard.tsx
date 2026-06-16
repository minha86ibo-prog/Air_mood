import React from 'react';
import styled from 'styled-components';
import type { DiaryEntry } from '../../types/diary.types';
import { AIR_LEVELS } from '../../constants/airLevels';

const PolaroidCard = styled.div`
  flex: 0 0 280px;
  aspect-ratio: 3 / 4;
  background: #FFFFFF;
  border: 8px solid #FFFFFF;
  border-bottom-width: 32px;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  scroll-snap-align: center;
  padding: 16px;
  display: flex;
  flex-direction: column;
  white-space: normal;
  transition: transform 0.3s ease;
  
  &:nth-child(even) { 
    transform: rotate(2deg); 
  }
  &:nth-child(odd) { 
    transform: rotate(-2deg); 
  }
`;

const CardPhoto = styled.div<{ $bgUrl: string }>`
  flex: 1;
  width: 100%;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);
  position: relative;
`;

const OverlayFade = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
  border-radius: 0 0 8px 8px;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const DateText = styled.span`
  font-family: ${({ theme }) => theme.fonts.en};
  font-size: 14px;
  font-weight: 700;
  color: #333333;
`;

const RegionText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

const BottomArea = styled.div`
  position: absolute;
  bottom: -28px;
  left: 0; right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: #777;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HistoryCard = React.forwardRef<HTMLDivElement, { entry: DiaryEntry }>(({ entry }, ref) => {
  let bgUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

  return (
    <PolaroidCard ref={ref}>
      <CardPhoto $bgUrl={bgUrl}>
        <OverlayFade />
        {entry.memo && (
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#fff', fontSize: '13px', textShadow: '0 1px 3px rgba(0,0,0,0.5)', lineHeight: 1.4 }}>
            {entry.memo}
          </div>
        )}
      </CardPhoto>
      
      <ContentRow>
        <InfoCol>
          <DateText>{entry.date}</DateText>
          <RegionText>📍 {entry.region}</RegionText>
        </InfoCol>
        
        <InfoCol style={{ alignItems: 'flex-end', gap: '4px' }}>
          <StatItem>
            {entry.moodEmoji} {AIR_LEVELS[entry.airLevel]?.label || '알 수 없음'}
          </StatItem>
        </InfoCol>
      </ContentRow>

      <BottomArea>
        <span style={{ fontSize: '11px' }}>{entry.outdoor ? '외출 🚶' : '방콕 🏠'}</span>
        <span style={{ fontSize: '11px' }}>컨디션 {entry.condition}%</span>
      </BottomArea>
    </PolaroidCard>
  );
});

HistoryCard.displayName = 'HistoryCard';
