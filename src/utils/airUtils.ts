/* =============================================
   AIR MOOD DIARY — 공기질 유틸
============================================= */

import type { AirLevel, AlarmItem } from '../types/air.types';
import { ALARM_PM_THRESHOLDS } from '../constants/airLevels';

/** PM10 수치 → 공기질 등급 */
export function getAirLevel(pm10: number | null | undefined): AirLevel {
  if (pm10 === null || pm10 === undefined) return 'good';
  if (pm10 <= 30)  return 'good';
  if (pm10 <= 80)  return 'moderate';
  if (pm10 <= 150) return 'bad';
  return 'veryBad';
}

/** PM2.5 수치 → 공기질 등급 */
export function getPm25Level(pm25: number | null | undefined): AirLevel {
  if (pm25 === null || pm25 === undefined) return 'good';
  if (pm25 <= 15)  return 'good';
  if (pm25 <= 35)  return 'moderate';
  if (pm25 <= 75)  return 'bad';
  return 'veryBad';
}

/** 활성 경보 목록에서 공기질 등급 도출 */
export function deriveAirLevelFromAlarms(activeAlarms: AlarmItem[]): AirLevel {
  if (!activeAlarms || activeAlarms.length === 0) return 'good';
  const has경보  = activeAlarms.some(a => a.issueGbn === '경보');
  const has주의보 = activeAlarms.some(a => a.issueGbn === '주의보');
  if (has경보)  return 'veryBad';
  if (has주의보) return 'bad';
  return 'moderate';
}

/** 경보 기준으로 PM 추정값 산출 */
export function estimatePMFromAlarms(
  activeAlarms: AlarmItem[]
): { pm10: number | null; pm25: number | null } {
  let pm10: number | null = null;
  let pm25: number | null = null;

  activeAlarms.forEach(alarm => {
    const gbn    = alarm.issueGbn;
    const pollut = alarm.pollutnNm || '';
    const thr    = ALARM_PM_THRESHOLDS[gbn];

    if (!thr) return;

    if (pollut.includes('PM10') || pollut.includes('미세먼지')) {
      if (pm10 === null || thr.pm10 > pm10) pm10 = thr.pm10;
    }
    if (
      pollut.includes('PM2.5') ||
      pollut.includes('초미세먼지') ||
      pollut.includes('PM25')
    ) {
      if (pm25 === null || thr.pm25 > pm25) pm25 = thr.pm25;
    }
  });

  return { pm10, pm25 };
}
