import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { getPm25Level } from '../../utils/airUtils';

const Grid = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const MiniBox = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
`;

const Value = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 300;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const Unit = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
`;

const StatusPill = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
`;

export function PmGrid() {
  const { state } = useAppContext();
  const { pm10, pm25 } = state.airData;

  const getFriendly = (lvl: string) => {
    if (lvl === 'good') return '깨끗';
    if (lvl === 'moderate') return '무난';
    if (lvl === 'bad') return '나쁨';
    return '매우 나쁨';
  };

  const pm10Level = pm10 !== null ? state.airLevel : 'good';
  const pm25Level = pm25 !== null ? getPm25Level(pm25) : state.airLevel;

  return (
    <Grid>
      <MiniBox>
        <Label>PM 10</Label>
        <ValueRow>
          <Value>{pm10 !== null ? pm10 : '—'}</Value>
          <Unit>µg/m³</Unit>
        </ValueRow>
        <StatusPill>{getFriendly(pm10Level)}</StatusPill>
      </MiniBox>

      <MiniBox>
        <Label>PM 2.5</Label>
        <ValueRow>
          <Value>{pm25 !== null ? pm25 : '—'}</Value>
          <Unit>µg/m³</Unit>
        </ValueRow>
        <StatusPill>{getFriendly(pm25Level)}</StatusPill>
      </MiniBox>
    </Grid>
  );
}
