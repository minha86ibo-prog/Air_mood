import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';

/* ═══════════════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════════════ */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.012); }
`;

/* ═══════════════════════════════════════════════════════════
   OUTFIT RECOMMENDATION ENGINE
   Maps (airLevel + pm25) → editorial flat-lay asset cluster
═══════════════════════════════════════════════════════════ */
interface OutfitCluster {
  heroUrl: string;        // kept for legacy fallback only
  outfitUrl: string;     // Layer 2 — main outfit flat-lay
  acc1Url: string;       // Layer 3a — primary accessory
  acc2Url: string;       // Layer 3b — secondary accessory
  backdropGradient: string; // Layer 1 — atmospheric backdrop
  altText: string;
  emotionalMsg: string;
  stylingNote: string;
  palette: 'ivory' | 'sage' | 'muted';
  accentColor: string;
  badges: { icon: React.ReactNode; label: string }[];
  showMaskAlert: boolean;
  airEmoji: string;
}

function getWeatherIcon(airLevel: string) {
  if (airLevel === 'veryBad') return '🌫️';
  if (airLevel === 'bad') return '☁️';
  if (airLevel === 'moderate') return '🌤️';
  return '☀️';
}

function getOutfitCluster(airLevel: string, pm25: number | null): OutfitCluster {
  const p = pm25 ?? 0;

  /* ── 매우 나쁨 ── */
  if (p > 35 || airLevel === 'veryBad') {
    return {
      heroUrl: '/img/card09.jpg',
      outfitUrl: '/img/card09.jpg',
      acc1Url: '',
      acc2Url: '',
      backdropGradient: 'linear-gradient(148deg, #EDEAE6 0%, #DEDAD4 55%, #CECAC2 100%)',
      altText: '회색 코트 플랫레이 — 고농도 미세먼지 대응 룩',
      emotionalMsg: '오늘은 실내에서 쾌적하게 지내요.',
      stylingNote: '외출 자제를 권장해요.',
      palette: 'muted',
      accentColor: 'rgba(140,140,160,0.9)',
      badges: [
        { icon: <IndoorIcon />, label: '실내 활동' },
        { icon: <MaskIcon />, label: 'KF94 필수' },
        { icon: <AirIcon />, label: '공기청정기' },
      ],
      showMaskAlert: true,
      airEmoji: '🌫️',
    };
  }

  /* ── 나쁨 ── */
  if (p > 15 || airLevel === 'bad') {
    return {
      heroUrl: '/img/card03.jpg',
      outfitUrl: '/img/card03.jpg',
      acc1Url: '',
      acc2Url: '',
      backdropGradient: 'linear-gradient(148deg, #EDF4EE 0%, #D8EADA 55%, #C4DCC6 100%)',
      altText: '세이지 레이어드 아우터 플랫레이',
      emotionalMsg: '가벼운 겉옷 하나가 오늘의 방패예요.',
      stylingNote: '보호 스타일링을 권장해요.',
      palette: 'sage',
      accentColor: 'rgba(120,150,130,0.9)',
      badges: [
        { icon: <LayerIcon />, label: '가벼운 아우터' },
        { icon: <MaskIcon />, label: '마스크 착용' },
        { icon: <GlassesIcon />, label: '선글라스' },
      ],
      showMaskAlert: false,
      airEmoji: '☁️',
    };
  }

  /* ── 보통 ── */
  if (airLevel === 'moderate') {
    return {
      heroUrl: '/img/card05.png',
      outfitUrl: '/img/card05.png',
      acc1Url: '',
      acc2Url: '',
      backdropGradient: 'linear-gradient(148deg, #FAF6EE 0%, #F0E8D4 55%, #E4D5B4 100%)',
      altText: '24°C 코디 추천: 베이지 카디건, 화이트 셔츠, 뉴트럴 트라우저, 클래식 로퍼, 스트로 토트백 플랫레이',
      emotionalMsg: '산들바람처럼 가볍게 입어요.',
      stylingNote: '통기성 좋은 소재를 추천해요.',
      palette: 'ivory',
      accentColor: 'rgba(210,190,160,0.9)',
      badges: [
        { icon: <LayerIcon />, label: '가벼운 아우터' },
        { icon: <GlassesIcon />, label: '선글라스' },
        { icon: <MaskIcon />, label: '마스크 선택' },
      ],
      showMaskAlert: false,
      airEmoji: '🌤️',
    };
  }

  /* ── 좋음 — 맑고 청량한 날 ── */
  return {
    heroUrl: '/img/card08.png',
    outfitUrl: '/img/card08.png',
    acc1Url: '',
    acc2Url: '',
    backdropGradient: 'linear-gradient(148deg, #FBF8F2 0%, #F5EBD8 55%, #EDD9B8 100%)',
    altText: '24°C 코디 추천: 베이지 카디건, 화이트 셔츠, 뉴트럴 트라우저, 클래식 로퍼, 스트로 토트백 플랫레이',
    emotionalMsg: '오늘은 숨쉬기 딱 좋은 날이에요.',
    stylingNote: '통기성 좋은 소재를 추천해요.',
    palette: 'ivory',
    accentColor: 'rgba(255,255,255,0.85)',
    badges: [
      { icon: <LayerIcon />, label: '가벼운 아우터' },
      { icon: <GlassesIcon />, label: '선글라스' },
      { icon: <MaskIcon />, label: '마스크 선택' },
    ],
    showMaskAlert: false,
    airEmoji: '☀️',
  };
}

/* ═══════════════════════════════════════════════════════════
   SVG ICON COMPONENTS — thin-line editorial style
═══════════════════════════════════════════════════════════ */
function LayerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function GlassesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="15" r="4" />
      <circle cx="18" cy="15" r="4" />
      <path d="M14 15a2 2 0 00-4 0" />
      <path d="M2.5 13L5 7c.7-1.4 1.4-2 4-2h6c2.6 0 3.3.6 4 2l2.5 6" />
    </svg>
  );
}

function MaskIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="10" rx="3" />
      <path d="M3 12h18M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
    </svg>
  );
}

function IndoorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function AirIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   STYLED COMPONENTS
═══════════════════════════════════════════════════════════ */

/* Root scroll track — transparent so the fixed bg shows through */
const ScrollRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background: transparent;
  scroll-behavior: smooth;
  padding-top: 65px; /* Safely pushes the text right under the nav row */

  /* Hide scrollbar for clean editorial feel */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

/* ── Top Header ── */
const TopHeader = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%; /* Spans 100% of the maximum allowed parent container width */
  max-width: 430px; /* Perfectly snaps edge-to-edge with the 430px app container */
  height: 60px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* Perfectly balances the internal text and icon padding to prevent inner crowding */
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
`;

