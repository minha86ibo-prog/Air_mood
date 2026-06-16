import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightSlot?: ReactNode;
  textColor?: string;
}

const HeaderWrapper = styled.header<{ $textColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  height: 60px;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: ${({ theme }) => theme.zIndex.header};
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: ${({ $textColor }) => $textColor || '#FFFFFF'};
`;

const BackButton = styled.button<{ $textColor?: string }>`
  background: none;
  border: none;
  color: ${({ $textColor }) => $textColor || '#FFFFFF'};
  font-size: 20px;
  padding: 8px;
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.en};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const RightSlot = styled.div`
  min-width: 40px; /* To balance the back button if it exists */
  display: flex;
  justify-content: flex-end;
`;

export function Header({ title, showBack = false, rightSlot, textColor }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper $textColor={textColor}>
      {showBack ? (
        <BackButton $textColor={textColor} onClick={() => navigate(-1)} aria-label="뒤로가기">
          ←
        </BackButton>
      ) : (
        <div style={{ width: '40px' }} />
      )}
      <Title>{title}</Title>
      <RightSlot>{rightSlot}</RightSlot>
    </HeaderWrapper>
  );
}
