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

const Overlay = styled.div<{ $bgUrl: string }>`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 24px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.25);
  }
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
  width: 100%;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #fff;
  margin-bottom: 24px;
  animation: softFadeIn 0.5s ease;
`;

const CapsuleRow = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const CapsuleText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.2px;
  text-align: center;
`;

const SecondaryPhotoBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const PhotoOverlay = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
  pointer-events: none;
`;

const MemoText = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.3px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  white-space: pre-wrap;
`;

const BottomMetaRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const MetaLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MoodEmoji = styled.div`
  font-size: 28px;
  margin-bottom: 4px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
`;

const GlassBadgeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const GlassBadge = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  letter-spacing: -0.2px;
`;

const ActionIconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
);

const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const ActionBtn = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 16px 0;
  background: ${props => props.$primary ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.$primary ? '#333333' : '#ffffff'};
  backdrop-filter: ${props => props.$primary ? 'none' : 'blur(10px)'};
  border: 1px solid ${props => props.$primary ? 'transparent' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 16px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.$primary ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};

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
  
  let bgUrl = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80'; 
  if (airLevel === 'moderate') {
    bgUrl = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80';
  } else if (airLevel === 'bad' || airLevel === 'veryBad') {
    bgUrl = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'; 
  }

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
    <Overlay $bgUrl={bgUrl} onClick={onClose}>
      <ModalContentWrapper onClick={e => e.stopPropagation()}>
        <CardContainer ref={cardRef}>
          <CapsuleRow>
            <CapsuleText>{airQuote}</CapsuleText>
          </CapsuleRow>
          
          <SecondaryPhotoBox>
            <PhotoOverlay />
            {memo && <MemoText>{memo}</MemoText>}
          </SecondaryPhotoBox>
          
          <BottomMetaRow>
            <MetaLeft>
              {mood && <MoodEmoji>{mood}</MoodEmoji>}
              <GlassBadgeRow>
                <GlassBadge>{isOuting ? '오늘 외출했어요 🌿' : '오늘은 집에서 쉬었어요 🏠'}</GlassBadge>
                <GlassBadge>{conditionText}</GlassBadge>
              </GlassBadgeRow>
            </MetaLeft>
            <ActionIconButton onClick={onClose}>
              <HeartIcon />
            </ActionIconButton>
          </BottomMetaRow>
        </CardContainer>
        
        <ActionRow>
          <ActionBtn onClick={onClose}>닫기</ActionBtn>
          <ActionBtn $primary onClick={handleSaveImage}>저장하기</ActionBtn>
        </ActionRow>
      </ModalContentWrapper>
    </Overlay>
  );
}
