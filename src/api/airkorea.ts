/* =============================================
   AIR MOOD DIARY — 에어코리아 API 모듈
   UlfptcaAlarmInqireSvc (미세먼지 경보 발령 현황)
============================================= */

import type { AlarmItem } from '../types/air.types';
import { getSearchDate } from '../utils/dateUtils';

const API_KEY  = import.meta.env.VITE_AIRKOREA_API_KEY as string;
const ALARM_URL = 'https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo';

/**
 * 에어코리아 미세먼지 경보 발령 현황 API 호출
 * @param sidoCode 시도 코드 (예: '서울', '경기')
 */
export async function fetchAlarmData(sidoCode: string): Promise<unknown> {
  // 공공데이터포털 인증키 이중 인코딩 방지 (이미 인코딩된 키일 경우 디코딩 후 URLSearchParams에 전달)
  const decodedKey = decodeURIComponent(API_KEY);

  const params = new URLSearchParams({
    serviceKey: decodedKey,
    returnType: 'json',
    numOfRows: '10',
    pageNo: '1',
    year: '2026',
    // 지역별 조회가 필요한 경우를 위해 기존 파라미터 유지
    sidoName: sidoCode,
  });

  const url = `${ALARM_URL}?${params.toString()}`;

  try {
    const res = await fetch(url, { mode: 'cors' });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const text = await res.text();

    // 정부 API가 가끔 XML 오류 응답을 반환함
    if (text.trimStart().startsWith('<')) {
      console.error('[AIR MOOD] API Error Response (XML):', text);
      throw new Error('API XML 오류 응답: 인증키(SERVICE_KEY_IS_NOT_REGISTERED_ERROR) 또는 파라미터를 확인하세요.');
    }

    return JSON.parse(text) as unknown;
  } catch (error) {
    console.error('[AIR MOOD] Network or API Fetch Error:', error);
    throw error;
  }
}

/**
 * API 응답 파싱 → AlarmItem 배열 반환
 */
export function parseAlarmResponse(data: unknown): AlarmItem[] {
  const res = data as {
    response?: {
      header?: { resultCode?: string; resultMsg?: string };
      body?:   { totalCount?: string | number; items?: { item?: unknown } };
    };
  };

  const code = res?.response?.header?.resultCode;
  if (code !== '00') {
    throw new Error(
      `API 결과 코드: ${code} (${res?.response?.header?.resultMsg})`
    );
  }

  const body       = res?.response?.body;
  const totalCount = parseInt(String(body?.totalCount ?? '0'), 10);

  if (totalCount === 0 || !body?.items) return [];

  const raw = body.items;
  // some versions wrap item inside items, some don't.
  const items = raw.item ? raw.item : raw;

  if (!items) return [];
  return Array.isArray(items) ? (items as AlarmItem[]) : [items as AlarmItem];
}

const REALTIME_URL = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';

export interface RealtimeItem {
  stationName: string;
  dataTime: string;
  pm10Value: string;
  pm25Value: string;
}

export async function fetchRealtimeAirData(sidoCode: string): Promise<unknown> {
  const decodedKey = decodeURIComponent(API_KEY);

  const params = new URLSearchParams({
    serviceKey: decodedKey,
    returnType: 'json',
    numOfRows: '100',
    pageNo: '1',
    sidoName: sidoCode,
    ver: '1.0',
  });

  const url = `${REALTIME_URL}?${params.toString()}`;

  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const text = await res.text();
    if (text.trimStart().startsWith('<')) {
      console.error('[AIR MOOD] Realtime API Error Response (XML):', text);
      throw new Error('API XML 오류 응답: 실시간 대기질 인증키 또는 파라미터 확인 필요');
    }

    return JSON.parse(text) as unknown;
  } catch (error) {
    console.error('[AIR MOOD] Realtime API Fetch Error:', error);
    throw error;
  }
}

export function parseRealtimeResponse(data: unknown): RealtimeItem[] {
  const res = data as any;
  const code = res?.response?.header?.resultCode;
  
  if (code !== '00') {
    throw new Error(`Realtime API Error: ${code} (${res?.response?.header?.resultMsg})`);
  }

  const items = res?.response?.body?.items;
  if (!items) return [];
  
  return Array.isArray(items) ? items : [items];
}
