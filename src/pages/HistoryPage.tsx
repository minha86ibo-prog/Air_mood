import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { HistoryEmpty } from '../components/history/HistoryEmpty';
import { HistoryCard } from '../components/history/HistoryCard';
import { useAppContext } from '../context/AppContext';
import html2canvas from 'html2canvas';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-image: url('/img/diary_bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
`;

const ContentZIndex = styled.div`
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GlassHeader = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 16px 20px;
  margin: 0 20px 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #3A3A3A;
  margin: 0;
`;

const ShareBtn = styled.button`
  font-size: 13px;
  font-weight: 600;
  color: #3A3A3A;
  background: rgba(255, 255, 255, 0.4);
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid rgba(0, 0, 0, 0.25);
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;

const ScrollTrack = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  gap: 24px;
  padding: 40px 20px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export function HistoryPage() {
  const { state, showToast } = useAppContext();
  const navigate = useNavigate();
  const history = [...state.history].reverse();
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleShare = async () => {
    if (!scrollTrackRef.current || cardsRef.current.length === 0) return;
    
    // Find active card index based on scroll position (width 280 + gap 24 = 304)
    const scrollLeft = scrollTrackRef.current.scrollLeft;
    let activeIndex = Math.round(scrollLeft / 304);
    if (activeIndex >= cardsRef.current.length) activeIndex = cardsRef.current.length - 1;
    
    const targetCard = cardsRef.current[activeIndex];
    if (!targetCard) return;

    try {
      showToast('이미지 생성 중... ⏳');
      // allow toast to render
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const canvas = await html2canvas(targetCard, { backgroundColor: null, scale: 2, useCORS: true });
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Blob failed');
        
        const file = new File([blob], 'air-mood-card.png', { type: 'image/png' });
        const shareData = {
          files: [file],
          title: 'AIR MOOD DIARY',
          text: '나의 감성 기록을 확인해 보세요!',
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          const link = document.createElement('a');
          link.download = 'air-mood-card.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          showToast('이미지가 저장되었습니다! 📸');
        }
      });
    } catch (error) {
      console.error(error);
      showToast('공유에 실패했습니다.');
    }
  };

  return (
    <PageWrapper>
      <ContentZIndex>
        <Header title="HISTORY" showBack textColor="#2C2C2C" />
        <Container>
          <GlassHeader>
            <Title>나의 기록 {history.length}장</Title>
            {history.length > 0 && (
              <ShareBtn onClick={handleShare}>공유하기</ShareBtn>
            )}
          </GlassHeader>
          
          {history.length === 0 ? (
            <HistoryEmpty />
          ) : (
            <ScrollTrack ref={scrollTrackRef}>
              {history.map((entry, index) => (
                <HistoryCard 
                  key={entry.date} 
                  entry={entry} 
                  ref={(el) => cardsRef.current[index] = el}
                />
              ))}
            </ScrollTrack>
          )}
        </Container>
      </ContentZIndex>
    </PageWrapper>
  );
}
