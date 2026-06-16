import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from '../components/common/Header';
import { LocationBar } from '../components/home/LocationBar';
import { ApiLoadingSpinner } from '../components/home/ApiLoadingSpinner';
import { AlarmSection } from '../components/home/AlarmSection';
import { AlarmClearBadge } from '../components/home/AlarmClearBadge';
import { AirMainCard } from '../components/home/AirMainCard';
import { PmGrid } from '../components/home/PmGrid';
import { QuickActions } from '../components/home/QuickActions';
import { useAppContext } from '../context/AppContext';

/* ─────────────────────────────────────────────
   Header right-slot: minimal UPDATE button
───────────────────────────────────────────── */
const RefreshSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-right: -8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.6;
  }
`;

const ActionLabel = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 0.6px;
`;

/* ─────────────────────────────────────────────
   Page container — generous warm whitespace
───────────────────────────────────────────── */
const PageWrapper = styled.div<{ $bgUrl: string }>`
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  padding-bottom: 90px;
  overflow-y: auto;
`;

const ContentZIndex = styled.div`
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg} 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ─────────────────────────────────────────────
   HomePage — Cozy Lifestyle Diary
   • NO avatar, NO mascot, NO onboarding steps
   • Pure typography + warm minimalism
───────────────────────────────────────────── */
export function HomePage() {
  const { state, loadAirData } = useAppContext();
  const { loading, airLevel } = state;

  useEffect(() => {
    loadAirData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let bgUrl = 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80';
  if (airLevel === 'bad' || airLevel === 'veryBad') {
    bgUrl = 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&w=1200&q=80';
  }

  return (
    <PageWrapper $bgUrl={bgUrl}>
      <ContentZIndex>
      <Header
        title="AIR MOOD"
        rightSlot={
          <ActionButton aria-label="새로고침" onClick={() => loadAirData()}>
            <RefreshSvg />
            <ActionLabel>UPDATE</ActionLabel>
          </ActionButton>
        }
      />
      <Container>
        <LocationBar />
        {loading && <ApiLoadingSpinner />}
        <AlarmSection />
        <AlarmClearBadge />
        <AirMainCard />
        <PmGrid />
        <QuickActions />
      </Container>
      </ContentZIndex>
    </PageWrapper>
  );
}
