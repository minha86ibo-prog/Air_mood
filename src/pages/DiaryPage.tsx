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
  background-image: url('/img/diary_bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Ensures the high-end fabric grain stays steady during scroll */
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
  color: #3A3F58; /* Premium, high-contrast deep charcoal tone */
  font-weight: 500; /* Medium thickness for robust readability */
  letter-spacing: -0.2px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-bottom: 16px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
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
  background: transparent;
  border: none;
  box-shadow: none;
  width: 92%;
  max-width: 380px;
  margin: 16px auto 24px;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px; /* Space out the floating modules */
`;

const StickerSection = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  box-shadow: none;
  padding: 24px;
`;

const StickerTitle = styled.h3`
  font-size: 15px;
  font-weight: 700 !important;
  color: #2D3142 !important;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`;

const StickerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const StickerBtn = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#2D3142' : 'rgba(255, 255, 255, 0.6)'};
  color: ${props => props.$active ? '#ffffff' : '#2D3142'};
  border: 1px solid ${props => props.$active ? '#2D3142' : 'rgba(255, 255, 255, 0.8)'};
  padding: 8px 14px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.$active ? '0 4px 10px rgba(45,49,66,0.2)' : '0 2px 6px rgba(142,168,189,0.1)'};
  
  &:hover {
    transform: translateY(-1px);
    background: ${props => props.$active ? '#1A1D28' : 'rgba(255, 255, 255, 0.9)'};
  }
`;

const SaveBtn = styled.button`
  width: 90%;
  margin: 8px auto 24px;
  display: block;
  padding: 18px;
  background: rgba(255, 255, 255, 0.65) !important; /* Elegant translucent white track */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 30px; /* Clean premium rounded pill shape */
  
  /* Typography Contrast Rule */
  color: #2D3142 !important; /* Strict deep charcoal text color for perfect readability */
  font-weight: 700 !important;
  letter-spacing: -0.3px;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.8) !important;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.25) !important;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: rgba(45, 49, 66, 0.4) !important;
    transform: none;
    cursor: not-allowed;
  }
`;

function getPmLabel(type: 'pm10' | 'pm25', value: number) {
  if (type === 'pm25') {
    if (value <= 15) return '좋음 ✨';
    if (value <= 35) return '보통 🌿';
    return '나쁨 😷';
  } else {
    if (value <= 30) return '좋음 ✨';
    if (value <= 80) return '보통 🌿';
    return '나쁨 😷';
  }
}

export function DiaryPage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const isComplete = !!state.diary.mood;
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const [customMood, setCustomMood] = useState('😊');
  const [customActivity, setCustomActivity] = useState('🌿 (Nature Walk)');

  const moodOptions = ['😊', '😆', '😐', '😴', '😾'];
  const activityOptions = ['🏠 (Stay Home)', '☕ (Cafe)', '🌿 (Nature Walk)', '🏃 (Workout)'];

  // Mock weather state — in a real app this comes from a weather API
  const weatherLevel = 'sunny'; // Try changing to 'rainy' or 'cloudy'

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
          <SubText>기분과 날씨를 기록하고, 나만의 감성 카드를 발행해 보세요!</SubText>
          <SummaryBadge>
            {state.airData.region} 미세먼지 {getPmLabel('pm10', state.airData.pm10)} / 초미세먼지 {getPmLabel('pm25', state.airData.pm25)}
          </SummaryBadge>
          
          <FormContainer>
            <MoodSelector />
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
          customMood={customMood}
          customActivity={customActivity}
          weatherLevel={weatherLevel}
        />
      </ContentZIndex>
    </PageWrapper>
  );
}
