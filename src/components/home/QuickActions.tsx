import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const ActionRowBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 20px 24px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrap = styled.div`
  color: #FFFFFF;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #FFFFFF;
`;

const Subtitle = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  color: #8C8C8C;
`;

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);

const ShirtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a8.96 8.96 0 01-4 1 8.96 8.96 0 01-4-1L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
);

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ActionRowBtn onClick={() => navigate('/recommend')}>
        <LeftWrap>
          <IconWrap><ShirtIcon /></IconWrap>
          <TextWrap>
            <Title>외출 · 의상 추천</Title>
          </TextWrap>
        </LeftWrap>
        <ArrowIcon />
      </ActionRowBtn>

      <ActionRowBtn onClick={() => navigate('/diary')}>
        <LeftWrap>
          <IconWrap><CameraIcon /></IconWrap>
          <TextWrap>
            <Title>감성카드 만들기</Title>
          </TextWrap>
        </LeftWrap>
        <ArrowIcon />
      </ActionRowBtn>
    </Wrapper>
  );
}
