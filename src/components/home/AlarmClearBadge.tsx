import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px ${({ theme }) => theme.spacing.md};
  background: rgba(200, 230, 201, 0.28);
  border: 1px solid rgba(147, 196, 152, 0.4);
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 13px;
  font-weight: 500;
  color: #4A7C59;
  letter-spacing: -0.1px;
  animation: softFadeIn 0.4s ease both;
`;

export function AlarmClearBadge() {
  const { state } = useAppContext();
  const { activeAlarms, clearedAlarms, region, source } = state.airData;

  if (source === 'mock' || activeAlarms.length > 0 || clearedAlarms.length > 0) {
    return null;
  }

  return (
    <Badge>
      <span>✅</span>
      <span>{region} — 현재 발령 중인 경보 없음</span>
    </Badge>
  );
}
