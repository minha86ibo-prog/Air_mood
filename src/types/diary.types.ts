/* =============================================
   AIR MOOD DIARY — Diary Types
   다이어리 관련 타입 정의
============================================= */

import type { AirLevel } from './air.types';

export interface DiaryEntry {
  date: string;        // YYYY-MM-DD
  airLevel: AirLevel;
  pm10: number | null;
  pm25: number | null;
  mood: string;
  moodEmoji: string;
  condition: number;   // 0~100
  outdoor: boolean;
  memo: string;
  region: string;
  savedAt: string;     // ISO string
}

export interface DiaryState {
  mood: string | null;
  moodEmoji: string | null;
  condition: number;
  outdoor: boolean;
  memo: string;
}

export interface MoodOption {
  mood: string;
  emoji: string;
}
