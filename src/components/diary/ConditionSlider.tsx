import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LabelWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 700 !important;
  color: #2D3142 !important;
  letter-spacing: -0.5px;
  text-shadow: none;
`;

const Value = styled.span`
  font-family: ${({ theme }) => theme.fonts.en};
  font-size: 14px;
  font-weight: 500;
  color: #2D3142;
  text-shadow: none;
`;

const SliderWrap = styled.div`
  position: relative;
  padding: 10px 0;
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #8A9A86;
    border: 2px solid #FFFFFF;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s;
  }

  &::-webkit-slider-thumb:active {
    transform: scale(1.1);
  }
`;

const Progress = styled.div<{ $percent: number }>`
  position: absolute;
  top: 11px;
  left: 0;
  height: 2px;
  background: #8A9A86;
  border-radius: 1px;
  width: ${({ $percent }) => $percent}%;
  pointer-events: none;
`;

export function ConditionSlider() {
  const { state, dispatch } = useAppContext();
  const condition = state.diary.condition;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_DIARY_CONDITION', payload: parseInt(e.target.value, 10) });
  };

  return (
    <Container>
      <LabelWrap>
        <Label>신체 컨디션</Label>
        <Value>{condition}%</Value>
      </LabelWrap>
      <SliderWrap>
        <Progress $percent={condition} />
        <RangeInput
          type="range"
          min="0"
          max="100"
          step="5"
          value={condition}
          onChange={handleChange}
          aria-label="컨디션 조절"
        />
      </SliderWrap>
    </Container>
  );
}
