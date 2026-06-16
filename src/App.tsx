import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { Layout } from './components/common/Layout';
import { Toast } from './components/common/Toast';
import { CityModal } from './components/common/CityModal';

import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import { RecommendPage } from './pages/RecommendPage';
import { DiaryPage } from './pages/DiaryPage';
import { HistoryPage } from './pages/HistoryPage';
import { SharePage } from './pages/SharePage';

import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  max-width: 430px; /* Mobile View Max Width */
  /* dvh cascades: browser picks the last supported value */
  height: 100dvh;
  height: 100svh;
  height: 100vh; /* legacy */
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* On very small screens (SE, Galaxy A series), fill 100% width */
  @media (max-width: 390px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/recommend" element={<RecommendPage />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/share" element={<SharePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toast />
          <CityModal />
        </AppContainer>
      </ThemeProvider>
    </AppProvider>
  );
}
