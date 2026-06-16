import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useAppContext } from '../../context/AppContext';

const LayoutWrapper = styled.div<{ $airLevel: string; $isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  /* dvh fills the visible viewport; tracks mobile browser toolbar movement */
  height: 100dvh;
  height: 100svh;
  height: 100vh; /* legacy fallback */
  width: 100%;
  transition: background 1s ease, background-image 1s ease;
  background: ${({ $airLevel, $isLoading }) => {
    if ($isLoading) return 'linear-gradient(160deg, #FDFBF7 0%, #FDFBF7 100%)';
    switch ($airLevel) {
      case 'good':     return 'linear-gradient(160deg, #EDF5EE 0%, #FDFBF7 55%, #FDFBF7 100%)';
      case 'moderate': return 'linear-gradient(160deg, #F7F1E6 0%, #FDFBF7 55%, #FDFBF7 100%)';
      case 'bad':      return 'linear-gradient(160deg, #F5EDEA 0%, #FDFBF7 55%, #FDFBF7 100%)';
      case 'veryBad':  return 'linear-gradient(160deg, #F0EAF3 0%, #FDFBF7 55%, #FDFBF7 100%)';
      default:         return 'linear-gradient(160deg, #FDFBF7 0%, #FDFBF7 100%)';
    }
  }};
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const Footer = styled.footer`
  padding: 48px 24px 100px;
  text-align: center;
  color: rgba(154, 144, 138, 0.55);
  font-size: 11px;
  line-height: 1.8;
  font-weight: 400;
  border-top: 1px solid rgba(210, 200, 188, 0.28);
  margin: 0 20px;

  p {
    margin: 3px 0;
  }

  .copyright {
    margin-top: 14px;
    font-size: 9.5px;
    letter-spacing: 0.6px;
    color: rgba(154, 144, 138, 0.38);
    font-family: ${({ theme }) => theme.fonts.en};
  }
`;

export function Layout() {
  const { state } = useAppContext();
  const isInitialLoading = state.airData.source === 'loading' || state.loading;
  
  return (
    <LayoutWrapper $airLevel={state.airLevel} $isLoading={isInitialLoading}>
      <ContentArea>
        <Outlet />
        <Footer>
          <p>공공데이터 출처: 에어코리아</p>
          <p>본 서비스는 회원가입 없이 누구나 자유롭게 이용하실 수 있습니다.</p>
          <p className="copyright">© 2026.06 SHIN.MINHA &amp; AIR MOOD. All rights reserved.</p>
        </Footer>
      </ContentArea>
      <BottomNav />
    </LayoutWrapper>
  );
}
