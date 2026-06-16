/* =============================================
   AIR MOOD DIARY — styled-components 테마
   Cozy Lifestyle Diary · Warm Minimalism Edition
============================================= */

export const theme = {
  colors: {
    // 공기질 레벨 (소프트/파스텔 톤)
    good:     '#C8E6C9',  // Soft Sage Green
    moderate: '#F5E6C8',  // Warm Sand
    bad:      '#EDCFCF',  // Muted Blush
    veryBad:  '#D9C8D9',  // Dusty Lavender

    // 배경
    bgPrimary:   '#FDFBF7',               // Warm Cream Canvas
    bgCard:      'rgba(255, 254, 251, 0.80)',
    bgCardHover: 'rgba(255, 254, 251, 0.97)',

    // 테두리
    borderGlass: 'rgba(210, 200, 188, 0.55)',

    // 텍스트 (차콜 + 따뜻한 갈색 계열)
    textPrimary:   '#333333',
    textSecondary: '#7A7571',
    textMuted:     'rgba(122, 117, 113, 0.55)',

    // 포인트 컬러 (따뜻한 세피아 계열)
    accent:        '#C17A4A',
    accentLight:   'rgba(193, 122, 74, 0.12)',
  },

  fonts: {
    kr: "'Noto Sans KR', sans-serif",
    en: "'Outfit', sans-serif",
  },

  spacing: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },

  radius: {
    sm:   '20px',
    md:   '28px',
    lg:   '36px',
    full: '9999px',
  },

  transitions: {
    fast:   '0.18s cubic-bezier(0.4,0,0.2,1)',
    smooth: '0.35s cubic-bezier(0.4,0,0.2,1)',
    bounce: '0.4s cubic-bezier(0.34,1.56,0.64,1)',
  },

  zIndex: {
    modal:    400,
    backdrop: 300,
    toast:    500,
    nav:      100,
    header:   90,
  },
} as const;

export type AppTheme = typeof theme;
