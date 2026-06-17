/* =============================================
   AIR MOOD DIARY — 시도 목록
   에어코리아 API sidoName 파라미터 기준
============================================= */

import type { Sido } from '../types/air.types';

export const SIDO_LIST: Sido[] = [
  { code: '서울',  name: '서울특별시',     emoji: '🏙️', lat: 37.5665, lon: 126.9780 },
  { code: '부산',  name: '부산광역시',     emoji: '🌊', lat: 35.1796, lon: 129.0756 },
  { code: '대구',  name: '대구광역시',     emoji: '🏔️', lat: 35.8714, lon: 128.6014 },
  { code: '인천',  name: '인천광역시',     emoji: '✈️', lat: 37.4563, lon: 126.7052 },
  { code: '광주',  name: '광주광역시',     emoji: '🌸', lat: 35.1595, lon: 126.8526 },
  { code: '대전',  name: '대전광역시',     emoji: '🔬', lat: 36.3504, lon: 127.3845 },
  { code: '울산',  name: '울산광역시',     emoji: '🏭', lat: 35.5384, lon: 129.3114 },
  { code: '세종',  name: '세종특별자치시', emoji: '🏛️', lat: 36.4800, lon: 127.2890 },
  { code: '경기',  name: '경기도',         emoji: '🌿', lat: 37.2752, lon: 127.0095 },
  { code: '강원',  name: '강원도',         emoji: '⛰️', lat: 37.8228, lon: 128.1555 },
  { code: '충북',  name: '충청북도',       emoji: '🍀', lat: 36.6356, lon: 127.4913 },
  { code: '충남',  name: '충청남도',       emoji: '🌾', lat: 36.6588, lon: 126.6728 },
  { code: '전북',  name: '전북특별자치도', emoji: '🌻', lat: 35.8202, lon: 127.1086 },
  { code: '전남',  name: '전라남도',       emoji: '🎋', lat: 34.8161, lon: 126.4629 },
  { code: '경북',  name: '경상북도',       emoji: '🍎', lat: 36.5760, lon: 128.5056 },
  { code: '경남',  name: '경상남도',       emoji: '🌺', lat: 35.2383, lon: 128.6924 },
  { code: '제주',  name: '제주특별자치도', emoji: '🍊', lat: 33.4996, lon: 126.5312 },
];
