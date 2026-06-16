import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 700 !important;
  margin-bottom: 12px;
  color: #FFFFFF !important;
  letter-spacing: -0.5px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  background-color: rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(transparent, transparent 27px, rgba(255, 255, 255, 0.25) 27px);
  background-size: 100% 28px;
  background-attachment: local;
  background-position: 0 14px;
  line-height: 28px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px 16px;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 400;
  resize: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  }
`;

export function MemoInput() {
  const { state, dispatch } = useAppContext();

  return (
    <Container>
      <Label>특이사항 메모</Label>
      <TextArea
        placeholder="예) 마스크를 안 쓰고 나갔더니 목이 칼칼하다"
        value={state.diary.memo}
        onChange={(e) => dispatch({ type: 'SET_DIARY_MEMO', payload: e.target.value })}
        aria-label="특이사항 메모"
      />
    </Container>
  );
}
