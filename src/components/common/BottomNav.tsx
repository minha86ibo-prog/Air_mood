import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const NavWrapper = styled.nav`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 16px 0 max(16px, env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid #E6E2D8;
  z-index: 999;
`;

const NavItem = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${({ $active }) => ($active ? '#333333' : '#B5B5B5')};
  cursor: pointer;
  position: relative;
`;

const Pill = styled.div<{ $active: boolean }>`
  position: absolute;
  top: -8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #849685;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(0)')};
  transition: all 0.2s ease;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLabel = styled.span<{ $active: boolean }>`
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  letter-spacing: -0.2px;
`;

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const RecIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a8.96 8.96 0 01-4 1 8.96 8.96 0 01-4-1L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
);
const DiaryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const HistoryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

const NAV_ITEMS = [
  { id: 'home', path: '/home', icon: <HomeIcon />, label: '홈' },
  { id: 'recommend', path: '/recommend', icon: <RecIcon />, label: '추천' },
  { id: 'diary', path: '/diary', icon: <DiaryIcon />, label: '감성 카드' },
  { id: 'history', path: '/history', icon: <HistoryIcon />, label: '히스토리' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <NavWrapper>
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <NavItem
            key={item.id}
            $active={isActive}
            onClick={(e) => {
              createRipple(e);
              navigate(item.path);
            }}
          >
            <Pill $active={isActive} />
            <IconWrap>{item.icon}</IconWrap>
            <NavLabel $active={isActive}>{item.label}</NavLabel>
          </NavItem>
        );
      })}
    </NavWrapper>
  );
}
