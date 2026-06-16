import React from 'react';
import styled, { css } from 'styled-components';
import type { AlarmItem } from '../../types/air.types';
import { formatAlarmDate } from '../../utils/dateUtils';

/* ─────────────────────────────────────────────
   AlarmCard — warm palette version
   Adapts to cozy diary aesthetic.
───────────────────────────────────────────── */

const Card = styled.div<{ $type: '경보' | '주의보' | 'cleared' }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 14px ${({ theme }) => theme.spacing.md};
  border-radius: 20px;
  margin-bottom: 10px;
  border: 1px solid;
  backdrop-filter: blur(12px);
  animation: softFadeIn 0.35s ease both;

  ${({ $type }) =>
    $type === '경보' &&
    css`
      background: rgba(217, 200, 217, 0.22);
      border-color: rgba(170, 140, 180, 0.4);
    `}
  ${({ $type }) =>
    $type === '주의보' &&
    css`
      background: rgba(237, 207, 207, 0.25);
      border-color: rgba(200, 150, 150, 0.4);
    `}
  ${({ $type }) =>
    $type === 'cleared' &&
    css`
      background: rgba(255, 254, 251, 0.5);
      border-color: rgba(210, 200, 188, 0.4);
      opacity: 0.65;
    `}
`;

const LeftIcon = styled.div`
  font-size: 20px;
  flex-shrink: 0;
  padding-top: 2px;
`;

const Body = styled.div``;

const TypeBadge = styled.span<{ $type: '경보' | '주의보' | 'cleared' }>`
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  margin-bottom: 6px;

  ${({ $type }) =>
    $type === '경보' &&
    css`
      background: rgba(217, 200, 217, 0.5);
      color: #6B4E8A;
      border: 1px solid rgba(170, 140, 180, 0.45);
    `}
  ${({ $type }) =>
    $type === '주의보' &&
    css`
      background: rgba(245, 230, 200, 0.8);
      color: #8B6914;
      border: 1px solid rgba(200, 170, 100, 0.45);
    `}
  ${({ $type }) =>
    $type === 'cleared' &&
    css`
      background: rgba(210, 200, 188, 0.25);
      color: rgba(122, 117, 113, 0.7);
      border: 1px solid rgba(210, 200, 188, 0.4);
    `}
`;

const Title = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 3px;
  letter-spacing: -0.2px;
`;

const Info = styled.div`
  font-size: 12px;
  color: #555550;
  font-weight: 400;
  line-height: 1.5;
`;

const Time = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 10.5px;
  color: rgba(122, 117, 113, 0.65);
  font-weight: 400;
  margin-top: 4px;
`;

interface AlarmCardProps {
  alarm: AlarmItem;
  isActive: boolean;
}

export function AlarmCard({ alarm, isActive }: AlarmCardProps) {
  const pollut = alarm.pollutnNm || '미세먼지';
  const location = alarm.districtName || alarm.sidoName || '전 지역';

  if (isActive) {
    const type = alarm.issueGbn as '경보' | '주의보';
    const icon = type === '경보' ? '🚨' : '⚠️';
    return (
      <Card $type={type} role="alert">
        <LeftIcon>{icon}</LeftIcon>
        <Body>
          <TypeBadge $type={type}>{type} 발령 중</TypeBadge>
          <Title>{location} · {pollut}</Title>
          <Info>
            📌 발령 지역: {location}<br />
            🧪 오염물질: {pollut}
          </Info>
          <Time>🕐 발령: {formatAlarmDate(alarm.issueDate)}</Time>
        </Body>
      </Card>
    );
  } else {
    return (
      <Card $type="cleared">
        <LeftIcon>✅</LeftIcon>
        <Body>
          <TypeBadge $type="cleared">경보 해제</TypeBadge>
          <Title>{location} · {pollut}</Title>
          <Info>📌 해제 지역: {location}</Info>
          <Time>
            🕐 발령: {formatAlarmDate(alarm.issueDate)} → 해제: {formatAlarmDate(alarm.clearDate)}
          </Time>
        </Body>
      </Card>
    );
  }
}
