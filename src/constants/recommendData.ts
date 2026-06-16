/* =============================================
   AIR MOOD DIARY — 추천 데이터 상수
   공기질 레벨별 외출/의상/마스크 추천
============================================= */

import type { AirLevel } from '../types/air.types';

interface RecommendItem {
  text: string;
  sub: string;
}

interface OutdoorRecommend {
  icon: string;
  title: string;
  subtitle: string;
  items: RecommendItem[];
}

interface OutfitRecommend {
  icon: string;
  title: string;
  subtitle: string;
  chips: string[];
  highlight: string[];
  items: RecommendItem[];
}

interface MaskRecommend {
  icon: string;
  title: string;
  subtitle: string;
}

export interface RecommendSet {
  outdoor: OutdoorRecommend;
  outfit: OutfitRecommend;
  mask: MaskRecommend;
}

export const RECOMMEND_DATA: Record<AirLevel, RecommendSet> = {
  good: {
    outdoor: {
      icon: '🌿', title: '산책 가능해요!', subtitle: '공기질이 맑아 장시간 야외 활동도 좋습니다',
      items: [
        { text: '공원 산책 추천',    sub: '미세먼지 수치가 낮아 쾌적한 환경입니다' },
        { text: '야외 운동 OK',      sub: '장거리 러닝, 자전거 등 강도 높은 활동도 가능해요' },
        { text: '창문 열기 좋은 날', sub: '환기 적극 추천! 실내 공기 환기에 좋은 날' },
      ],
    },
    outfit: {
      icon: '✨', title: '가볍게 입어도 OK', subtitle: '마스크 없이 자유롭게 외출하세요',
      chips: ['👕 얇은 상의', '🩳 반바지', '👟 운동화', '🧢 모자 (선택)'],
      highlight: [],
      items: [
        { text: '가벼운 스트리트 룩 추천', sub: '오늘은 마스크 없이도 편하게 외출 가능해요' },
        { text: '자외선 차단은 챙겨요',    sub: '공기는 맑지만 자외선 지수를 확인하세요 ☀️' },
      ],
    },
    mask: { icon: '😊', title: '마스크 선택 자유', subtitle: '오늘은 마스크 착용이 필수가 아닙니다' },
  },
  moderate: {
    outdoor: {
      icon: '🌥️', title: '가벼운 외출은 괜찮아요', subtitle: '민감군은 장시간 야외 활동을 삼가세요',
      items: [
        { text: '단시간 외출 가능',   sub: '30분~1시간 이내 외출은 큰 문제 없습니다' },
        { text: '민감군은 주의',      sub: '천식, 호흡기 질환자는 마스크를 착용하세요' },
        { text: '격렬한 운동은 자제', sub: '심박수가 올라가는 야외 운동은 오늘 쉬어요' },
      ],
    },
    outfit: {
      icon: '🧣', title: '호흡기 보호 준비', subtitle: '외출 시 마스크를 챙기는 것을 추천해요',
      chips: ['😷 마스크 챙기기', '🧥 얇은 겉옷', '👟 운동화', '🕶️ 선글라스'],
      highlight: ['😷 마스크 챙기기'],
      items: [
        { text: '마스크를 가방에 챙겨두세요', sub: '상황에 따라 착용할 수 있도록 준비하세요' },
        { text: '겉옷 한 장 걸치기 추천',    sub: '기온 변화에 대비해 가벼운 겉옷을 챙기세요' },
      ],
    },
    mask: { icon: '😐', title: '마스크 챙기기 권장', subtitle: '민감군 및 장시간 외출 시 착용을 권장합니다' },
  },
  bad: {
    outdoor: {
      icon: '⚠️', title: '장시간 외출 비추천', subtitle: '미세먼지 주의보 발령! 최대한 실내에 머무세요',
      items: [
        { text: '꼭 필요한 외출만',   sub: '불필요한 야외 활동은 오늘 자제해 주세요' },
        { text: 'KF80 마스크 필수',   sub: 'KF80 이상 마스크를 반드시 착용하세요' },
        { text: '귀가 후 세안 & 양치', sub: '미세먼지가 많은 날은 귀가 즉시 세안하세요' },
      ],
    },
    outfit: {
      icon: '🧥', title: '피부 보호에 집중', subtitle: '노출 부위를 최소화하는 옷차림을 추천해요',
      chips: ['😷 KF80 마스크', '🧥 긴팔 겉옷', '🕶️ 선글라스', '🧤 얇은 장갑'],
      highlight: ['😷 KF80 마스크', '🧥 긴팔 겉옷'],
      items: [
        { text: 'KF80 이상 마스크 착용', sub: '일반 마스크보다 고성능 마스크를 사용하세요' },
        { text: '피부 노출 최소화',      sub: '긴팔, 긴 바지로 피부를 보호하세요' },
      ],
    },
    mask: { icon: '😷', title: 'KF80 마스크 필수', subtitle: '미세먼지 주의보 — 외출 시 반드시 착용하세요' },
  },
  veryBad: {
    outdoor: {
      icon: '🚫', title: '외출 자제 강력 권고', subtitle: '미세먼지 경보 발령! 가급적 실내에서 지내세요',
      items: [
        { text: '외출 자제 강력 권고', sub: '미세먼지 경보가 발령된 매우 심각한 상태입니다' },
        { text: 'KF94 마스크 필수',    sub: '어쩔 수 없이 외출할 때는 KF94 착용 필수' },
        { text: '실내 공기청정기 가동', sub: '창문을 닫고 공기청정기를 최대로 가동하세요' },
      ],
    },
    outfit: {
      icon: '🛡️', title: '완전 차단 모드', subtitle: '미세먼지 경보 — 피부와 호흡기를 최대한 보호하세요',
      chips: ['😷 KF94 마스크', '🧥 긴팔 겉옷', '🕶️ 보호 안경', '🧤 장갑'],
      highlight: ['😷 KF94 마스크', '🧥 긴팔 겉옷', '🕶️ 보호 안경'],
      items: [
        { text: 'KF94 이상 마스크 필수', sub: '미세먼지 경보 — 최고 성능 마스크 착용' },
        { text: '온몸 완전 차단 추천',   sub: '노출된 피부를 최소화하세요' },
      ],
    },
    mask: { icon: '🚫', title: 'KF94 마스크 필수', subtitle: '경보 발령! 반드시 KF94 착용하세요' },
  },
};
