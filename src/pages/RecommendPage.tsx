import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/common/Header';
import { useAppContext } from '../context/AppContext';

const PageWrapper = styled.div<{ $bgUrl: string }>`
  min-height: 100vh;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
`;

const ContentZIndex = styled.div`
  position: relative;
  z-index: 1;
`;



const Container = styled.div`
  padding: 0 24px 32px 24px;
  display: flex;
  flex-direction: column;
`;

const WeatherOverlay = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const TempText = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 64px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 16px;
`;

const WeatherMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const LocationText = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.5px;
`;

const WeatherDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
  opacity: 0.95;
`;

const LookbookContainer = styled.div`
  width: 90%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  margin: 16px auto 32px auto;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  position: relative;
  z-index: 2;
  animation: softFadeIn 0.5s ease;
`;

const LookbookImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const AccessoriesBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  animation: softFadeIn 0.6s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.05);
`;

const AccItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const AccIcon = styled.div`
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const AccLabel = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #FFFFFF;
  letter-spacing: -0.2px;
`;

const SunIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const ThinLineShirtIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a8.96 8.96 0 01-4 1 8.96 8.96 0 01-4-1L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
  </svg>
);

const ThinLineMaskIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="10" rx="3"/><path d="M3 12h18M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/>
  </svg>
);

const ThinLineSunGlassesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="15" r="4"/>
    <circle cx="18" cy="15" r="4"/>
    <path d="M14 15a2 2 0 00-4 0M2.5 13L5 7c.7-1.4 1.4-2 4-2h6c2.6 0 3.3.6 4 2l2.5 6"/>
  </svg>
);

export function RecommendPage() {
  const { state } = useAppContext();
  const region = state.airData.region;

  // Enforce consistent Luminous Sky Blue Background & Cardigan Outfit Mapping
  const bgUrl = 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80';
  const lookbookUrl = 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80';

  return (
    <PageWrapper $bgUrl={bgUrl}>
      <ContentZIndex>
        <Header title="AIR MOOD" showBack />
        <Container>
          <WeatherOverlay>
            <TempText>24°C</TempText>
            <WeatherMeta>
              <SunIcon />
              <LocationText>{region}</LocationText>
            </WeatherMeta>
            <WeatherDesc>맑고 청량한 바람이 부는 날.<br/>느긋하게 골든 아워를 즐겨보는 건 어떨까요?</WeatherDesc>
          </WeatherOverlay>
          
          <LookbookContainer>
            <LookbookImg src={lookbookUrl} alt="Outfit Lookbook" />
          </LookbookContainer>
          
          <AccessoriesBox>
            <AccItem>
              <AccIcon><ThinLineShirtIcon /></AccIcon>
              <AccLabel>가벼운 아우터</AccLabel>
            </AccItem>
            <AccItem>
              <AccIcon><ThinLineSunGlassesIcon /></AccIcon>
              <AccLabel>선글라스</AccLabel>
            </AccItem>
            <AccItem>
              <AccIcon><ThinLineMaskIcon /></AccIcon>
              <AccLabel>기본 마스크</AccLabel>
            </AccItem>
          </AccessoriesBox>
        </Container>
      </ContentZIndex>
    </PageWrapper>
  );
}
