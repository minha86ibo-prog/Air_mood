/* =============================================
   AIR MOOD DIARY — GlobalStyle
   CSS reset + 글로벌 스타일
============================================= */

import { createGlobalStyle } from 'styled-components';
import type { AppTheme } from './theme';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    /* dvh: dynamic viewport height — shrinks when mobile browser toolbar shows/hides.
       Falls back: 100svh → 100vh for older browsers. */
    height: 100dvh;
    height: 100svh; /* safe fallback — static, excludes toolbars */
    height: 100vh;  /* last-resort legacy fallback */
    width: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #FDFBF7;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.kr};
    font-weight: 300;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    /* Protect content from notch/home-indicator on viewport-fit=cover */
    padding-top: env(safe-area-inset-top);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  @keyframes gentleGlow {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.82; }
  }

  @keyframes softFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  #root {
    /* Use dvh so the app shell fills exactly the visible viewport
       including dynamic toolbar changes on iOS/Android */
    height: 100dvh;
    height: 100svh;
    height: 100vh; /* legacy fallback */
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
  }

  /* 스크롤바 숨김 */
  ::-webkit-scrollbar { display: none; }
  * { scrollbar-width: none; -ms-overflow-style: none; }

  /* Ripple 애니메이션 */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0);
    animation: rippleAnim 0.6s linear;
    pointer-events: none;
  }

  @keyframes rippleAnim {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40%           { transform: scale(1.2); opacity: 1; }
  }
`;
