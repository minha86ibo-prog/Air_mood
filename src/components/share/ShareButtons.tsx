import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all ${({ theme }) => theme.transitions.bounce};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  background: ${({ theme, $primary }) => 
    $primary ? theme.colors.textPrimary : 'rgba(255, 255, 255, 0.6)'};
  color: ${({ theme, $primary }) => 
    $primary ? theme.colors.bgPrimary : theme.colors.textPrimary};
  border: 1px solid ${({ $primary }) => 
    $primary ? 'transparent' : 'rgba(255, 255, 255, 1)'};

  &:hover {
    transform: translateY(-2px);
    background: ${({ $primary }) => 
      $primary ? '#555' : 'rgba(255, 255, 255, 1)'};
  }
`;

interface ShareButtonsProps {
  onSave: () => void;
  onShare: () => void;
}

export function ShareButtons({ onSave, onShare }: ShareButtonsProps) {
  return (
    <Container>
      <Button onClick={onSave} aria-label="이미지 저장">
        <span>💾</span> 이미지 저장
      </Button>
      <Button $primary onClick={onShare} aria-label="공유하기">
        <span>🔗</span> 공유하기
      </Button>
    </Container>
  );
}
