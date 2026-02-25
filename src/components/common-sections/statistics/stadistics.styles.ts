'use client';

import { Container } from '@/components/elements/container';
import { styled, screens } from '@/styles';

export const StyledStatisticsGradient = styled.div`
  position: absolute;
  top: 0;
  height: 110%;
  left: 0;
`;

export const StyledStatisticsGradientWrapper = styled.section`
  position: relative;
  overflow: hidden;
`;

export const StyledStatisticsWrapper = styled(Container)`
  &&& {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    padding: 96px 48px;
    position: relative;

    @media (max-width: ${screens.lg}) {
      flex-direction: column;
      padding: 16px 0;

      & > *:first-child {
        margin: 0 auto;
        align-items: center;
      }

      & * {
        text-align: center;
      }
    }
  }
`;