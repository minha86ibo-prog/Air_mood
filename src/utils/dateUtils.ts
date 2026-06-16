/* =============================================
   AIR MOOD DIARY — 날짜 유틸
============================================= */

/** "6월 15일 (일)" 형태 */
export function getTodayString(): string {
  const d    = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${week[d.getDay()]})`;
}

/** "YYYY-MM-DD" 형태 (localStorage key) */
export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** "YYYYMMDD" 형태 (API searchDate 파라미터) */
export function getSearchDate(): string {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

/** "오전 11:00" 형태 */
export function getNowTimeStr(): string {
  const d    = new Date();
  const ampm = d.getHours() >= 12 ? '오후' : '오전';
  const h    = d.getHours() % 12 || 12;
  const m    = String(d.getMinutes()).padStart(2, '0');
  return `${ampm} ${h}:${m}`;
}

/**
 * 경보 발령 시각 포맷
 * "2024062511" → "2024.06.25 11시"
 */
export function formatAlarmDate(dateStr: string | undefined): string {
  if (!dateStr || dateStr.length < 10) return dateStr ?? '—';
  const y  = dateStr.slice(0, 4);
  const mo = dateStr.slice(4, 6);
  const d  = dateStr.slice(6, 8);
  const h  = dateStr.slice(8, 10);
  return `${y}.${mo}.${d} ${h}시`;
}
