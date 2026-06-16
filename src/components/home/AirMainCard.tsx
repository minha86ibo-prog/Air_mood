import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const LIFESTYLE_COPY: Record<string, {
  poem: string;
  outfit: string;
  mask: string;
}> = {
  good: {
    poem: "🌿 맑고 숨쉬기 편안한 하루예요.\n기분 좋게 밖을 거닐어 보세요.\n가벼운 옷차림을 추천합니다.",
    outfit: "가벼운 겉옷",
    mask: "마스크 불필요"
  },
  moderate: {
    poem: "🌿 오늘의 공기는 차분하고 부드러워요.\n가벼운 산책을 즐기기 좋은 날입니다.\n포근한 가디건을 걸쳐보세요.",
    outfit: "가디건 · 셔츠",
    mask: "마스크 불필요"
  },
  bad: {
    poem: "🌫️ 공기가 조금 무겁게 느껴지는 날이에요.\n따뜻한 차 한 잔의 여유는 어떨까요?\n외출 시 마스크를 꼭 챙겨주세요.",
    outfit: "따뜻한 겉옷",
    mask: "마스크 권장"
  },
  veryBad: {
    poem: "🏠 바깥 공기가 많이 답답한 날이에요.\n포근한 실내에서 머무는 것을 추천해요.\n외출 시 KF94 마스크가 필수입니다.",
    outfit: "실내 활동",
    mask: "KF94 필수"
  }
};

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 28px;
  padding: 40px 24px 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const PoemText = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.6;
  white-space: pre-line;
  letter-spacing: -0.2px;
  text-align: center;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const BoxRow = styled.div`
  display: flex;
  gap: 12px;
`;

const InfoBox = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const IconWrap = styled.div`
  color: #FFFFFF;
`;

const InfoText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
`;

const ShirtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a8.96 8.96 0 01-4 1 8.96 8.96 0 01-4-1L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
  </svg>
);

const MaskIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="10" rx="3"/><path d="M3 12h18M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/>
  </svg>
);

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: -12px;
`;

const WeatherIconWrap = styled.div`
  color: #FFFFFF;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
`;

const TemperatureGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentTemp = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const HighLowTemp = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 6px;
`;

const SunIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.2)"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

export function AirMainCard() {
  const { state } = useAppContext();
  const level = state.airLevel;
  const copy = LIFESTYLE_COPY[level] || LIFESTYLE_COPY.good;

  // Mocked live weather data for visual consistency
  return (
    <Card>
      <WeatherContainer>
        <WeatherIconWrap>
          <SunIcon />
        </WeatherIconWrap>
        <TemperatureGroup>
          <CurrentTemp>24°C</CurrentTemp>
          <HighLowTemp>↓ 18° / ↑ 29°</HighLowTemp>
        </TemperatureGroup>
      </WeatherContainer>

      <PoemText>{copy.poem}</PoemText>
      
      <BoxRow>
        <InfoBox>
          <IconWrap><ShirtIcon /></IconWrap>
          <InfoText>{copy.outfit}</InfoText>
        </InfoBox>
        <InfoBox>
          <IconWrap><MaskIcon /></IconWrap>
          <InfoText>{copy.mask}</InfoText>
        </InfoBox>
      </BoxRow>
    </Card>
  );
}
