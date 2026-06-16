import React from 'react';
import styled from 'styled-components';
import { RecommendItem } from './RecommendItem';
import { OutfitChip } from './OutfitChip';
import type { RecommendSet } from '../../constants/recommendData';

const Card = styled.div<{ $delay: number }>`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderGlass};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  animation: fadeInUp 0.5s ease backwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Icon = styled.span`
  font-size: 32px;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 2px 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.span`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ChipContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface RecommendCardProps {
  type: 'outdoor' | 'outfit' | 'mask';
  data: RecommendSet['outdoor'] | RecommendSet['outfit'] | RecommendSet['mask'];
  delay: number;
}

export function RecommendCard({ type, data, delay }: RecommendCardProps) {
  return (
    <Card $delay={delay}>
      <Header>
        <Icon aria-hidden="true">{data.icon}</Icon>
        <TitleWrap>
          <Title>{data.title}</Title>
          <Subtitle>{data.subtitle}</Subtitle>
        </TitleWrap>
      </Header>

      {type === 'outfit' && 'chips' in data && (
        <ChipContainer>
          {data.chips.map((chip, idx) => (
            <OutfitChip
              key={idx}
              label={chip}
              highlight={data.highlight.includes(chip)}
            />
          ))}
        </ChipContainer>
      )}

      {('items' in data) && data.items && data.items.length > 0 && (
        <List>
          {data.items.map((item, idx) => (
            <RecommendItem key={idx} text={item.text} sub={item.sub} />
          ))}
        </List>
      )}
    </Card>
  );
}
