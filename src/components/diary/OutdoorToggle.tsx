import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.span`
  font-size: 15px;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  letter-spacing: -0.5px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

const ToggleBtn = styled.button<{ $active: boolean }>`
  position: relative;
  width: 44px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ $active }) => 
    $active ? '#87A987' : 'rgba(255, 255, 255, 0.3)'};
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: background-color ${({ theme }) => theme.transitions.smooth};
`;

const Knob = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #FFFFFF;
  transform: translateX(${({ $active }) => ($active ? '22px' : '0')});
  transition: transform ${({ theme }) => theme.transitions.bounce};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export function OutdoorToggle() {
  const { state, dispatch } = useAppContext();
  const outdoor = state.diary.outdoor;

  return (
    <Container>
      <Label>오늘 외출하셨나요? 🚶</Label>
      <ToggleBtn 
        $active={outdoor} 
        onClick={() => dispatch({ type: 'SET_DIARY_OUTDOOR', payload: !outdoor })}
        aria-pressed={outdoor}
        aria-label="외출 여부 토글"
      >
        <Knob $active={outdoor} />
      </ToggleBtn>
    </Container>
  );
}
