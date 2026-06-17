import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { getTodayString } from '../../utils/dateUtils';
import { SIDO_LIST } from '../../constants/sidoList';

const LocationSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 28px;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledSelect = styled.select`
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 4px 24px 4px 10px;
  font-size: 17px;
  font-weight: 700;
  color: #4A3525;
  cursor: pointer;
  outline: none;
  
  option {
    color: #4A3525;
    background: white;
  }
`;

const Chevron = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  color: #4A3525;
  pointer-events: none;
`;

const DateText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.4px;
`;

export function LocationBar() {
  const { state, dispatch, loadAirData } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const sido = SIDO_LIST.find(s => s.code === code);
    if (sido) {
      dispatch({ type: 'SET_SIDO', payload: sido });
      loadAirData(sido);
    }
  };

  return (
    <Bar>
      <Info>
        <IconWrap><LocationSvg /></IconWrap>
        <SelectWrapper>
          <StyledSelect value={state.selectedSido.code} onChange={handleChange} aria-label="지역 선택">
            {SIDO_LIST.map(sido => (
              <option key={sido.code} value={sido.code}>{sido.name}</option>
            ))}
          </StyledSelect>
          <Chevron>▾</Chevron>
        </SelectWrapper>
      </Info>
      <DateText>{getTodayString()}</DateText>
    </Bar>
  );
}