const TempDisplay = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #2D3142;
  letter-spacing: -0.5px;
  line-height: 1;
`;

const TempSub = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: rgba(45,49,66,0.45);
  letter-spacing: 0.8px;
  text-transform: uppercase;
`;

const HeaderCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const BrandTitle = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #2D3142;
  letter-spacing: 2.5px;
  text-transform: uppercase;
`;

const BrandDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(45,49,66,0.35);
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const WeatherEmojiLarge = styled.div`
  font-size: 22px;
  line-height: 1;
`;

const LocationLabel = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: rgba(45,49,66,0.6);
  letter-spacing: 0.5px;
  max-width: 80px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* ── Emotional Message Band ── */
const MoodBand = styled.div<{ $visible: boolean }>`
  padding: 18px 24px 14px;
  text-align: center;
  animation: ${fadeUp} 0.6s ease both;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

const EmotionalMsg = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #2D3142;
  margin: 0 0 6px;
  letter-spacing: 0.2px;
  line-height: 1.4;
`;

const StylingNote = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: rgba(45,49,66,0.45);
  margin: 0;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

/* ────────────────────────────────────────────
   MOODBOARD CARD — Multi-Layer Canvas System
   Layer 1: atmospheric gradient backdrop
   Layer 2: main outfit (mix-blend-mode: multiply for near-transparent effect)
   Layer 3a: primary accessory (bag / coat)
   Layer 3b: secondary accessory (sunglasses / shoes)
   Layer 4: subtle texture + air quality chip
──────────────────────────────────────────── */

/* Outer card shell */
const MoodboardCard = styled.div`
  position: relative;
  z-index: 10;
  width: 90%;
  max-width: 343px; /* Forces identical width synchronization with the lower content panel */
  aspect-ratio: 3 / 4;
  border-radius: 24px;
  margin: 24px auto;
  overflow: hidden;
  display: block;
  background: #EBE6FF; /* Fallback tone that perfectly matches your lavender style asset */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  animation: ${fadeUp} 0.65s 0.1s ease both;
  flex-shrink: 0;
`;

const ForegroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill; /* Extends the background canvas flawlessly to the absolute left and right borders */
  display: block;
`;

