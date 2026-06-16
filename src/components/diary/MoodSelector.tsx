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
  gap: 12px;
`;

const MoodBtn = styled.button<{ $selected: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ $selected }) => 
    $selected ? '#B88A8A !important' : 'transparent'};
  border: none;
  font-size: 28px;
  transition: all ${({ theme }) => theme.transitions.bounce};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  ${({ $selected }) => $selected && `
    box-shadow: 
      inset 0 0 10px rgba(0,0,0,0.1), 
      0 4px 10px rgba(184, 138, 138, 0.4) !important;
    transform: scale(1.1);
  `}

  &:hover {
    transform: ${({ $selected }) => $selected ? 'scale(1.1)' : 'scale(1.05)'};
    background-color: ${({ $selected }) => 
      $selected ? '#B88A8A !important' : 'rgba(255, 255, 255, 0.1)'};
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
