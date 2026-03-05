import { styled } from '@linaria/react';

import { NumberIncreaser } from './component/number-increaser';

import { Text } from '@/components/elements/text';
import { screens, fontSizes } from '@/styles/tokens';
import { convertToMax3DigitsWithSuffix } from '@/lib/utils/format3digitsAndSuffix';

export interface GrowingNumbersStat {
  title: string;
  number: number;
  isOver?: boolean;
}

export interface GrowingNumbersProps {
  stats: GrowingNumbersStat[];
}

const StyledGrowingNumbersStatsWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(2, 248px);
    grid-template-rows: repeat(2, 1fr);
    gap: 80px 96px;
  }

  @media (min-width: ${screens['2xl']}) {
    padding-right: 28px;
  }
`;

const StyledGrowingNumbersStat = styled.div``;

const StyledGrowingNumberStatNumber = styled.p`
  font-size: ${fontSizes.heading.mobile.xl};
  color: var(--text-light-grey);
  line-height: 1.1;
  margin-bottom: 8px;

  @media (min-width: ${screens.lg}) {
    font-size: ${fontSizes.heading.desktop.xl};
  }
`;

export const GrowingNumbers = ({ stats }: GrowingNumbersProps) => {
  return (
    <StyledGrowingNumbersStatsWrapper>
      {Array.isArray(stats) &&
        stats?.length > 0 &&
        stats.map(stat => {
          const [number, suffix] = convertToMax3DigitsWithSuffix(stat.number);
          return (
            <StyledGrowingNumbersStat key={stat.number}>
              <StyledGrowingNumberStatNumber data-number={stat.number}>
                {<NumberIncreaser maxValue={number} suffix={suffix} />}
                {stat.isOver && '+'}
              </StyledGrowingNumberStatNumber>
              <Text fontSize="l" color="darkGrey">
                {stat.title}
              </Text>
            </StyledGrowingNumbersStat>
          );
        })}
    </StyledGrowingNumbersStatsWrapper>
  );
};
