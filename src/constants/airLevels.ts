/* =============================================
   AIR MOOD DIARY — 공기질 레벨 상수
   원본 main.js AIR_LEVELS, AIR_MESSAGES 이식
============================================= */

import type { AirLevel, AirLevelInfo, AirMessage } from '../types/air.types';

export const AIR_LEVELS: Record<AirLevel, AirLevelInfo> = {
  good: {
    label: '좋음',
    emoji: '🌤️',
    color: '#4ECDC4',
    bg: 'linear-gradient(135deg, #0f2027, #1a3a4a, #1e5f74)',
    glow: 'rgba(78,205,196,0.4)',
  },
  moderate: {
    label: '보통',
    emoji: '🌥️',
    color: '#FFD93D',
    bg: 'linear-gradient(135deg, #1a1a2e, #2d2d1a, #3d3800)',
    glow: 'rgba(255,217,61,0.4)',
  },
  bad: {
    label: '나쁨',
    emoji: '😷',
    color: '#FF6B6B',
    bg: 'linear-gradient(135deg, #1a0a0a, #3d1a1a, #5c2020)',
    glow: 'rgba(255,107,107,0.4)',
  },
  veryBad: {
    label: '매우나쁨',
    emoji: '🚫',
    color: '#A855F7',
    bg: 'linear-gradient(135deg, #0d0d1a, #1a1030, #2d1854)',
    glow: 'rgba(168,85,247,0.4)',
  },
};

export const AIR_MESSAGES: Record<AirLevel, AirMessage> = {
  good:     { main: '가벼운 산책이 기분 좋은 날이에요', sub: 'The air feels calm and soft.' },
  moderate: { main: '마스크 안 써도 돼요! 가벼운 산책 어떠세요?', sub: 'A gentle walk is okay today.' },
  bad:      { main: '마스크와 함께, 따뜻한 차 한 잔 어떨까요', sub: 'Today feels slightly heavy.' },
  veryBad:  { main: '오늘은 포근한 실내에 머무르는 것을 추천해요', sub: 'It feels a bit stuffy outside.' },
};

/** 에어코리아 경보 발령 기준 PM 임계값 */
export const ALARM_PM_THRESHOLDS: Record<string, { pm10: number; pm25: number }> = {
  '주의보': { pm10: 150, pm25: 75 },
  '경보':   { pm10: 300, pm25: 150 },
};
