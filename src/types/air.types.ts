/* =============================================
   AIR MOOD DIARY — Air Types
   에어코리아 API 관련 타입 정의
============================================= */

export type AirLevel = 'good' | 'moderate' | 'bad' | 'veryBad';
export type DataSource = 'loading' | 'api' | 'mock' | 'error';

export interface AlarmItem {
  districtName: string;
  issueGbn: '경보' | '주의보';
  issueDate: string;
  clearDate: string;
  pollutnNm: string;
  sidoName: string;
}

export interface AirData {
  region: string;
  pm10: number | null;
  pm25: number | null;
  allAlarms: AlarmItem[];
  activeAlarms: AlarmItem[];
  clearedAlarms: AlarmItem[];
  measuredAt: string;
  source: DataSource;
  estimated: boolean;
}

export interface Sido {
  code: string;
  name: string;
  emoji: string;
}

export interface AirLevelInfo {
  label: string;
  emoji: string;
  color: string;
  bg: string;
  glow: string;
}

export interface AirMessage {
  main: string;
  sub: string;
}
