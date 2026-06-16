import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { getTodayString } from '../../utils/dateUtils';

const LocationSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Bar = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 28px;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: left;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.72;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  letter-spacing: -0.03em;
`;

const Chevron = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.7;
  margin-left: -2px;
`;

const DateText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.4px;
`;

export function LocationBar() {
  const { state, dispatch } = useAppContext();

  return (
    <Bar onClick={() => dispatch({ type: 'OPEN_CITY_MODAL' })} aria-label="지역 선택하기" title="클릭하여 지역 변경">
      <Info>
        <IconWrap><LocationSvg /></IconWrap>
        <Name>{state.airData.region}</Name>
        <Chevron>▾</Chevron>
      </Info>
      <DateText>{getTodayString()}</DateText>
    </Bar>
  );
}
