import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

interface PhotoCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  airLevel: string;
  region: string;
  isOuting: boolean;
  condition: number;
  memo: string;
  mood?: string;
  customMood?: string;
  customActivity?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #F4F1EA; /* Premium clean background texturing */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 24px;
`;

const ModalContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const CardContainer = styled.div`
  width: 90%;
  max-width: 360px;
  aspect-ratio: 3 / 4;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 28px;
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.15);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 24px;
  animation: softFadeIn 0.5s ease;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const CapsuleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CapsuleText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #4A3525;
  letter-spacing: -0.2px;
  text-align: center;
  text-shadow: none;
`;

const OceanPhotoContainer = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 16px;
  margin: 16px auto;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const OceanImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const QuoteTrack = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  padding: 12px 16px;
  box-sizing: border-box;
`;

const QuoteText = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.4;
  letter-spacing: -0.2px;
  text-align: left;
  white-space: pre-wrap;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const MoodEmoji = styled.div`
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  margin-bottom: 4px;
`;

const GlassBadgeRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;

const GlassBadge = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: #4A3525;
  font-weight: 600;
  letter-spacing: -0.2px;
  text-shadow: none;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const ActionBtn = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 16px 0;
  background: ${props => props.$primary ? '#2D3142' : 'rgba(255, 255, 255, 0.6)'};
  color: ${props => props.$primary ? '#ffffff' : '#2D3142'};
  backdrop-filter: ${props => props.$primary ? 'none' : 'blur(10px)'};
  border: 1px solid ${props => props.$primary ? 'transparent' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 16px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.$primary ? '0 4px 12px rgba(45,49,66,0.2)' : '0 4px 12px rgba(142,168,189,0.1)'};

  &:hover {
    transform: translateY(-2px);
  }
`;

export function PhotoCardModal({ isOpen, onClose, airLevel, region, isOuting, condition, memo, mood, customMood, customActivity }: PhotoCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = () => {
    if (!cardRef.current) return;
    
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(cardRef.current!, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        
        const date = new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        link.download = `AirMood_Card_${yyyy}${mm}${dd}.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Failed to capture image:", err);
      }
    }, 100);
  };

  if (!isOpen) return null;
  
  let conditionText = '컨디션 보통 🙂';
  if (condition > 66) conditionText = '컨디션 좋음 ✨';
  else if (condition < 33) conditionText = '컨디션 저조 💤';

  let airQuote = `오늘 ${region} 공기는 맑음 그 자체예요 🌿`;
  if (airLevel === 'moderate') {
    airQuote = `오늘 ${region} 공기는 무난함 그 자체예요 🌿`;
  } else if (airLevel === 'bad' || airLevel === 'veryBad') {
    airQuote = `오늘 ${region} 공기는 조금 탁해요 😷`;
  }

  return (
    <Overlay onClick={onClose}>
      <ModalContentWrapper onClick={e => e.stopPropagation()}>
        <CardContainer ref={cardRef}>
          <TopSection>
            <CapsuleRow>
              <CapsuleText>{airQuote}</CapsuleText>
            </CapsuleRow>
          </TopSection>
          
          <OceanPhotoContainer>
            <OceanImage src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Ocean Sunset" />
            <QuoteTrack>
              <QuoteText>{memo || "날씨가 좋아서 기분이 좋아"}</QuoteText>
            </QuoteTrack>
          </OceanPhotoContainer>
          
          <BottomSection>
            <MoodEmoji>{customMood || mood}</MoodEmoji>
            <GlassBadgeRow>
              <GlassBadge>{customActivity || (isOuting ? '오늘 외출했어요 🌿' : '집에서 쉬었어요 🏠')}</GlassBadge>
              <GlassBadge>{conditionText}</GlassBadge>
            </GlassBadgeRow>
          </BottomSection>
        </CardContainer>
        
        <ActionRow>
          <ActionBtn onClick={onClose}>닫기</ActionBtn>
          <ActionBtn $primary onClick={handleSaveImage}>저장하기</ActionBtn>
        </ActionRow>
      </ModalContentWrapper>
    </Overlay>
  );
}