/* ── Lifestyle Suggestions Panel ── */
const SuggestionsPanel = styled.div`
  position: relative;
  z-index: 10;
  width: 90%;
  max-width: 360px;
  margin: 0 auto 16px;
  padding: 22px 16px;
  box-sizing: border-box;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(45,49,66,0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(45,49,66,0.06);
  animation: ${fadeUp} 0.7s 0.15s ease both;
  flex-shrink: 0;
`;

const PanelHeading = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: rgba(45,49,66,0.4);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  text-align: center;
`;

const BadgesRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const BadgeIconRing = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(45,49,66,0.06);
  border: 1px solid rgba(45,49,66,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2D3142;
  transition: transform 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 12px rgba(45,49,66,0.05);

  &:hover {
    transform: translateY(-3px);
    background: rgba(45,49,66,0.1);
  }
`;

const BadgeLabel = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #2D3142;
  letter-spacing: 0.2px;
  text-align: center;
  line-height: 1.3;
`;

/* PM divider bar inside panel */
const PmDivider = styled.div`
  margin: 18px 0 0;
  padding-top: 16px;
  border-top: 1px solid rgba(45,49,66,0.1);
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const PmChip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const PmValue = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2D3142;
  letter-spacing: -0.5px;
  line-height: 1;
`;

const PmKey = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 9px;
  font-weight: 500;
  color: rgba(45,49,66,0.38);
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

/* Shimmer loading skeleton */
const ShimmerCard = styled.div`
  width: 90%;
  max-width: 360px;
  aspect-ratio: 3 / 4;
  border-radius: 28px;
  margin: 20px auto;
  background: linear-gradient(
    90deg,
    rgba(45,49,66,0.04) 0%,
    rgba(45,49,66,0.1) 50%,
    rgba(45,49,66,0.04) 100%
  );
  background-size: 200% auto;
  animation: ${shimmer} 1.8s linear infinite;
`;

/* Bottom padding spacer */
const BottomSpacer = styled.div`
  height: 32px;
  flex-shrink: 0;
`;

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export function RecommendPage() {
  const { state } = useAppContext();
  const { airData, airLevel, loading } = state;
  const { region, pm25, pm10 } = airData;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock temperature — in a real app this comes from a weather API
  const currentTemp = 24;

  const cluster = getOutfitCluster(airLevel, pm25);

  // Reset scroll on air-level change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [airLevel]);

  const displayRegion = region.replace('광역시', '').replace('특별시', '').replace('특별자치시', '');

  return (
    <ScrollRoot ref={scrollRef}>

      {/* ── Top Header: Branding + Data ── */}
      <TopHeader>
        <HeaderLeft>
          <TempDisplay>{currentTemp}°C</TempDisplay>
          <TempSub>체감 온도</TempSub>
        </HeaderLeft>

        <HeaderCenter>
          <BrandTitle>Air Mood</BrandTitle>
          <BrandDot />
        </HeaderCenter>

        <HeaderRight>
          <WeatherEmojiLarge>{getWeatherIcon(airLevel)}</WeatherEmojiLarge>
          <LocationLabel>{displayRegion}</LocationLabel>
        </HeaderRight>
      </TopHeader>

      {/* ── Emotional Message Band ── */}
      <MoodBand $visible={!loading}>
        <EmotionalMsg>{cluster.emotionalMsg}</EmotionalMsg>
        <StylingNote>{cluster.stylingNote}</StylingNote>
      </MoodBand>

      {/* ── 무드보드 카드 — HOTFIX: single pre-vetted flat-lay asset ── */}
      {loading ? (
        <ShimmerCard />
      ) : (
        <MoodboardCard>
          <ForegroundImg src={cluster.heroUrl} alt={cluster.altText} />
        </MoodboardCard>
      )}

      {/* ── Lifestyle Suggestions Panel ── */}
      <SuggestionsPanel>
        <PanelHeading>오늘의 큐레이션</PanelHeading>
        <BadgesRow>
          {cluster.badges.map((badge, i) => (
            <BadgeItem key={i}>
              <BadgeIconRing>{badge.icon}</BadgeIconRing>
              <BadgeLabel>{badge.label}</BadgeLabel>
            </BadgeItem>
          ))}
        </BadgesRow>

        {/* PM data footnote */}
        <PmDivider>
          <PmChip>
            <PmValue>{pm25 != null ? pm25 : '—'}</PmValue>
            <PmKey>초미세먼지 · μg</PmKey>
          </PmChip>
          <PmChip>
            <PmValue>{pm10 != null ? pm10 : '—'}</PmValue>
            <PmKey>미세먼지 · μg</PmKey>
          </PmChip>
        </PmDivider>
      </SuggestionsPanel>

      <BottomSpacer />
    </ScrollRoot>
  );
}
