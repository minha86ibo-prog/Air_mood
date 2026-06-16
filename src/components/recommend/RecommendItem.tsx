import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Dot = styled.span`
  color: ${({ theme }) => theme.colors.good};
  margin-right: 8px;
  font-size: 14px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #5A5550;
  margin-top: 2px;
  opacity: 0.9;
`;

interface RecommendItemProps {
  text: string;
  sub: string;
}

export function RecommendItem({ text, sub }: RecommendItemProps) {
  return (
    <Item>
      <Dot aria-hidden="true">•</Dot>
      <TextWrap>
        <MainText>{text}</MainText>
        <SubText>{sub}</SubText>
      </TextWrap>
    </Item>
  );
}
