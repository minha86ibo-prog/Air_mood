import React, { useRef } from 'react';
import styled from 'styled-components';
import { Header } from '../components/common/Header';
import { ShareCard } from '../components/share/ShareCard';
import { ShareButtons } from '../components/share/ShareButtons';
import { useAppContext } from '../context/AppContext';
import { AIR_LEVELS } from '../constants/airLevels';
import html2canvas from 'html2canvas';

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;

const SubText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  text-align: center;
`;

export function SharePage() {
  const { state, showToast } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement('a');
      link.download = 'air-mood-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('이미지가 저장되었습니다! 📸');
    } catch (error) {
      showToast('이미지 저장에 실패했습니다.');
    }
  };

  const handleShare = () => {
    const levelLabel = AIR_LEVELS[state.airLevel]?.label || '보통';
    const shareText = `오늘 ${state.airData.region} 공기는 ${levelLabel}! AIR MOOD에서 오늘의 공기를 기록해보세요.`;

    if (navigator.share) {
      navigator.share({
        title: 'AIR MOOD DIARY',
        text: shareText,
        url: window.location.origin,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          showToast('공유에 실패했습니다.');
        }
      });
    } else {
      navigator.clipboard.writeText(window.location.origin).then(() => {
        showToast('링크가 클립보드에 복사되었습니다! 🔗');
      });
    }
  };

  return (
    <>
      <Header title="SHARE" showBack />
      <Container>
        <Title>오늘의 감성 카드</Title>
        <SubText>오늘의 공기와 내 기분을 공유해 보세요</SubText>
        
        <ShareCard ref={cardRef} />
        <ShareButtons onSave={handleSave} onShare={handleShare} />
      </Container>
    </>
  );
}
