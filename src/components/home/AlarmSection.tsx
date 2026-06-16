import React from 'react';
import styled from 'styled-components';
import { AlarmCard } from './AlarmCard';
import { useAppContext } from '../../context/AppContext';

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  animation: softFadeIn 0.4s ease both;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #C17A4A;
  letter-spacing: 0.3px;
`;

const Badge = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.8px;
  padding: 3px 10px;
  background: rgba(193, 122, 74, 0.10);
  border: 1px solid rgba(193, 122, 74, 0.25);
  border-radius: ${({ theme }) => theme.radius.full};
  color: #C17A4A;
  text-transform: uppercase;
`;

export function AlarmSection() {
  const { state } = useAppContext();
  const { activeAlarms, clearedAlarms } = state.airData;

  if (activeAlarms.length === 0 && clearedAlarms.length === 0) {
    return null;
  }

  return (
    <Section>
      <Header>
        <Label>🚨 미세먼지 경보 발령 현황</Label>
        <Badge>에어코리아</Badge>
      </Header>
      <div>
        {activeAlarms.map((alarm, idx) => (
          <AlarmCard key={`active-${idx}`} alarm={alarm} isActive={true} />
        ))}
        {clearedAlarms.slice(0, 3).map((alarm, idx) => (
          <AlarmCard key={`cleared-${idx}`} alarm={alarm} isActive={false} />
        ))}
      </div>
    </Section>
  );
}
