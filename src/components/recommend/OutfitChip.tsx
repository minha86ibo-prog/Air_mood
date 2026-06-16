import React from 'react';
import styled from 'styled-components';

const Chip = styled.span<{ $highlight: boolean }>`
  display: inline-block;
  padding: 8px 16px;
  background: #FFF9F2;
  border: 1px solid #EAE0D5;
  color: ${({ $highlight }) => 
    $highlight ? '#78350F' : '#5A5550'};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 13px;
  font-weight: ${({ $highlight }) => ($highlight ? 600 : 400)};
  margin: 0 8px 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

interface OutfitChipProps {
  label: string;
  highlight: boolean;
}

export function OutfitChip({ label, highlight }: OutfitChipProps) {
  return <Chip $highlight={highlight}>{label}</Chip>;
}
