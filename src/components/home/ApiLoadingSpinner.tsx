import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 11px ${({ theme }) => theme.spacing.md};
  background: rgba(255, 254, 251, 0.75);
  border: 1px solid rgba(210, 200, 188, 0.5);
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 10px rgba(180, 160, 140, 0.07);
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(193, 122, 74, 0.2);
  border-top-color: #C17A4A;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  flex-shrink: 0;
`;

const Text = styled.span`
  font-size: 13px;
  color: #9A908A;
  letter-spacing: -0.1px;
`;

export function ApiLoadingSpinner() {
  return (
    <Wrapper aria-live="polite">
      <Spinner />
      <Text>공기 데이터를 불러오는 중이에요...</Text>
    </Wrapper>
  );
}
