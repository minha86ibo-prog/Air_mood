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

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #E2EFF9 0%, #F3F8FC 45%, #FFFFFF 100%);
  position: relative;
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
  color: #2D3142 !important;
  text-align: center;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #2D3142;
  margin-bottom: 16px;
  line-height: 1.5;
  text-align: center;
`;

const SummaryBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  color: #2D3142;
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin: 0 auto 24px;
  box-shadow: 0 2px 8px rgba(142, 168, 189, 0.1);
  width: fit-content;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 28px;
  box-shadow: 0 10px 35px rgba(142, 168, 189, 0.12);
  width: 92%;
  max-width: 380px;
  margin: 16px auto 24px;
  padding: 24px;
  box-sizing: border-box;
`;

const SaveBtn = styled.button`
  width: 90%;
  margin: 8px auto 24px;
  display: block;
  padding: 18px;
  background-color: #2D3142 !important;
  color: #FFFFFF !important;
  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: 16px;
  font-weight: 700 !important;
  transition: all ${({ theme }) => theme.transitions.bounce};
  box-shadow: 0 4px 15px rgba(45, 49, 66, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(45, 49, 66, 0.3);
    background: #1A1D28 !important;
  }

  &:disabled {
    background: rgba(45, 49, 66, 0.1) !important;
    color: rgba(45, 49, 66, 0.4) !important;
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

  return (
    <PageWrapper>
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
