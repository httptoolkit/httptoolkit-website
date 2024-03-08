import { NumberIncreaser } from './component/number-increaser';
import {
  StyledGrowingNumberStatNumber,
  StyledGrowingNumbersStat,
  StyledGrowingNumbersStatsWrapper,
} from './growing-numbers.styles';
import type { GrowingNumbersProps } from './growing-numbers.types';

import { Text } from '@/components/elements/text';
import { convertToMax3DigitsWithSuffix } from '@/lib/utils/format3digitsAndSuffix';

export const GrowingNumbers = ({ stats }: GrowingNumbersProps) => {
  return (
    <StyledGrowingNumbersStatsWrapper>
      {Array.isArray(stats) &&
        stats?.length > 0 &&
        stats.map(stat => {
          const [number, suffix] = convertToMax3DigitsWithSuffix(stat.number);
          return (
            <StyledGrowingNumbersStat key={stat.number}>
              <StyledGrowingNumberStatNumber>
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
