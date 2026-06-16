import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import type { MoodOption } from '../../types/diary.types';

const MOODS: MoodOption[] = [
  { mood: 'very_good', emoji: '😆' },
  { mood: 'good', emoji: '🙂' },
  { mood: 'soso', emoji: '😐' },
  { mood: 'bad', emoji: '☹️' },
  { mood: 'very_bad', emoji: '😫' },
];

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 700 !important;
  margin-bottom: 16px;
  color: #2D3142 !important;
  letter-spacing: -0.5px;
  text-shadow: none;
`;

const MoodGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: nowrap;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 4px;
`;

const MoodBtn = styled.button<{ $selected: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $selected }) => 
    $selected ? 'rgba(255, 255, 255, 0.55) !important' : 'transparent'};
  border: ${({ $selected }) => 
    $selected ? '1px solid rgba(255, 255, 255, 0.4) !important' : 'none'};
  font-size: 28px;
  transition: all ${({ theme }) => theme.transitions.bounce};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  ${({ $selected }) => $selected && `
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
    transform: scale(1.1);
  `}

  &:hover {
    transform: ${({ $selected }) => $selected ? 'scale(1.1)' : 'scale(1.05)'};
    background: ${({ $selected }) => 
      $selected ? 'rgba(255, 255, 255, 0.55) !important' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

export function MoodSelector() {
  const { state, dispatch } = useAppContext();
  const currentMood = state.diary.mood;

  const handleSelect = (mood: string, emoji: string) => {
    dispatch({ type: 'SET_DIARY_MOOD', payload: { mood, moodEmoji: emoji } });
  };

  return (
    <Container>
      <Label>오늘의 기분은 어때요?</Label>
      <MoodGrid>
        {MOODS.map(({ mood, emoji }) => (
          <MoodBtn
            key={mood}
            $selected={currentMood === mood}
            onClick={() => handleSelect(mood, emoji)}
            aria-label={`${mood} 기분 선택`}
            aria-pressed={currentMood === mood}
          >
            {emoji}
          </MoodBtn>
        ))}
      </MoodGrid>
    </Container>
  );
}
