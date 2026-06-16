import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { SIDO_LIST } from '../../constants/sidoList';

const Backdrop = styled.div<{ $open: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: ${({ theme }) => theme.zIndex.backdrop};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity ${({ theme }) => theme.transitions.smooth};
`;

const ModalContainer = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(100%)')};
  width: 100%;
  max-width: 430px; /* Match AppContainer max-width */
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGlass};
  z-index: ${({ theme }) => theme.zIndex.modal};
  transition: transform ${({ theme }) => theme.transitions.smooth};
  padding: 0 0 max(24px, env(safe-area-inset-bottom));
  max-height: 80vh;
  overflow-y: auto;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.radius.full};
  margin: 12px auto;
`;

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGlass};
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const Desc = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
`;

const CityButton = styled.button<{ $selected: boolean }>`
  background: ${({ $selected }) => ($selected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)')};
  border: 1px solid ${({ $selected }) => ($selected ? '#BFDFFF' : 'rgba(255, 255, 255, 0.6)')};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${({ theme, $selected }) => ($selected ? '#5D8BBA' : theme.colors.textPrimary)};
  font-family: ${({ theme }) => theme.fonts.kr};
  transition: all ${({ theme }) => theme.transitions.bounce};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ $selected }) => ($selected ? '0 4px 15px rgba(0,0,0,0.05)' : 'none')};

  &:hover {
    background: ${({ $selected }) => ($selected ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)')};
    transform: scale(1.05);
    border-color: rgba(191, 223, 255, 0.8);
  }
`;

const Emoji = styled.span`
  font-size: 22px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  display: block;
  width: calc(100% - 48px);
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg} 0;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.kr};
  font-size: 15px;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export function CityModal() {
  const { state, dispatch, loadAirData } = useAppContext();
  const { cityModalOpen, selectedSido } = state;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CITY_MODAL' });
  };

  const handleSelect = (sido: typeof SIDO_LIST[0]) => {
    dispatch({ type: 'SET_SIDO', payload: sido });
    dispatch({ type: 'CLOSE_CITY_MODAL' });
    loadAirData(sido); // Load data for new city
  };

  // Create ripple effect
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const rip = document.createElement('span');
    rip.classList.add('ripple');
    rip.style.width = `${size}px`;
    rip.style.height = `${size}px`;
    rip.style.left = `${x}px`;
    rip.style.top = `${y}px`;
    
    btn.appendChild(rip);
    rip.addEventListener('animationend', () => rip.remove());
  };

  return (
    <>
      <Backdrop $open={cityModalOpen} onClick={handleClose} aria-hidden="true" />
      <ModalContainer $open={cityModalOpen} role="dialog" aria-modal="true" aria-label="지역 선택">
        <Handle />
        <Header>
          <Title>📍 지역 선택</Title>
          <Desc>경보 데이터를 조회할 지역을 선택하세요</Desc>
        </Header>
        <Grid role="listbox" aria-label="시도 목록">
          {SIDO_LIST.map((sido) => {
            const isSelected = sido.code === selectedSido.code;
            return (
              <CityButton
                key={sido.code}
                $selected={isSelected}
                onClick={(e) => {
                  createRipple(e);
                  handleSelect(sido);
                }}
                aria-selected={isSelected}
                role="option"
                aria-label={`${sido.name} 선택`}
              >
                <Emoji>{sido.emoji}</Emoji>
                <Name>{sido.code}</Name>
              </CityButton>
            );
          })}
        </Grid>
        <CloseButton onClick={handleClose} aria-label="닫기">
          닫기
        </CloseButton>
      </ModalContainer>
    </>
  );
}
