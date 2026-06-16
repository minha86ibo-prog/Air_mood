import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { MoodSelector } from '../components/diary/MoodSelector';
import { ConditionSlider } from '../components/diary/ConditionSlider';
import { OutdoorToggle } from '../components/diary/OutdoorToggle';
import { MemoInput } from '../components/diary/MemoInput';
import { useAppContext } from '../context/AppContext';
import { getTodayKey } from '../utils/dateUtils';
import type { DiaryEntry } from '../types/diary.types';
import { PhotoCardModal } from '../components/diary/PhotoCardModal';

const PageWrapper = styled.div<{ $bgUrl: string }>`
  min-height: 100vh;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 0;
    pointer-events: none;
  }
`;

const ContentZIndex = styled.div`
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700 !important;
  margin-bottom: 8px;
  color: #FFFFFF !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
`;

const SubText = styled.p`
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 16px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const SummaryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: #FFFFFF;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 32px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
`;

const SaveBtn = styled.button`
  width: 100%;
  padding: 18px;
  background-color: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  color: #FFFFFF !important;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: 16px;
  font-weight: 700 !important;
  margin-top: 8px;
  margin-bottom: 24px;
  transition: all ${({ theme }) => theme.transitions.bounce};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.3) !important;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.05) !important;
    color: rgba(255, 255, 255, 0.5) !important;
    border-color: rgba(255, 255, 255, 0.1);
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export function DiaryPage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const isComplete = !!state.diary.mood;
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const handleSave = () => {
    if (!isComplete) return;

    const entry: DiaryEntry = {
      date: getTodayKey(),
      airLevel: state.airLevel,
      pm10: state.airData.pm10,
      pm25: state.airData.pm25,
      mood: state.diary.mood!,
      moodEmoji: state.diary.moodEmoji!,
      condition: state.diary.condition,
      outdoor: state.diary.outdoor,
      memo: state.diary.memo,
      region: state.airData.region,
      savedAt: new Date().toISOString(),
    };

    dispatch({ type: 'SAVE_DIARY', payload: entry });
    setIsCardModalOpen(true);
  };

  let bgUrl = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80';
  if (state.airLevel === 'moderate') {
    bgUrl = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80';
  } else if (state.airLevel === 'bad' || state.airLevel === 'veryBad') {
    bgUrl = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80';
  }

  return (
    <PageWrapper $bgUrl={bgUrl}>
      <ContentZIndex>
        <Header title="AIR DIARY" showBack />
        <Container>
          <Title>오늘의 공기와 내 기분</Title>
          <SubText>오늘의 기분과 날씨를 기록하면, 하나뿐인 감성 피드 카드가 발행돼요! 📸</SubText>
          <SummaryBadge>
            {state.airData.region} 실시간 미세먼지 {state.airData.pm10}µg/m³ · 초미세먼지 {state.airData.pm25}µg/m³
          </SummaryBadge>
          
          <FormContainer>
            <MoodSelector />
            <ConditionSlider />
            <OutdoorToggle />
            <MemoInput />
          </FormContainer>
          
          <SaveBtn 
            disabled={!isComplete} 
            onClick={handleSave}
          >
            나만의 감성 카드 만들기 ✨
          </SaveBtn>
        </Container>

        <PhotoCardModal 
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          airLevel={state.airLevel}
          region={state.airData.region}
          isOuting={state.diary.outdoor}
          condition={state.diary.condition}
          memo={state.diary.memo}
          mood={state.diary.moodEmoji || ''}
        />
      </ContentZIndex>
    </PageWrapper>
  );
}
