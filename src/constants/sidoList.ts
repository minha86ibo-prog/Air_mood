/* =============================================
   AIR MOOD DIARY — 시도 목록
   에어코리아 API sidoName 파라미터 기준
============================================= */

import type { Sido } from '../types/air.types';

export const SIDO_LIST: Sido[] = [
  { code: '서울',  name: '서울특별시',     emoji: '🏙️' },
  { code: '부산',  name: '부산광역시',     emoji: '🌊' },
  { code: '대구',  name: '대구광역시',     emoji: '🏔️' },
  { code: '인천',  name: '인천광역시',     emoji: '✈️' },
  { code: '광주',  name: '광주광역시',     emoji: '🌸' },
  { code: '대전',  name: '대전광역시',     emoji: '🔬' },
  { code: '울산',  name: '울산광역시',     emoji: '🏭' },
  { code: '세종',  name: '세종특별자치시', emoji: '🏛️' },
  { code: '경기',  name: '경기도',         emoji: '🌿' },
  { code: '강원',  name: '강원도',         emoji: '⛰️' },
  { code: '충북',  name: '충청북도',       emoji: '🍀' },
  { code: '충남',  name: '충청남도',       emoji: '🌾' },
  { code: '전북',  name: '전북특별자치도', emoji: '🌻' },
  { code: '전남',  name: '전라남도',       emoji: '🎋' },
  { code: '경북',  name: '경상북도',       emoji: '🍎' },
  { code: '경남',  name: '경상남도',       emoji: '🌺' },
  { code: '제주',  name: '제주특별자치도', emoji: '🍊' },
];
