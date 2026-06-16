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
}

function getBackdropGradient(airLevel: string) {
  if (airLevel === 'veryBad') return 'linear-gradient(148deg, #EDEAE6 0%, #DEDAD4 55%, #CECAC2 100%)';
  if (airLevel === 'bad') return 'linear-gradient(148deg, #EDF4EE 0%, #D8EADA 55%, #C4DCC6 100%)';
  if (airLevel === 'moderate') return 'linear-gradient(148deg, #FAF6EE 0%, #F0E8D4 55%, #E4D5B4 100%)';
  return 'linear-gradient(148deg, #FBF8F2 0%, #F5EBD8 55%, #EDD9B8 100%)';
}

const Overlay = styled.div<{ $gradient: string }>`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: ${props => props.$gradient};
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
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 28px;
  box-shadow: 0 12px 40px 0 rgba(142, 168, 189, 0.15);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  color: #2D3142;
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
  background: rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(142, 168, 189, 0.1);
`;

const CapsuleText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #2D3142;
  letter-spacing: -0.2px;
  text-align: center;
`;

const MiddleQuoteBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 16px;
`;

const QuoteText = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #2D3142;
  line-height: 1.6;
  letter-spacing: -0.2px;
  text-align: center;
  white-space: pre-wrap;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const MoodEmoji = styled.div`
  font-size: 32px;
  filter: drop-shadow(0 4px 8px rgba(142, 168, 189, 0.2));
`;

const GlassBadgeRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const GlassBadge = styled.div`
  background: rgba(45, 49, 66, 0.05);
  border: 1px solid rgba(45, 49, 66, 0.1);
  border-radius: 20px;
  padding: 6px 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: #2D3142;
  font-weight: 600;
  letter-spacing: -0.2px;
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

export function PhotoCardModal({ isOpen, onClose, airLevel, region, isOuting, condition, memo, mood }: PhotoCardModalProps) {
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
  
  const backdropGradient = getBackdropGradient(airLevel);

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
    <Overlay $gradient={backdropGradient} onClick={onClose}>
      <ModalContentWrapper onClick={e => e.stopPropagation()}>
        <CardContainer ref={cardRef}>
          <TopSection>
            <CapsuleRow>
              <CapsuleText>{airQuote}</CapsuleText>
            </CapsuleRow>
            {mood && <MoodEmoji>{mood}</MoodEmoji>}
          </TopSection>
          
          <MiddleQuoteBox>
            <QuoteText>{memo || "산들바람처럼 가볍게 입어요."}</QuoteText>
          </MiddleQuoteBox>
          
          <BottomSection>
            <GlassBadgeRow>
              <GlassBadge>{isOuting ? '오늘 외출했어요 🌿' : '집에서 쉬었어요 🏠'}</GlassBadge>
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
