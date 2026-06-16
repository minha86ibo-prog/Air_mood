import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const EmptyEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #5A5550;
  opacity: 0.9;
  margin-bottom: 24px;
`;

const CtaButton = styled.button`
  background: #D8E2DC;
  color: #333333;
  border: none;
  border-radius: 24px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(216, 226, 220, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(216, 226, 220, 0.6);
  }
`;

export function HistoryEmpty() {
  const navigate = useNavigate();

  return (
    <EmptyState>
      <EmptyEmoji>📝</EmptyEmoji>
      <Title>아직 기록된 다이어리가 없어요</Title>
      <SubText>오늘의 공기와 기분을 기록해 보세요</SubText>
      <CtaButton onClick={() => navigate('/diary')}>
        첫 기록 남기기 ✎
      </CtaButton>
    </EmptyState>
  );
}
